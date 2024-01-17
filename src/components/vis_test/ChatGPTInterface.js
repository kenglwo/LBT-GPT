import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function ChatGPTInterface () {
  const [studentInputPrompt, setStudentInputPrompt] = useState('')

  const onChangeStudentInputPrompt = inputText => {
    setStudentInputPrompt(inputText)
  }

  const onClickSubmit = () => {
    console.log(studentInputPrompt)
  }

  useEffect(() => {}, [studentInputPrompt])
  return (
    <>
      <Box
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
          textAlign: 'center'
        }}
      >
        Chat Area
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
