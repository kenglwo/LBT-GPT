import axios from 'axios';
import axiosRetry from 'axios-retry';

// 创建 Axios 实例
const apiClient = axios.create();
// 配置重试机制
axiosRetry(apiClient, {
  retries: 3, // 设置重试次数
  retryDelay: axiosRetry.exponentialDelay, // 使用指数回退算法计算重试间隔
  retryCondition: (error) => {
    // 指定何种情况下进行重试，例如针对特定的HTTP状态码
    return error.response.status === 429;
  }
});
export const sendChatToGPT = async (conversationHistory, text, fileBase64) => {
  const apiKey = process.env.REACT_APP_CHATGPT_API_KEY
  const endpoint = process.env.REACT_APP_CHATGPT_API_ENDPOINT
  const dalle_endpoint = process.env.REACT_APP_DALLE_API_ENDPOINT
  const gpt_4V = process.env.REACT_APP_GPT_4V_MODEL
  const gpt_4 = process.env.REACT_APP_GPT_4_MODEL
  const gpt_4_preview = process.env.REACT_APP_GPT_4_PREVIEW_MODEL
  const dalle2 = process.env.REACT_APP_DALLE_2_MODEL

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  };

  let gpt_model = gpt_4_preview // defalut model is gpt_4_preview

  // use the conversation history to create the messages array. Need to handle the image_url type in previous conversation.
  const messages = conversationHistory.map(conversation => {
    // reform the messages data according to the correct API format.
    let content;
    if (conversation.type === 'text') {
      content = { type: 'text', text: conversation.content };
    } else if (conversation.type === 'image_url') {
      content = { type: 'image_url', image_url: conversation.content };

      gpt_model = gpt_4V // if conversation has image, use gpt_4V model
      
    }
  
    return {
      role: conversation.role,
      content: content ? [content] : [] // ensure content is an array
    };
  });
  

  // add the new text Prompt to the messages array. Need to distingish between figure and text.
  const newPrompt = { role: 'user', content: [{ type: 'text', text: text }] };
  messages.push(newPrompt);



  // first inquiry GPT-4: whether the user is asking for generating a figure
  const shouldGenerateImage = await askGPTShouldGenerateImage(text, gpt_4, headers, endpoint);
  console.log("shouldGenerateImage",shouldGenerateImage)

  if (shouldGenerateImage) {
    // if GPT-4 recommend to generate a figure，call DALL-E 3
    const imageResponse = await generateImageWithDALLE(text, dalle2, headers,dalle_endpoint); // 
    console.log("imageResponse",imageResponse)
    // return { type: 'image', content: imageResponse };
    return imageResponse
  } else {
    console.log("noImageResponse!")
    // otherwise, call GPT 4-v to generate response

    // if new input includes a file, use gpt_4V model
    if(fileBase64){
      gpt_model = gpt_4V
    }
    console.log("gpt_model",gpt_model)
    return await getGPT4VResponse(messages,fileBase64, gpt_model, headers, endpoint);
  }
};

const askGPTShouldGenerateImage = async (text, model, headers, endpoint) => {
  // const messages = [];
  const newUserMessage = { role: 'user', content: [{ type: 'text', text: text }] };
  // messages.push(newUserMessage);


  // create a new nessary array, includes users prompt input and a system inquiry that whether the user is asking for a figure generation.
  const messagesWithInquiry = [
    { role: 'system', content: `Is the user's input a request to generate an image? Please answer with yes or no.` },
    newUserMessage
  ];

  // newMessages.push({ role: 'user', content: 'What is my previous question? Do you think my previous question is asking for an image or a figure? Please answer me yes or no.' });
  console.log("messagesWithInquiry",messagesWithInquiry)

  const inquiry_data = {
    model: model,
    max_tokens: 700,
    messages: messagesWithInquiry
  }

  // 调用 GPT-4 API
  const inquiry_response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(inquiry_data)
  });



  if (!inquiry_response.ok) {
    throw new Error('GPT-4 API failed')
  }

  // handle response
  if (inquiry_response.ok) {
    const inquiry_responseJSON = await inquiry_response.json();
    const inquiry_answer = inquiry_responseJSON.choices[0].message.content;
    console.log("inquiry_answer",inquiry_answer)
    return inquiry_answer.toLowerCase().includes('yes'); // logic judgement
    // return true;
  }

  return false; // 默认不生成图片
};

// generateImageWithDALLE 函数的实现
const generateImageWithDALLE = async (prompt, model, headers,endpoint) => {
  // code to call DALL-E 3 API
  


  const data = {
    model: model,
    prompt: prompt,
    n: 1,
    size: "1024x1024"
  };

  // const response = await openai.createImage(
  //   data
  // )
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('DALL-E API failed:', errorData);
    throw new Error(`DALL-E API failed with status ${response.status}`);
  }

  let test_response = await response.json();
  // console.log("test_response",test_response)
  const image_url = test_response.data[0].url; // get the figure URL.
  return image_url;
};

/////////////////////////////////////////////////////////////////

const getGPT4VResponse = async (messages,fileBase64, gpt_4V, headers, endpoint) => {

  // if there is a file, add it to the messages array
  if (fileBase64) {
    messages[messages.length - 1].content.push({
      type: 'image_url',
      image_url: fileBase64
    });
  }

  // check the whole messages array to be sent to the API
  console.log("messages to be sent to API",messages);



  const data = {
    model: gpt_4V,
    max_tokens: 700,
    messages: messages
  }
  try {
    const response = await apiClient.post(endpoint, JSON.stringify(data), { headers });
    const responseJSON = await response.data;
    const llmAnswer = responseJSON.choices[0].message.content;
    return llmAnswer;
  } catch (error) {
    // 处理错误
    throw new Error('API failed: ' + error.message);
  }


  // const response = await fetch(endpoint, {
  //   method: 'POST',
  //   headers: headers,
  //   body: JSON.stringify(data)
  // })
  // if (!response.ok) {
  //   throw new Error('API failed')
  // }
  // const responseJSON = await response.json()
  // const llmAnswer = responseJSON.choices[0].message.content
  // return llmAnswer
}
