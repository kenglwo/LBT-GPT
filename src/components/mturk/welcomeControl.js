import React from 'react';
import { Container, Typography, Box, Button, Card, CardContent } from '@mui/material';
import { logData } from '../misc/userManagement';


const WelcomeScreenControl = ({ setState, sInfo, returnSurvey }) => {

  const completeWelcome = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterMain = time;
    sInfo.current.state = "main";
    logData(sInfo);
    setState("main");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Instructions
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="body1" align="left">
          <p>Welcome to the study! Your goals are: (1) Study the lesson material by reading it carefully;
            (2) Take a test about the studied concepts;
            (3) Complete the learning experience survey and the demographic survey.</p>
          <p>Please learn the lesson carefully. You cannot go back to the lesson page when you take the test.</p>
          <p>Please do not refresh the browser or click the back button.</p>
          <p>Click the “START” button below these instructions to proceed to
            the lesson. After you finished studying the lesson content, you can click
            the "COMPLETE LESSON” button below the learning material to begin the
            test. Afterwards you will proceed to the learning experience survey
            and the demographic survey.</p>
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="text" color="inherit" onClick={returnSurvey}>
          Return Survey
        </Button>
        <Button variant="outlined" color="primary" onClick={completeWelcome}>
          Start
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomeScreenControl;
