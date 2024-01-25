export const sendChatToGPT = async (conversationHistory, text, fileBase64) => {
  const apiKey = process.env.REACT_APP_CHATGPT_API_KEY
  const endpoint = process.env.REACT_APP_CHATGPT_API_ENDPOINT
  const dalle_endpoint = process.env.REACT_APP_DALLE_API_ENDPOINT
  const gpt_4V = process.env.REACT_APP_GPT_4V_MODEL
  const gpt_4 = process.env.REACT_APP_GPT_4_MODEL
  const dalle2 = process.env.REACT_APP_DALLE_2_MODEL

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  };

  // use the conversation history to create the messages array. Need to handle the image_url type in previous conversation.
  const messages = conversationHistory.map(conversation => {
    // reform the messages data according to the correct API format.
    let content;
    if (conversation.type === 'text') {
      content = { type: 'text', text: conversation.content };
    } else if (conversation.type === 'image_url') {
      content = { type: 'image_url', image_url: conversation.content };
    }
  
    return {
      role: conversation.role,
      content: content ? [content] : [] // 确保content是一个数组
    };
  });
  

  // add the new text Prompt to the messages array. Need to distingish between figure and text.
  const newPrompt = { role: 'user', content: [{ type: 'text', text: text }] };
  messages.push(newPrompt);


  // 先询问 GPT-4 是否需要生成图片
  const shouldGenerateImage = await askGPTShouldGenerateImage(text, gpt_4, headers, endpoint);
  console.log("shouldGenerateImage",shouldGenerateImage)

  if (shouldGenerateImage) {
    // 如果 GPT-4 建议生成图片，调用 DALL-E 3
    const imageResponse = await generateImageWithDALLE(text, dalle2, headers,dalle_endpoint); // 或根据需要修改 prompt
    console.log("imageResponse",imageResponse)
    // return { type: 'image', content: imageResponse };
    return imageResponse
  } else {
    console.log("noImageResponse!")
    // 否则，继续处理文本回复
    return await getGPT4VResponse(messages,fileBase64, gpt_4V, headers, endpoint);
  }
};

const askGPTShouldGenerateImage = async (text, model, headers, endpoint) => {
  // const messages = [];
  const newUserMessage = { role: 'user', content: [{ type: 'text', text: text }] };
  // messages.push(newUserMessage);

  // 构造一个新的消息数组，包括用户的输入和一个询问是否生成图片的问题
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

  // 处理响应
  if (inquiry_response.ok) {
    const inquiry_responseJSON = await inquiry_response.json();
    const inquiry_answer = inquiry_responseJSON.choices[0].message.content;
    console.log("inquiry_answer",inquiry_answer)
    return inquiry_answer.toLowerCase().includes('yes'); // 简单的判断逻辑
    // return true;
  }

  return false; // 默认不生成图片
};

// generateImageWithDALLE 函数的实现
const generateImageWithDALLE = async (prompt, model, headers,endpoint) => {
  // 调用 DALL-E 3 API 的代码
  // const dalleEndpoint = 'YOUR_DALLE_API_ENDPOINT'; // 替换成你的 DALL-E 3 API 端点


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

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error('API failed')
  }
  const responseJSON = await response.json()
  const llmAnswer = responseJSON.choices[0].message.content
  return llmAnswer
}
