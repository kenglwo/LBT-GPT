import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Test1 from './tests/Test1'

export default function QuestionForm () {
  const [studentAnswerData, setStudentAnswerData] = useState([])
  const [studentAnswerArrayParent, setStudentAnswerArrayParent] = useState([])
  const [answerSubmissionStatus, setAnswerSubmissionStatus] = useState([
    'not yet'
  ])
  const [studentName, setStudentName] = useState([])
  const [studentId, setStudentId] = useState([])

  const handleStudentAnswerArray = array => {
    try {
      const now = new Date()
      const timestamp = `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      setStudentAnswerArrayParent(array)
      const answerData = {
        studentId: studentId,
        studentName: studentName,
        answerArray: array,
        timestmap: timestamp
      }
      console.log(answerData)
      setAnswerSubmissionStatus('success')
    } catch (error) {
      setAnswerSubmissionStatus('error')
      console.log(error)
    }
  }

  const onChangeStudentName = name => {
    setStudentName(name)
  }
  const onChangeStudentId = id => {
    setStudentId(id)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, float: 'left' }}>
        <span>Name: </span>
        <TextField
          sx={{ width: '200px', ml: 2, mt: 2 }}
          id=''
          rows={1}
          placeholder=''
          onChange={e => {
            onChangeStudentName(e.target.value)
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span>Student ID: </span>
        <TextField
          sx={{ width: '200px', ml: 2, mt: 2 }}
          id=''
          rows={1}
          placeholder=''
          onChange={e => {
            onChangeStudentId(e.target.value)
          }}
        />
      </Box>
      <Test1 handleStudentAnswerArray={handleStudentAnswerArray} />
      {answerSubmissionStatus === 'success' && (
        <Alert severity='success' sx={{ width: '400px', ml: 5, mt: 3 }}>
          Your answer was successfully submitted
        </Alert>
      )}
      {answerSubmissionStatus === 'error' && (
        <Alert severity='error' sx={{ width: '400px', ml: 5, mt: 3 }}>
          Submission failed due to some error
        </Alert>
      )}
    </>
  )
}