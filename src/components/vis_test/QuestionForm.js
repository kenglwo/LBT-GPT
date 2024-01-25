import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Test1 from './tests/Test1'
import Button from '@mui/material/Button'

export default function QuestionForm (props) {
  const [studentAnswerArrayParent, setStudentAnswerArrayParent] = useState([])
  const [answerSubmissionStatus, setAnswerSubmissionStatus] = useState([
    'not yet'
  ])
  const [studentName, setStudentName] = useState([])
  const [studentId, setStudentId] = useState([])

  const [currentPage, setCurrentPage] = useState(1)

  // 添加状态来跟踪用户是否进入了测试
  const [isTestStarted, setIsTestStarted] = useState(false)

  useEffect(() => {
    props.setAnswerDataParent(studentAnswerArrayParent)
  }, [studentAnswerArrayParent])

  const startTest = () => {
    // 清空当前对话数据
    props.setConversationDataParent([])

    // 标记测试开始
    setIsTestStarted(true)

    // 通知 VisTestIndex 组件，用户已进入测试
    props.setHasEnteredTest(true)
  }

  if (isTestStarted) {
    // 如果测试已开始，渲染 Test1 组件
    return <Test1 handleStudentAnswerArray={props.handleStudentAnswerArray} />
  } else {
    // 如果测试未开始，显示开始测试的按钮
    return (
      <div>
        {/* 其他表单元素 */}
        <button onClick={startTest}>Start Test</button>
      </div>
    )
  }

  const handleStudentAnswerArray = array => {
    try {
      setStudentAnswerArrayParent(array)
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

  const handleNextPageClick = () => {
    // 执行任何需要的操作，如保存当前对话数据等
    if (props.onNextPageClick) {
      props.onNextPageClick() // 调用从 VisTestIndex 传递的函数
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, float: 'left' }}>
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
      </Box>
      <Test1 handleStudentAnswerArray={handleStudentAnswerArray} />
      <Button
        variant='contained'
        sx={{ ml: 5, mt: 1 }}
        onClick={handleNextPageClick}
      >
        Next Page
      </Button>

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
