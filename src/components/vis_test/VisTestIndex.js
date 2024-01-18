import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import ChatGPTInterface from './ChatGPTInterface'
import QuestionForm from './QuestionForm'

export default function VisTestIndex () {
  const [studentData, setStudentData] = useState([])
  const [conversationDataParent, setConversationDataParent] = useState([])
  const [answerDataParent, setAnswerDataParent] = useState([])

  const handleConversationData = data => {
    setConversationDataParent(currentData => [...currentData, data])
  }

  const handleAnswerDataParent = data => {
    setAnswerDataParent(currentData => [...currentData, data])
  }

  useEffect(() => {
    console.log('=============')
    console.log(answerDataParent)
  }, [answerDataParent])

  useEffect(() => {
    console.log('=============')
    console.log(conversationDataParent)
  }, [conversationDataParent])

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ChatGPTInterface
            setConversationDataParent={setConversationDataParent}
          />
        </Grid>
        <Grid xs={8}>
          <QuestionForm setAnswerDataParent={setAnswerDataParent} />
        </Grid>
      </Grid>
    </Box>
  )
}
