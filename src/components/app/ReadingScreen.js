import React, { useRef, useEffect, useState } from 'react';
import './LBTApp.css';
import EukaryoticCells from '../4-3-eukaryotic-cells/eukaryoticCells_v2'
import {Box, Button } from '@mui/material';
import { logData } from '../misc/userManagement';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ReadingModal from './ReadingModal';


const ReadingScreen = ({ setSubState, sInfo, returnSurvey }) => {
  const [showLeave, setShowLeave] = useState(false);
  const wikipediaContainerRef = useRef(null);

  // scroll to top of content page
  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "instant", block: "end", inline: "nearest"});
  };
  useEffect(scrollToTop, []);

  const completeApp = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterPractice = time;
    sInfo.current.substate = "practice";
    logData(sInfo);
    setSubState("practice");
    console.log("ping");
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
        sInfo.current.scrollLogsRead.push({
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
      <div id="assignment-banner" className="assignment-banner"></div>
      <div className="main-container">
        <div className="wikipedia-container-control" ref={wikipediaContainerRef}>
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
                  Complete Reading
                </Button>
              </Box>
              <Box sx={{ mt: 12 }} />
            </div>
          </div>
        </div>
      </div>
      <ReadingModal condition={sInfo.current.condition} show={showLeave} setShow={setShowLeave} completeApp={completeApp}/>
    </div>
  );
};

export default ReadingScreen;
