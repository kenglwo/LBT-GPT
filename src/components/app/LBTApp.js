import React, { useRef, useEffect, useState } from 'react';
import './LBTApp.css';
import Paper from '@mui/material/Paper';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import TASBox from './TASBox';
import EukaryoticCells from '../4-3-eukaryotic-cells/eukaryoticCells_v2'
import useChat from './UseChat';
import {Box, Button } from '@mui/material';
import { logData } from '../misc/userManagement';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LessonModal from './LessonModal';


const LBTApplication = ({ setState, sInfo, returnSurvey }) => {
  const [showLeave, setShowLeave] = useState(false);
  const [completedActivty, setCompleted] = useState(false);
  const [usedBot, setUsedBot] = useState(false);
  const wikipediaContainerRef = useRef(null);

  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { chat, TASText, requestHelp, message, setMessage, sendMessage, chatLog } = useChat({ scrollToBottom, setCompleted, setUsedBot, sInfo });
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
        <div className="chat-container">
          <div className="parent-vertical">
            <Typography>Student Chat:</Typography>
            <Paper variant="outlined" elevation={1} sx={{display: 'flex', flexDirection:'column', border:'2px solid black', padding:"10px", overflowY:"auto", flexGrow:1}}>
              <ChatBox chat={chat} scrollToBottom={scrollToBottom} />
              <div ref={chatEndRef} />
            </Paper>
          </div>
          <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} chatLog={chatLog} />
          <TASBox text={TASText} requestHelp={requestHelp}/>
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
                {(completedActivty) ? (
                  <Button variant="outlined" color="primary" onClick={clickLeaveButton}>Begin Test</Button>
                ) : (
                  <Button disabled>Please Answer the Questions</Button>
                )}
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

export default LBTApplication;
