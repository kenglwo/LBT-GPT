// This class that implements chat bot functionality
import firebaseHelp from "../../firebaseHelp";
import {httpsCallable} from "firebase/functions";

// cloud function to access LLM
const llmQuery = httpsCallable(firebaseHelp.functions, 'llmQuery');

// student agent instructions
export const STUDENT_OPENING_SENTENCE = "Nice to meet you! I am Ruffle. I can help you reflect on the material.";
export const STUDENT_END_SENTENCE = "Great job! You answered all the questions! You can now proceed to the test.";
const DELIMITER = "####";
const DEFAULT_RESPONSE = "Thank you for the response! As a reference, here is our model solution:"


function extractInfo(inputString) {
  // Initialize an object to store the extracted information
  const extractedInfo = {};

  // Define the patterns we are looking for along with their corresponding keys
  const patterns = [
    {regex: /Student answer contains factually incorrect information: (YES|NO)/, key: 'incorrect'},
    {regex: /Student answer is off topic: (YES|NO)/, key: 'off_topic'},
    {regex: /Student answer mentions at least half of the information in the model solution: (YES|NO)/, key: 'half'}
  ];

  // Loop through each pattern, look for matches, and store the results in the object
  for (const pattern of patterns) {
    const match = inputString.match(pattern.regex);
    if (match) {
      // The regex should have one capturing group which is the YES/NO answer.
      const value = match[1].trim();
      extractedInfo[pattern.key] = value;
    }
  }

  return extractedInfo;
}

function prepareResponse(inputString) {
  const infoDict = extractInfo(inputString);
  if ('incorrect' in infoDict) {
    if ((infoDict['incorrect'] === "YES") || (infoDict['incorrect'] === "<YES>")) {
      return "Sorry, there seems to be some incorrect information in your response. You might want to compare to the lesson or our model solution:";
    }
  }
  if ('off_topic' in infoDict) {
    if ((infoDict['off_topic'] === "YES") || (infoDict['off_topic'] === "<YES>")) {
      return "Sorry, that's not quite right. You might want to refer to the lesson or our model solution:";
    }
  }
  if ('half' in infoDict) {
    if ((infoDict['half'] === "YES") || (infoDict['half'] === "<YES>")) {
      return "This is a great answer! Our model solution is:";
    } else {
      return "This is a good start! You can take a look at our model solution for more details:";
    }
  }
  return DEFAULT_RESPONSE;
}

class ChatBot {
  constructor() {
    this.msg_list = [];
  }

  prepareEvaluationMessage(questionText, solutionText, answerText) {
    // NOTE: Here we fill the prompt template.
    let evalMsg = `You are a biology professor that evaluates your student's answer to a review question. 

    The review question, its model solution and the student's answer are provided below, each delimited by four hashtags:
    
    Review Question: ${DELIMITER} ${questionText} ${DELIMITER}
    
    Model Solution: ${DELIMITER} ${solutionText} ${DELIMITER}
    
    Student Answer: ${DELIMITER} ${answerText} ${DELIMITER}
    
    Evaluate the student's answer following the format below:
    Student answer contains factually incorrect information: <YES or NO>
    Student answer is off topic: <YES or NO>
    Student answer mentions at least half of the information in the model solution: <YES or NO>
    
    Make sure to always perform a complete evaluation.`;

    // prepare for send
    let messages = [
      { role: "user", content: evalMsg }
    ];
    return messages;
  }

  async callLLM(questionText, solutionText, answerText) {
    const messages = this.prepareEvaluationMessage(questionText, solutionText, answerText);
    console.log(messages);
    return llmQuery(messages).then((result) => {
      const msg = result.data;
      console.log(msg.content);
      return prepareResponse(msg.content);
    })
    .catch((error) => {
      // BY DEFAULT SHOW A NEUTRAL MESSAGE.
      console.error("Error:", error);
      return DEFAULT_RESPONSE;
    });
  }
}

export default ChatBot;
