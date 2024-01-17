// Implements backend via Firebase cloud functions
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {OpenAIClient, AzureKeyCredential} = require("@azure/openai");
const {v4} = require("uuid");

const admin = require("firebase-admin");

admin.initializeApp();
const database = admin.database();
const llmLimit = 10000;
const maxRetries = 3;
const timeoutMS = 8000;
const timeOptions = {timeZone: "America/New_York"};
const CONDITIONS = ["llm-chatbot", "teacher-qa-bot", "llm-qa-bot", "reading"];

exports.logSurvey = onCall(async (request) => {
  // create a table logging worker information | updates all user data
  const data = request.data;
  const reference = database.ref("/logs/" + data.uuid);
  try {
    await reference.set(request.data);
    return "success";
  } catch (error) {
    // error while incrementing counter
    throw new HttpsError("unknown", error.message, error);
  }
});

exports.registerUser = onCall(async (request) => {
  // Register user's uuid, assign experimental condition and survey code
  const userRef = database.ref("/logs/" + request.data.uuid);
  try { // check if user registered before
    const snapshot = await userRef.get();
    const currentValue = snapshot.val() || 0;
    if (currentValue !== 0) {
      // return known logs if available and update timestamp
      const time = new Date().toLocaleString("en-US", timeOptions);
      currentValue.initializationTimes.push(time);
      return userRef.set(currentValue).then(() => {
        return currentValue;
      }).catch(() => {
        // error while storing condition counter
        throw new HttpsError("aborted", "User registration failed.");
      });
    }
  } catch (error) {
    // error while incrementing counter
    throw new HttpsError("read error", "could not check prior registration");
  }

  // create new registration
  const userCounter = database.ref("/userCounter");
  return userCounter.transaction((currentValue) => { // safe increment
    return (currentValue || 0) + 1;
  }).then((result) => {
    if (result.committed) { // check succesfull completion
      const counterVal = result.snapshot.val() - 1;
      const data = request.data;
      data.completedSurvey = false;
      data.state = "consent";
      const time = new Date().toLocaleString("en-US", timeOptions);
      data.initializationTimes = [time];
      data.surveyToken = v4().substring(0, 13);
      data.condition = CONDITIONS[counterVal % CONDITIONS.length];
      return userRef.set(data).then(() => {
        return data;
      }).catch(() => {
        // error while storing condition counter
        throw new HttpsError("aborted", "User registration failed.");
      });
    } else {
      // Transaction failed, return an error
      throw new HttpsError("aborted", "Transaction failed.");
    }
  }).catch((error) => {
    // Handle possible errors
    throw new HttpsError("error", error.message, error);
  });
});


exports.llmQuery = onCall(async (request) => {
  // check if counter tells us to stop assignment
  const counterRef = database.ref("/llmQueryCounter");
  try {
    // read and increase counter
    const snapshot = await counterRef.get();
    const currentValue = snapshot.val() || 0;
    if (currentValue >= llmLimit) {
      throw new HttpsError("aborted", "Exausted allocated budget.");
    }
    await counterRef.set(currentValue + 1);
  } catch (error) {
    // error while incrementing counter
    throw new HttpsError("increment error", error.message, error);
  }
  const client = new OpenAIClient(process.env.SEC_AZURE_ENDPOINT,
      new AzureKeyCredential(process.env.SEC_AZURE_API_KEY));

  const retryQuery = async (retryCount = 0) => {
    try {
      const result = await Promise.race([
        client.getChatCompletions(
            process.env.SEC_AZURE_DEPLOYMENT_ID,
            request.data,
            {temperature: 0.0}),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), timeoutMS),
        ),
      ]);
      const msg = result.choices[0].message;
      return msg;
    } catch (error) {
      try {
        console.error(`Attempt ${retryCount} failed - error: ${error.message}`);
        if (retryCount >= maxRetries) {
          throw new HttpsError("Did not find a response", error.message, error);
        }
        // Wait 1 second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return retryQuery(retryCount + 1);
      } catch (err) {
        // could not establish connection
        console.log("\nLLM QUERY ERROR:");
        console.log(err);
        throw new HttpsError("no llm connection", error.message, error);
      }
    }
  };
  return retryQuery();
});
