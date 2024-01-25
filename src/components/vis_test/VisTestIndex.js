import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import ChatGPTInterface from './ChatGPTInterface'
import QuestionForm from './QuestionForm'

export default function VisTestIndex () {
  const [studentData, setStudentData] = useState([])
  const [conversationDataParent, setConversationDataParent] = useState([])
  const [answerDataParent, setAnswerDataParent] = useState([])
  // const [hasClickedNextPage, setHasClickedNextPage] = useState(false);
  // const [hasEnteredTest, setHasEnteredTest] = useState(false);
  const [testStarted, setTestStarted] = useState(false)

  const location = useLocation()

  const handleTestStart = () => {
    setTestStarted(true)
  }

  const resetTest = () => {
    setTestStarted(false)
  }

  // const handleNextPageClick = () => {
  //   if (!hasClickedNextPage) {
  //     saveConversationData(conversationDataParent, 'conversation_data');
  //     setHasClickedNextPage(true);
  //   }
  // };

  const handleConversationData = newEntries => {
    setConversationDataParent(currentData => [...currentData, ...newEntries])
  }

  const handleAnswerDataParent = data => {
    setAnswerDataParent(currentData => [...currentData, data])
  }

  useEffect(() => {
    if (answerDataParent.length > 0) {
      console.log('answerDataParent', answerDataParent)
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
      const bodyJSON = JSON.stringify(body)

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
    const sendConversationData = async () => {
      console.log('conversationDataParent to be saved', conversationDataParent)
      if (conversationDataParent.length > 0) {
        const studentId = document.querySelector('#student_id').value
        const url = `${process.env.REACT_APP_API_URL}/save_student_data`
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }

        // distinglish which table to store the data
        const dataId = testStarted
          ? 'quiz_conversation_data'
          : 'conversation_data'

        const requests = conversationDataParent.map(newData => {
          const bodyJSON = JSON.stringify({
            // data_id: 'conversation_data',
            data_id: dataId,
            student_id: studentId,
            data: newData
          })

          return fetch(url, {
            method: 'POST',
            headers: headers,
            body: bodyJSON
          })
            .then(res => res.json())
            .then(result => {
              if (result.status !== 'success') {
                console.error('Error saving data:', result)
              }
            })
            .catch(console.error)
        })

        await Promise.all(requests)
        setConversationDataParent([]) // clear conversationDataParent to avoid duplicate saving
      }
    }

    sendConversationData()
  }, [conversationDataParent, testStarted])

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ChatGPTInterface
            setConversationDataParent={setConversationDataParent}
            testStarted={testStarted}
            resetTest={resetTest}
          />
        </Grid>
        <Grid xs={8}>
          <QuestionForm
            setAnswerDataParent={setAnswerDataParent}
            // setTestStarted={setTestStarted}
            onTestStart={handleTestStart}
            setConversationDataParent={setConversationDataParent}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
