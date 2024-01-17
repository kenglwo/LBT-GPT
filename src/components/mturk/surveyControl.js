import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import {QuestionCard2, choices, OpenEndedQuestion} from './QuestionCard';
import { logData } from '../misc/userManagement';



const SurveyScreenControl = ({ setState, sInfo, returnSurvey }) => {
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q15: ' ',
  });
  const areAllQuestionsAnswered = Object.values(answers).every(answer => answer !== '');

  useEffect(() => {
    // Scrolls to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const handleAnswerChange = (question, answer, qtext, choices) => {
    setAnswers({
      ...answers,
      [question]: {"question": qtext, "choices": choices, "answer": answer},
    });
  };

  const completeSurvey = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterDemographics = time;
    sInfo.current.surveyAnswers = answers;
    sInfo.current.state = "demographics";
    logData(sInfo);
    setState("demographics");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Learning Experience Survey
        </Typography>
        <ul>
          <li><Typography>Please answer these questions about your learning experience.</Typography></li>
        </ul>
      </Box>

      <QuestionCard2
        question={<span>Q1: I already knew most of this material before the session.</span>}
        choices={choices}
        selectedAnswer={answers.q1.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q1', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard2
        question={<span>Q2: It was difficult to learn this lesson.</span>}
        choices={choices}
        selectedAnswer={answers.q2.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q2', answer, qtext, choices)}
      />
      
      <Box sx={{ mt: 4 }} />

      <QuestionCard2
        question={<span>Q3: I now have a deep understanding of the concepts in the lesson.</span>}
        choices={choices}
        selectedAnswer={answers.q3.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q3', answer, qtext, choices)}
      />
      
      <Box sx={{ mt: 4 }} />

      <QuestionCard2
        question={<span>Q4: I remember what I learned in the lesson.</span>}
        choices={choices}
        selectedAnswer={answers.q4.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q4', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard2
        question={<span>Q5: I felt engaged in the learning process.</span>}
        choices={choices}
        selectedAnswer={answers.q5.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q5', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard2
        question={<span>Q6: I searched for test answers on other websites.</span>}
        choices={choices}
        selectedAnswer={answers.q6.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q6', answer, qtext, choices)}
      />

      
      <Box sx={{ mt: 4 }} />

      <OpenEndedQuestion
        question="Please let us know if you have any other feedback or suggestions."
        answer={answers.q15.answer}
        onAnswerChange={(answer, qtext) => handleAnswerChange('q15', answer, qtext, "OPEN-RESPONSE")}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="text" color="inherit" onClick={returnSurvey}>
          Return Survey
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={completeSurvey}
          disabled={!areAllQuestionsAnswered} // Disabling the button
        >
          Submit
        </Button>
      </Box>
      <Box sx={{ mt: 12 }} />
    </Container>
  );
};

export default SurveyScreenControl;
