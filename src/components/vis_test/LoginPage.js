import { React, useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function LoginPage () {
  const [studentName, setStudentName] = useState('')
  const [studentId, setStudentId] = useState('')

  const onChangeStudentName = name => {
    setStudentName(name)
  }

  const onChangeStudentId = id => {
    setStudentId(id)
  }

  useEffect(() => {}, [studentId])

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={2} />
        <Grid xs={8}>
          <Box>
            <h3>
              Instruction: <br />
            </h3>
            <p>
              Please input your name and student ID.
              <br />
              Then Click "Submit" button to go to the test page.
            </p>
          </Box>
          <Stack spacing={2}>
            <TextField
              sx={{ width: '300px' }}
              id='student_id'
              label='Your Name'
              variant='outlined'
              onChange={e => {
                onChangeStudentName(e.target.value)
              }}
            />
            <TextField
              sx={{ width: '300px' }}
              id='student_name'
              label='Student ID'
              variant='outlined'
              onChange={e => {
                onChangeStudentId(e.target.value)
              }}
            />
          </Stack>
          <Button sx={{ mt: 4 }} variant='contained'>
            Submit
          </Button>
        </Grid>
        <Grid xs={2} />
      </Grid>
    </Box>
  )
}
