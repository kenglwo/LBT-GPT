import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import {OpenEndedQuestion, FillInTheBlanksCard} from './QuestionCard';
import { logData } from '../misc/userManagement';

const KnowledgeScreen = ({ setState, sInfo, returnSurvey }) => {
  const [answers, setAnswers] = useState({q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''});
  const [pastes, setPastes] = useState({q1: [], q2: [], q3: [], q4: [], q5: [], q6: []});
  const areAllQuestionsAnswered = Object.values(answers).every(answer => answer !== '');

  useEffect(() => {
    // Scrolls to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const handleAnswerChange = (question, answer, qtext, choices, solution) => {
    setAnswers({
      ...answers,
      [question]: {"question": qtext, "choices": choices, "answer": answer, "solution": solution},
    });
    console.log(answers);
  };

  const handlePasteEvent = (index, event) => {
    // detect whether user pasted content
    const pastedText = event.clipboardData.getData('Text');
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    setPastes(prevPastes => ({
      ...prevPastes,
      [index]: [...prevPastes[index], { text: pastedText, timestamp }],
    }));
    event.preventDefault();
  };

  const completeExam = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterSurvey = time;
    sInfo.current.knowledgeAnswers = answers;
    sInfo.current.knowledgePaste = pastes;
    sInfo.current.state = "survey";
    setState("survey");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Please Answer the Questions.
        </Typography>
        <ul>
          <li><Typography>Answer the Questions carefully to the <b>best of your knowledge</b>.</Typography></li>
          <li><Typography><b>Do not search for answers online.</b></Typography></li>
        </ul>
      </Box>

      <br></br>
      <Box><Typography variant="h5">Fill in the blanks:</Typography></Box>

      <FillInTheBlanksCard blanks={[
          { beforeText: 'Q1: In the protein synthesis process the nucleus first transcribes the DNA into',
            afterText: ' which then travels to the ribosome. There it is translated into a specific order of',
            answer: answers.q1.answer1 },
          { beforeText: '',
            afterText: '.',
            answer: answers.q1.answer2 }
        ]}
        onAnswerChange={(answer) => handleAnswerChange('q1', answer, "BLANK-QUESTION", "OPEN-RESPONSE")}
        handlePasteEvent={(paste) => handlePasteEvent('q1', paste)} />

      <Box sx={{ mt: 4 }} />

      <FillInTheBlanksCard blanks={[
        { beforeText: 'Q2: Complete the equation of cellular respiration:\n\n',
          afterText: ' + oxygen',
          answer: answers.q2.answer1 },
        { beforeText: ' -> CO2 + water + ',
          afterText: '',
          answer: answers.q2.answer2 }
      ]}
      onAnswerChange={(answer) => handleAnswerChange('q2', answer, "BLANK-QUESTION", "OPEN-RESPONSE")}
      handlePasteEvent={(paste) => handlePasteEvent('q2', paste)} />

      <Box sx={{ mt: 4 }} />

      <FillInTheBlanksCard blanks={[
          { beforeText: 'Q3: Hydrogen peroxide is released by',
            afterText: ' during',
            answer: answers.q3.answer1 },
          { beforeText: '',
            afterText: ' reactions that they use to break down fatty acids and amino acids and to detoxify poisons.',
            answer: answers.q3.answer2 }
        ]}
        onAnswerChange={(answer) => handleAnswerChange('q3', answer, "BLANK-QUESTION", "OPEN-RESPONSE")}
        handlePasteEvent={(paste) => handlePasteEvent('q3', paste)} />

      <Box sx={{ mt: 4 }} />

      <br></br>
      <Box><Typography variant="h5">Write your responses:</Typography></Box>
      <OpenEndedQuestion
        question="Q4: Explain the principle of “form follows functions” AND how it applies to the structure of pancreas cells that produce digestive enzymes."
        answer={answers.q4.answer}
        onAnswerChange={(answer, qtext) => handleAnswerChange('q4', answer, qtext, "OPEN-RESPONSE")}
        handlePasteEvent={(paste) => handlePasteEvent('q4', paste)} />

      <Box sx={{ mt: 4 }} />

      <OpenEndedQuestion
        question="Q5: How does the principle of “form follows functions” apply to the structure AND function of muscle cells?"
        answer={answers.q5.answer}
        onAnswerChange={(answer, qtext) => handleAnswerChange('q5', answer, qtext, "OPEN-RESPONSE")}
        handlePasteEvent={(paste) => handlePasteEvent('q5', paste)} />

      <Box sx={{ mt: 4 }} />

      <OpenEndedQuestion
        question="Q6: Why is the cell not damaged by the hydrogen peroxide (H2O2)? How does H2O2 get disposed of and what are the residual products of the disposal process?"
        answer={answers.q6.answer}
        onAnswerChange={(answer, qtext) => handleAnswerChange('q6', answer, qtext, "OPEN-RESPONSE")}
        handlePasteEvent={(paste) => handlePasteEvent('q6', paste)} />

      <Box sx={{ mt: 4 }} />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="text" color="inherit" onClick={returnSurvey}>
          Return Survey
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={completeExam}
          disabled={!areAllQuestionsAnswered} // Disabling the button
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ mt: 12 }} />
    </Container>
  );
};

// <li><Typography>Your compensation is not affected by your test scores.</Typography></li>


export default KnowledgeScreen;
