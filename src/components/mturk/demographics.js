import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import {QuestionCard} from './QuestionCard';
import { logData } from '../misc/userManagement';


const DemographicScreen = ({ setState, sInfo, returnSurvey }) => {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: "", q5: "", q6: ""  });
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

  const completeDemographic = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.completion = time;
    sInfo.current.demographicsAnswers = answers;
    sInfo.current.completedSurvey = true;
    sInfo.current.state = "key";
    logData(sInfo);
    setState("key");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Demographic Survey
        </Typography>
        <ul>
          <li><Typography>Please answer these demographic questions.</Typography></li>
        </ul>
      </Box>

      <QuestionCard
        question={<span>Q1: What is your age?</span>}
        choices={["18 - 25", "26 - 35", "36 - 45", "46 - 55", "Over 55"]}
        selectedAnswer={answers.q1.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q1', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q2: What is your gender?</span>}
        choices={["Male", "Female", "Other"]}
        selectedAnswer={answers.q2.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q2', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q3: What was the subject of the lesson assigned to you?</span>}
        choices={["Business", "Chemistry", "Physics", "Biology", "Psychology"]}
        selectedAnswer={answers.q3.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q3', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q4: What is your highest educational degree?</span>}
        choices={["Primary/Elementary School", "Some High School", "High School Diploma or Equivalent", "Bachelor's/Professional Degree", "Master's Degree or Higher"]}
        selectedAnswer={answers.q4.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q4', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q5: What is your field of work/study?</span>}
        choices={["Engineering", "Computer Science", "Business/Management", "Humanities", "Social Sciences", "Natural Sciences", "Arts", "Health/Medicine", "Education", "Other"]}
        selectedAnswer={answers.q5.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q5', answer, qtext, choices)}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q6: What type of device did you use to complete this study?</span>}
        choices={["Smartphone", "Desktop/Laptop", "Tablet", "Smart TV", "Other"]}
        selectedAnswer={answers.q6.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q6', answer, qtext, choices)}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="text" color="inherit" onClick={returnSurvey}>
          Return Survey
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={completeDemographic}
          disabled={!areAllQuestionsAnswered} // Disabling the button
        >
          Submit
        </Button>
      </Box>

      <Box sx={{ mt: 12 }} />
    </Container>
  );
};

export default DemographicScreen;
