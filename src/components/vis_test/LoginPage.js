import { React, useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

export default function LoginPage () {
  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={2} />
        <Grid xs={8}>Hello</Grid>
        <Grid xs={2} />
      </Grid>
    </Box>
  )
}
