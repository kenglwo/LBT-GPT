// Modal.js
import React from 'react';
import { Container, Button, Paper, CardContent, Stack } from '@mui/material';


const ReturnModal = ({ show, setShow, terminateSurvey }) => {
  if (!show) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }}>
      <div style={{ position: 'relative', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', padding: '1em' }}>
        <Container component="main" maxWidth="md">
          <Paper elevation={3}>
            <CardContent>
              <h1>Do you want to stop participating in this Survey?</h1>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => setShow(false)}
                    style={{marginRight: '80px' }}
                  >
                    Continue Survey
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={terminateSurvey} 
                  >
                    Stop Participation
                  </Button>
                </div>
            </CardContent>
          </Paper>
        </Container>
      </div>
    </div>
  );  
};

export default ReturnModal;
