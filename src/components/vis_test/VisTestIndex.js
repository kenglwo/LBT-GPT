import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import ChatGPTInterface from './ChatGPTInterface'
import QuestionForm from './QuestionForm'

export default function VisTestIndex () {
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ChatGPTInterface />
        </Grid>
        <Grid xs={8}>
          <QuestionForm />
        </Grid>
      </Grid>
    </Box>
  )
}
