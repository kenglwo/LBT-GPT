import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Test1 (props) {
  const [studentAnswerArray, setStudentAnswerArray] = useState([])
  const [studentAnswer1, setStudentAnswer1] = useState('')
  const [studentAnswer2_1, setStudentAnswer2_1] = useState('')
  const [studentAnswer2_2, setStudentAnswer2_2] = useState('')
  const [studentAnswer2_3, setStudentAnswer2_3] = useState('')
  const [studentAnswer3, setStudentAnswer3] = useState('')

  const onChangeAnswer1 = answerText => {
    setStudentAnswer1(answerText)
  }

  const onChangeAnswer2_1 = answerText => {
    setStudentAnswer2_1(answerText)
  }

  const onChangeAnswer2_2 = answerText => {
    setStudentAnswer2_2(answerText)
  }

  const onChangeAnswer2_3 = answerText => {
    setStudentAnswer2_3(answerText)
  }

  const onChangeAnswer3 = answerText => {
    setStudentAnswer3(answerText)
  }

  const onClickFinishButton = () => {
    // get answer array from the child
    props.handleStudentAnswerArray(studentAnswerArray)
  }

  useEffect(() => {
    const answer1 = { question_id: 'test1_q1', answer: studentAnswer1 }
    const answer2_1 = { question_id: 'test1_q2_1', answer: studentAnswer2_1 }
    const answer2_2 = { question_id: 'test1_q2_2', answer: studentAnswer2_2 }
    const answer2_3 = { question_id: 'test1_q2_3', answer: studentAnswer2_3 }
    const answer3 = { question_id: 'test1_q3', answer: studentAnswer3 }
    const answerArray = [answer1, answer2_1, answer2_2, answer2_3, answer3]

    setStudentAnswerArray(answerArray)
  })
  return (
    <>
      <h2>Test 1</h2>
      <p>Please analyze the color scheme used in the PG defense demo: </p>
      <a href='http://vis.cse.ust.hk/pqeDefenceVis/'>
        http://vis.cse.ust.hk/pqeDefenceVis/
      </a>
      <Box sx={{ m: 3 }}>
        <strong class='question_text'>
          1. In the main view, what does the color encode? Do you agree with the
          color scheme used? What are your suggestions?
        </strong>
        <TextField
          sx={{ width: '90%', ml: 2, mt: 2 }}
          id=''
          multiline
          rows={4}
          placeholder='Enter your answer here'
          onChange={e => {
            onChangeAnswer1(e.target.value)
          }}
        />
      </Box>
      <Box sx={{ m: 3 }}>
        <strong class='question_text'>
          2.1 In the supervisor view, what does the color encode?
        </strong>
        <TextField
          sx={{ width: '90%', ml: 2, mt: 2 }}
          id=''
          multiline
          rows={4}
          placeholder='Enter your answer here'
          onChange={e => {
            onChangeAnswer2_1(e.target.value)
          }}
        />
      </Box>
      <Box sx={{ m: 3 }}>
        <strong class='question_text'>
          2.2 If we want to use the color to encode the number of PG students
          graduated by each supervisor, please suggest a color map.
        </strong>
        <TextField
          sx={{ width: '90%', ml: 2, mt: 2 }}
          id=''
          multiline
          rows={4}
          placeholder='Enter your answer here'
          onChange={e => {
            onChangeAnswer2_2(e.target.value)
          }}
        />
      </Box>
      <Box sx={{ m: 3 }}>
        <strong class='question_text'>
          2.3 If we want to use the color to encode the research area of
          supervisors, please suggest a color map.
        </strong>
        <TextField
          sx={{ width: '90%', ml: 2, mt: 2 }}
          id=''
          multiline
          rows={4}
          placeholder='Enter your answer here'
          onChange={e => {
            onChangeAnswer2_3(e.target.value)
          }}
        />
      </Box>
      <Box sx={{ m: 3 }}>
        <strong class='question_text'>
          3. If the two views use colors to encode totally different things,
          will it cause any problems to users? How to avoid these problems?
        </strong>
        <TextField
          sx={{ width: '90%', ml: 2, mt: 2 }}
          id=''
          multiline
          rows={4}
          placeholder='Enter your answer here'
          onChange={e => {
            onChangeAnswer3(e.target.value)
          }}
        />
      </Box>
      <Button
        variant='contained'
        sx={{ ml: 5, mt: 1 }}
        onClick={onClickFinishButton}
      >
        Send
      </Button>
    </>
  )
}
