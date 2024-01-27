import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Test1 from './tests/Test1'
// import Button from '@mui/material/Button'

export default function QuestionForm ({setAnswerDataParent, onTestStart, setConversationDataParent }) {
  const [studentAnswerArrayParent, setStudentAnswerArrayParent] = useState([])
  const [answerSubmissionStatus, setAnswerSubmissionStatus] = useState([
    'not yet'
  ])
  const [studentName, setStudentName] = useState([])
  const [studentId, setStudentId] = useState([])

  const [currentPage, setCurrentPage] = useState(1);

  // add a state to infer if user enter the test mode
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = () => {
    onTestStart(); // Trigger test start in VisTestIndex
    setIsTestStarted(true); // Update state to indicate that user has entered the test

    // // clear the conversation history variable.
    // setConversationDataParent([]);

    // // mark the start of the test
    // setIsTestStarted(true);

  };

  const handleStudentAnswerArray = array => {
    try {
      setStudentAnswerArrayParent(array)
      setAnswerSubmissionStatus('success')
    } catch (error) {
      setAnswerSubmissionStatus('error')
      console.log(error)
    }
  }

  if (isTestStarted) {
    // if start the test，rander "Test1" component
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
    );

  } else {
    // if haven't start the test, render the "Start Test" button with the instructions
    return (
      <div>
        <h2>Test One</h2>
            <strong className='question_text'>
              The concepts to be covered in this test are as follows:
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                {' '}
                Data mining &amp;
              </span>
              <span style={{ color: 'green', fontWeight: 'bold' }}>
              {' '}
                Data visualization
              </span>
              ,
              <span style={{ color: 'green', fontWeight: 'bold' }}>
              {' '}
              Visual perception 
              </span>
              ,
              <span style={{ color: 'green', fontWeight: 'bold' }}>
              {' '}
              Visualization design criteria 
              </span>
              {/* <span style={{ color: 'green', fontWeight: 'bold' }}>
              {' '}
                color map
              </span> */}
              .
            </strong>
            <br />
            <strong>
              Please use 
              <span style={{ color: 'blue', fontWeight: 'bold' }}>
              {' '}
                15 
                {' '}
              </span> 
              minutes to explore and learn these concepts with GPT
              and then finish this test.
            </strong>
        {/* <button onClick={startTest}>Start Test</button> */}
        <Button
              variant='contained'
              sx={{ ml: 5, mt: 1 }}
              onClick={startTest}
            >
              Start Test
            </Button>
        
      </div>
    );
  }


//   const handleStudentAnswerArray = array => {
//     try {
//       setStudentAnswerArrayParent(array)
//       setAnswerSubmissionStatus('success')
//     } catch (error) {
//       setAnswerSubmissionStatus('error')
//       console.log(error)
//     }
//   }

//   const onChangeStudentName = name => {
//     setStudentName(name)
//   }
//   const onChangeStudentId = id => {
//     setStudentId(id)
//   }

//   const handleNextPageClick = () => {
//     // 执行任何需要的操作，如保存当前对话数据等
//     if (props.onNextPageClick) {
//       props.onNextPageClick(); // 调用从 VisTestIndex 传递的函数
//   }
// }

  // useEffect(() => {
  //   props.setAnswerDataParent(studentAnswerArrayParent)
  // }, [studentAnswerArrayParent])
  // return (
  //   <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, float: 'left' }}>
        <span>Name: </span>
        <TextField
          sx={{ width: '200px', ml: 2, mt: 2 }}
          id='student_name'
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
          id='student_id'
          rows={1}
          placeholder=''
          onChange={e => {
            onChangeStudentId(e.target.value)
          }}
        />
      </Box> */}
      {/* <Test1 handleStudentAnswerArray={handleStudentAnswerArray} /> */}
      {/* <Button
        variant='contained'
        sx={{ ml: 5, mt: 1 }}
        onClick={handleNextPageClick}
      >
        Next Page
      </Button> */}

      {/* {answerSubmissionStatus === 'success' && (
        <Alert severity='success' sx={{ width: '400px', ml: 5, mt: 3 }}>
          Your answer was successfully submitted
        </Alert>
      )}
      {answerSubmissionStatus === 'error' && (
        <Alert severity='error' sx={{ width: '400px', ml: 5, mt: 3 }}>
          Submission failed due to some error
        </Alert>
      )} */}
  //   </>
  // )
}
