import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function ChatGPTInterface () {
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
      />
      <Button variant='contained' sx={{ ml: 2, mt: 1 }}>
        Send
      </Button>
    </>
  )
}
