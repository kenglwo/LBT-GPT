import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import test_0101_figure from '../../../assets/images/question_figures/test_01/test_01_01.png'
import test_0102_figure from '../../../assets/images/question_figures/test_01/test_01_02.png'
// import test_0001_figure from '../../../assets/images/question_figures/test_00/pl_vis.jpg'

export default function Test1 (props) {
  const [studentAnswerArray, setStudentAnswerArray] = useState([])
  const [studentAnswer0_1, setStudentAnswer0_1] = useState('')
  const [studentAnswer0_2, setStudentAnswer0_2] = useState('')
  // const [studentAnswer0_3, setStudentAnswer0_3] = useState('')
  const [studentAnswer1_1, setStudentAnswer1_1] = useState('')
  const [studentAnswer1_2, setStudentAnswer1_2] = useState('')
  const [studentAnswer2_1, setStudentAnswer2_1] = useState('')
  // const [studentAnswer2_2, setStudentAnswer2_2] = useState('')
  // const [studentAnswer2_3, setStudentAnswer2_3] = useState('')
  const [studentAnswer3, setStudentAnswer3] = useState('')
  // const [answerSubmissionStatus, setAnswerSubmissionStatus] = useState(null)
  // const [isVisible, setIsVisible] = useState(true); // default is true

  const [currentPage, setCurrentPage] = useState(1) // add a stage to control the page

  const onChangeAnswer0_1 = answerText => {
    setStudentAnswer0_1(answerText)
  }
  const onChangeAnswer0_2 = answerText => {
    setStudentAnswer0_2(answerText)
  }
  // const onChangeAnswer0_3 = answerText => {
  //   setStudentAnswer0_3(answerText)
  // }
  const onChangeAnswer1_1 = answerText => {
    setStudentAnswer1_1(answerText)
  }
  const onChangeAnswer1_2 = answerText => {
    setStudentAnswer1_2(answerText)
  }

  const onChangeAnswer2_1 = answerText => {
    setStudentAnswer2_1(answerText)
  }

  // const onChangeAnswer2_2 = answerText => {
  //   setStudentAnswer2_2(answerText)
  // }

  // const onChangeAnswer2_3 = answerText => {
  //   setStudentAnswer2_3(answerText)
  // }

  const onChangeAnswer3 = answerText => {
    setStudentAnswer3(answerText)
  }

  const onClickFinishButton = () => {
    // get answer array from the child
    props.handleStudentAnswerArray(studentAnswerArray)
  }

  useEffect(() => {
    console.log('===========')
    console.log(props.answerSubmissionStatus)
    //  setAnswerSubmissionStatus(props.answerSubmissionStatus)
  }, [props.answerSubmissionStatus])

  useEffect(() => {
    const answer0_1 = { question_id: 'test1_q0_1', answer: studentAnswer0_1 }
    const answer0_2 = { question_id: 'test1_q0_2', answer: studentAnswer0_2 }
    // const answer0_3 = { question_id: 'test1_q0_3', answer: studentAnswer0_3 }
    const answer1 = { question_id: 'test1_q1', answer: studentAnswer1_1 }
    const answer2_1 = { question_id: 'test1_', answer: studentAnswer2_1 }
    // const answer2_2 = { question_id: 'test1_q2_2', answer: studentAnswer2_2 }
    // const answer2_3 = { question_id: 'test1_q2_3', answer: studentAnswer2_3 }
    const answer3 = { question_id: 'test1_q3', answer: studentAnswer3 }
    const answerArray = [
      answer0_1,
      answer0_2,
      // answer0_3,
      answer1,
      answer2_1,
      // answer2_2,
      // answer2_3,
      answer3
    ]

    setStudentAnswerArray([...answerArray])
    console.log('====== Test1.js =====')
    console.log(answerArray)
  }, [
    studentAnswer0_1,
    studentAnswer0_2,
    // studentAnswer0_3,
    studentAnswer1_1,
    studentAnswer1_2,
    studentAnswer2_1,
    // studentAnswer2_2,
    // studentAnswer2_3,
    studentAnswer3
  ]) // 添加依赖项数组

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <h2>Test One</h2>
            <strong className='question_text'>
              The concepts to be covered in this test are as follows:
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                {' '}
                data mining &amp;
              </span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                data visualization
              </span>
              ,
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                color encoding
              </span>
              ,
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                color scheme &amp;
              </span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                color map
              </span>
              .
            </strong>
            <br />
            <strong>
              Please use 10 minutes to explore and learn these concepts with GPT
              and then finish this test.
            </strong>

            <Button
              variant='contained'
              sx={{ ml: 5, mt: 1 }}
              onClick={() => setCurrentPage(2)}
            >
              Next Page
            </Button>
          </>
        )
      case 2:
        return (
          <>
            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                0.1 What is the relationship between data mining and data
                visualization?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_0_1'
                value={studentAnswer0_1}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer0_1(e.target.value)
                }}
              />
            </Box>
            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                0.2 What is encoding in data visualization? Could you give some
                examples?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_0_2'
                value={studentAnswer0_2}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer0_2(e.target.value)
                }}
              />
            </Box>
            {/* <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                0.3 What is a color scheme ? What is a color map? Could you give
                some examples for both of them?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_0_3'
                value={studentAnswer0_3}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer0_3(e.target.value)
                }}
              />
            </Box> */}

            <Button
              variant='contained'
              sx={{ ml: 5, mt: 1 }}
              onClick={() => setCurrentPage(3)}
            >
              Next Page
            </Button>
          </>
        )
      case 3:
        return (
          <>
            <p>Please analyze the color scheme used in the PG defense demo: </p>
            <img
              src={test_0101_figure}
              alt='User Uploaded'
              style={{ maxWidth: '75%', height: 'auto' }}
            />

            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                1. In the main view, what does the color encode? Do you agree
                with the color scheme used? What are your suggestions?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_1_1'
                value={studentAnswer1_1}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer1_1(e.target.value)
                }}
              />
            </Box>
            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                2. Please evaluate this visualization's design against at least
                one design principle.
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_1_2'
                value={studentAnswer1_2}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer1_2(e.target.value)
                }}
              />
            </Box>
            <Button
              variant='contained'
              sx={{ ml: 5, mt: 1 }}
              onClick={() => setCurrentPage(4)}
            >
              Next Page
            </Button>
          </>
        )
      case 4:
        return (
          <>
            <p>Please analyze the color scheme used in the PG defense demo: </p>
            <img
              src={test_0102_figure}
              alt='User Uploaded'
              style={{ maxWidth: '50%', height: 'auto' }}
            />
            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                2.1 In the supervisor view, can you deduce or interpret what
                does the color encode?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_2_1'
                value={studentAnswer2_1}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer2_1(e.target.value)
                }}
              />
            </Box>
            {/* <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                2.2 If we want to use the color to encode the number of PG
                students graduated by each supervisor, please suggest a color
                map.
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_2_2'
                value={studentAnswer2_2}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer2_2(e.target.value)
                }}
              />
            </Box> */}
            {/* <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                2.3 If we want to use the color to encode the research area of
                supervisors, please suggest a color map.
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_2_3'
                value={studentAnswer2_3}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer2_3(e.target.value)
                }}
              />
            </Box> */}

            <Button
              variant='contained'
              sx={{ ml: 5, mt: 1 }}
              onClick={() => setCurrentPage(5)}
            >
              Next Page
            </Button>
          </>
        )
      case 5:
        return (
          <>
            <Box sx={{ m: 3 }}>
              <strong className='question_text'>
                3. If the two views use colors to encode totally different
                things, will it cause any problems to users? How to avoid these
                problems?
              </strong>
              <TextField
                sx={{ width: '90%', ml: 2, mt: 2 }}
                id='answer_zone_3_1'
                value={studentAnswer3}
                multiline
                rows={4}
                placeholder='Enter your answer here'
                onChange={e => {
                  onChangeAnswer3(e.target.value)
                }}
              />
            </Box>
            {props.answerSubmissionStatus === 'success' ? (
              <div />
            ) : (
              <Button
                variant='contained'
                sx={{ ml: 5, mt: 1 }}
                onClick={onClickFinishButton}
              >
                Send
              </Button>
            )}
          </>
        )
      default:
        return <div>Page not found</div>
    }
  }

  return <>{renderPage()}</>
}
