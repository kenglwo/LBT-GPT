import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import {QuestionCard} from '../mturk/QuestionCard';
import { logData } from '../misc/userManagement';



const KnowledgeScreen = ({ setState, sInfo }) => {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '' });
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
  };

  const completeExam = () => {
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    sInfo.current.timestamps.enterSurvey = time;
    sInfo.current.knowledgeAnswers = answers;
    sInfo.current.state = "survey";
    logData(sInfo);
    setState("survey");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4" align="center">
          Please Answer the Questions carefully. Please do not search the answer online. The money you get will not be affected by yout test scores.
        </Typography>
      </Box>

      <QuestionCard
        question={<span>Q1: What did Robert Hooke discover in cork pieces when using a microscope?</span>}
        choices={['bacteria', 'cells', 'animalcules', 'DNA']}
        selectedAnswer={answers.q1.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q1', answer, qtext, choices, 'cells')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q2: Which biologist first discovered single-celled animalcules?</span>}
        choices={['Mathias Schleiden', 'Robert Hooke', 'Rudolf Virchow', 'Anton van Leeuwenhoek']}
        selectedAnswer={answers.q2.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q2', answer, qtext, choices, 'Anton van Leeuwenhoek')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q3: What can we infer from nerve cells having long extensions that help them pass multiple messages to other cells simultaneously?</span>}
        choices={['cells come from preexisting cells', 'cell shape helps cells perform specific functions', 'all organisms are made up of more than one cell']}
        selectedAnswer={answers.q3.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q3', answer, qtext, choices, 'cell shape helps cells perform specific functions')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q4: What is the function of ribosomes?</span>}
        choices={['store energy', "maintain the cell's shape", 'make proteins', 'form the boundary between the cell and its environment']}
        selectedAnswer={answers.q4.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q4', answer, qtext, choices, 'make proteins')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q5: Which cellular part contains the instructions that cells need to make proteins?</span>}
        choices={['DNA', 'cytoplasm', 'cell membrane', 'ribosomes']}
        selectedAnswer={answers.q5.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q5', answer, qtext, choices, 'DNA')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q6: What part of the cell forms a barrier to the outside environment?</span>}
        choices={['cytoskeleton', 'cytoplasm', 'cell membrane', 'cytosol']}
        selectedAnswer={answers.q6.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q6', answer, qtext, choices, 'cell membrane')}
      />

      <Box sx={{ mt: 4 }} />

      <QuestionCard
        question={<span>Q7: What is the watery substance that makes up the cytoplasm?</span>}
        choices={['cytosol', 'cytoskeleton', 'cell membrane', 'nucleus']}
        selectedAnswer={answers.q7.answer}
        onAnswerChange={(answer, qtext, choices) => handleAnswerChange('q7', answer, qtext, choices, 'cytosol')}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={completeExam}
          disabled={!areAllQuestionsAnswered} // Disabling the button
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default KnowledgeScreen;
