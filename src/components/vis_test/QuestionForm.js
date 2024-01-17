import { React, useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Test1 from './tests/Test1'

export default function QuestionForm () {
  const [studentAnswerArrayParent, setStudentAnswerArrayParent] = useState([])
  const [answerSubmissionStatus, setAnswerSubmissionStatus] = useState([
    'not yet'
  ])

  const handleStudentAnswerArray = array => {
    try {
      setStudentAnswerArrayParent(array)
      console.log(array)
      setAnswerSubmissionStatus('success')
    } catch (error) {
      setAnswerSubmissionStatus('error')
      console.log(error)
    }
  }
  //   useEffect(() => {}, [studentInputPrompt])
  return (
    <>
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
