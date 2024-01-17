import React, { useRef, useEffect, useState } from 'react';
import './LBTApp.css';
import Paper from '@mui/material/Paper';
import ChatInputQA from './ChatInputQA';
import EukaryoticCells from '../4-3-eukaryotic-cells/eukaryoticCells_v2'
import { QATopicsHuman } from "../4-3-eukaryotic-cells/eukaryoticCellText_v2";
import useQA from './UseQA';
import {Box, Button } from '@mui/material';
import { logData } from '../misc/userManagement';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LessonModal from './LessonModal';


const LBTApplicationQA = ({ setState, sInfo, returnSurvey }) => {
  const [showLeave, setShowLeave] = useState(false);
  const [usedBot, setUsedBot] = useState(false);
  const wikipediaContainerRef = useRef(null);
  const { qID, qaState, message, setMessage, sendMessage, chatLog } = useQA({ setUsedBot, sInfo });

  // scroll to top of content page
  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest"});
  };
  useEffect(scrollToTop, []);

  const completeApp = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterKnowledge = time;
    sInfo.current.chatLog = chatLog;
    sInfo.current.state = "knowledge";
    logData(sInfo);
    setState("knowledge");
  };

  const clickLeaveButton = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.lessonModalTimes.push(["exit", time]);
    setShowLeave(true);
  }

  useEffect(() => {
    const handleScroll = () => {
      const container = wikipediaContainerRef.current;
      if (container) {
        sInfo.current.scrollLogs.push({
          time: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
          scrollTop: container.scrollTop,
          scrollHeight: container.scrollHeight,
          clientHeight: container.clientHeight
        });
      }
    };

    const container = wikipediaContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {  // Cleanup
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="chat-container-qa">
          <br></br>
          <br></br>
          <div>
            <div className="green-bubble">
              <Typography variant="h5">Learn By Doing:</Typography>
            </div>
            <Paper variant="outlined" elevation={2} sx={{overflowY:"auto", border:'2px solid black', padding:"10px", flex: 1}}>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                Question {qID + 1}:
              </Typography>
              <Typography>{QATopicsHuman[qID].question}</Typography>
            </Paper>
          </div>
          <ChatInputQA message={message} setMessage={setMessage} sendMessage={sendMessage} qaState={qaState} chatLog={chatLog} />
          {(qaState === "SEND") ? (
            <p></p>
          ) : (
            <div>
              <Paper variant="outlined" elevation={2} sx={{overflowY:"auto", border:'2px solid black', padding:"10px", flex: 1}}>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                  Our Answer:
                </Typography>
                <Typography>{QATopicsHuman[qID].solution}</Typography>
              </Paper>
            </div>
          )}
        </div>
        <div className="wikipedia-container" ref={wikipediaContainerRef}>
          <AppBar position="sticky" sx={{ backgroundColor: '#7B7D80' }}>
          <Toolbar>
            <div className="content_header">
            <Typography variant="h4">Organelles in Eukaryotic Cells</Typography>
            </div>
          </Toolbar>
          </AppBar>
          <div className="contentarea-wrapper">
            <div ref={topRef} className="top-ref"/>
            <EukaryoticCells />
            <div>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="text" color="inherit" onClick={returnSurvey}>
                  Return Survey
                </Button>
                <Button variant="outlined" color="primary" onClick={clickLeaveButton}>
                  Begin Test
                </Button>
              </Box>
              <Box sx={{ mt: 12 }} />
            </div>
          </div>
        </div>
      </div>
      <LessonModal show={showLeave} setShow={setShowLeave} condition={sInfo.current.condition} completeApp={completeApp}/>
    </div>
  );
};

export default LBTApplicationQA;
