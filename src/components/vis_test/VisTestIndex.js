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
    if (answerDataParent.length > 0) {
      const url = `${process.env.REACT_APP_API_URL}/save_student_data`
      const method = 'POST'
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
      const studentId = document.querySelector('#student_id').value
      const body = {
        data_id: 'answer_data',
        student_id: studentId,
        data: answerDataParent
      }
      console.log(body)
      const bodyJSON = JSON.stringify(body)
      console.log(bodyJSON)

      fetch(url, { method: method, headers: headers, body: bodyJSON })
        .then(res => res.json())
        .then(result => {
          if (result.status === 'success') {
            //
          } else {
            //
          }
        })
        .catch(console.error)
    }
  }, [answerDataParent])

  useEffect(() => {
    // console.log('=============')
    // console.log(conversationDataParent)
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
