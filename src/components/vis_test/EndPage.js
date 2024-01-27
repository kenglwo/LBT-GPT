import { React } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert';

export default function EndPage () {

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container spacing={2}>
        <Grid xs={2} />
        <Grid xs={8}>
          <Box sx={{mt: 5}}>
            <Alert severity="success">Your answers have been successfully submitted</Alert>
          </Box>
        </Grid>
        <Grid xs={2} />
      </Grid>
    </Box>
  )
}
