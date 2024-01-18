import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import { sendChatToGPT } from './chatpgt_api'

export default function ChatGPTInterface () {
  const [studentInputPrompt, setStudentInputPrompt] = useState('')
  const [conversationData, setConversationData] = useState([])

  const onChangeStudentInputPrompt = inputText => {
    setStudentInputPrompt(inputText)
  }

  const conversationContainers = conversationData.map((conversation, i) => {
    if (conversation.role === 'student') {
      return (
        <Box key={i} class='student_question_container' sx={{ mt: 4 }}>
          <Stack
            direction='row'
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Avatar alt='Remy Sharp' src='/images/user.png' />
            <h3>You</h3>
          </Stack>
          <Box
            sx={{
              m: 2,
              textAlign: 'left'
            }}
          >
            <p>{conversation.prompt}</p>
          </Box>
        </Box>
      )
    } else if (conversation.role === 'chatgpt') {
      return (
        <Box key={i} class='llm_answer_container' sx={{ mt: 4 }}>
          <Stack
            direction='row'
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Avatar alt='Remy Sharp' src='/images/student.jpeg' />
            <h3>ChatGPT</h3>
          </Stack>
          <Box
            sx={{
              m: 2,
              textAlign: 'left'
            }}
          >
            <p>{conversation.prompt}</p>
          </Box>
        </Box>
      )
    } else {
      return <div />
    }
  })

  const onClickSubmit = async () => {
    const now = new Date()
    const timestamp = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const conversationDataStudent = {
      role: 'student',
      prompt: studentInputPrompt,
      timestamp: timestamp
    }
    setConversationData(currentData => [
      ...currentData,
      conversationDataStudent
    ])

    const llmAnswer = await sendChatToGPT(studentInputPrompt)

    const now2 = new Date()
    const timestamp2 = `${now2.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const conversationDataLLM = {
      role: 'chatgpt',
      prompt: llmAnswer,
      timestamp: timestamp2
    }
    setConversationData(currentData => [...currentData, conversationDataLLM])
    // console.log(llmAnswer)
  }

  useEffect(() => {
    // if (conversationData.role === 'student')
  }, [conversationData])
  return (
    <>
      <Box
        id='chat_area'
        sx={{
          height: '75vh',
          width: 400,
          display: 'inline-block',
          p: 1,
          mx: 1,
          border: '2px solid black',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          overflow: 'auto'
        }}
      >
        Chat Area
        {conversationContainers}
      </Box>
      <TextField
        sx={{ width: '90%', ml: 2, mt: 2 }}
        id=''
        multiline
        rows={2}
        placeholder='Enter your question here'
        onChange={e => {
          onChangeStudentInputPrompt(e.target.value)
        }}
      />
      <Button variant='contained' sx={{ ml: 2, mt: 1 }} onClick={onClickSubmit}>
        Send
      </Button>
    </>
  )
}
