// Modal.js
import React from 'react';
import { Container, Button, Paper, CardContent, Stack } from '@mui/material';
import professorImage from "../../assets/images/prof.svg";


const LessonModal = ({ show, setShow, condition, completeApp }) => {
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <img
                        alt=""
                        src={professorImage}
                        style={{ width: 150, height: 150, borderRadius: 'none' }}
                    />
                </Stack>
                <div style={{ align: "left", marginLeft: '80px' }}>
                  {(condition === "reading") ? (
                    <div>
                      <h1>Are you ready to take the test now?</h1>
                      <h3>You cannot return to the lesson after starting the test.</h3>
                    </div>
                  ) : (
                    <div>
                      <h1>Are you ready to take the test now?</h1>
                      <h3>Have you answered all of Ruffle's questions?</h3>
                      <h3>You cannot return to the lesson after starting the test.</h3>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => setShow(false)}
                      style={{marginRight: '30px' }} // Add margin to the right
                    >
                      Resume Lesson
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={completeApp} 
                    >
                      Begin Test
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Paper>
        </Container>
      </div>
    </div>
  );  
};

export default LessonModal;
