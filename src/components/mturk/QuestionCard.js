// src/QuestionCard.js
import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Typography, TextField } from '@mui/material';

export const QuestionCard = ({ question, choices, selectedAnswer, onAnswerChange }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" sx={{ userSelect: 'none'}}>
        {question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => onAnswerChange(e.target.value, ReactDOMServer.renderToString(question), choices)}
        >
          {choices.map((choice, index) => (
            <FormControlLabel
              key={index}
              value={choice}
              control={<Radio />}
              label={choice}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </CardContent>
  </Card>
);

export const QuestionCard2 = ({ question, choices, selectedAnswer, onAnswerChange }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" sx={{ userSelect: 'none'}}>
        {question}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => onAnswerChange(e.target.value, ReactDOMServer.renderToString(question), choices)}
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {choices.map((choice, index) => (
            <FormControlLabel
              key={index}
              value={choice}
              control={<Radio />}
              label={<div className="radio-div"><Typography>{choice}</Typography></div>}
              labelPlacement="bottom"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </CardContent>
  </Card>
);

export const OpenEndedQuestion = ({ question, answer, onAnswerChange, handlePasteEvent }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="h6" style={{ userSelect: 'none' }}>
        {question}
      </Typography>
      <TextField
        label=""
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value, question)}
        onPaste={(e) => handlePasteEvent(e)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
    </CardContent>
  </Card>
);

export const choices = [
  "Strongly Disagree",
  "Disagree",
  "Somewhat Disagree",
  "Neutral",
  "Somewhat Agree",
  "Agree",
  "Strongly Agree"
];

export const FillInTheBlanksCard = ({ blanks, onAnswerChange, handlePasteEvent }) => {
  const [answers, setAnswers] = useState(blanks);

  useEffect(() => {
    setAnswers(blanks);
  }, []);

  const handleInputChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], answer: event.target.value };
    setAnswers(newAnswers);
    onAnswerChange(newAnswers);
  };

  return (
    <Card>
      <CardContent>
        {answers.map((blank, index) => (
          <React.Fragment key={index}>
            <Typography display="inline" sx={{ whiteSpace: 'pre-line', userSelect: 'none'}}>
              {blank.beforeText}
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={blank.answer}
              onChange={(e) => handleInputChange(index, e)}
              onPaste={(e) => handlePasteEvent(e)}
              style={{ margin: '0 8px' }}
            />
            <Typography display="inline" sx={{ userSelect: 'none'}}>
              {blank.afterText}
            </Typography>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
