// Modal.js
import React from 'react';
import { Container, Button, Paper, CardContent, Stack } from '@mui/material';
import attentionImage from "../../assets/images/attention_sign.png";


const Modal = ({ show, setShow, screenState }) => {
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
                        src={attentionImage}
                        style={{ width: 150, height: 150, borderRadius: 'none' }}
                    />
                </Stack>
                <div style={{ align: "left", marginLeft: '40px' }}>
                  <h1>Please stay focused on the task!</h1>
                  {(screenState === "knowledge") ? (
                    <h3>1. Please answer the questions carefully to the <b>best of your knowledge</b>.</h3>
                    ) : (<h3>1. Please complete the activity to the best of your ability.</h3>)}
                  {((screenState === "survey") || (screenState === "demographics")) ? (
                    <div/>) : (<h3>2. Please do not search for answers online.</h3>)}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outlined" color="primary" onClick={() => setShow(false)}>Resume Task</Button>
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

export default Modal;
