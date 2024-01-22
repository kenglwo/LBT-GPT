export const sendChatToGPT = async (conversationHistory, text, fileBase64) => {
  const apiKey = process.env.REACT_APP_CHATGPT_API_KEY
  const endpoint = process.env.REACT_APP_CHATGPT_API_ENDPOINT
  const modelName = process.env.REACT_APP_CHATGPT_MODEL



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
  

  // add the new text message to the messages array. Need to distingish between figure and text.
  messages.push({ role: 'user', content: [{ type: 'text', text: text }] });

  // if there is a file, add it to the messages array
  if (fileBase64) {
    messages[messages.length - 1].content.push({
      type: 'image_url',
      image_url: fileBase64
    });
  }

  // check the whole messages array to be sent to the API
  console.log(messages);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  const data = {
    model: modelName,
    max_tokens: 700,
    messages: messages
    // messages: [
    //   { role: 'system', content: 'You are a helpful assistant.' },
    //   { role: 'user', content: combinedText }
    // ]
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
