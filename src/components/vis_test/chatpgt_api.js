export const sendChatToGPT = async text => {
  const apiKey = process.env.REACT_APP_CHATGPT_API_KEY
  const endpoint = process.env.REACT_APP_CHATGPT_API_ENDPOINT
  const modelName = process.env.REACT_APP_CHATGPT_MODEL

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  const data = {
    model: modelName,
    max_tokens: 700,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: text }
    ]
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
