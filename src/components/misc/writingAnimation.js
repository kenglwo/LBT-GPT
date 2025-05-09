import React from 'react';
import './writingAnimation.css';

export const WritingAnimationStudent = () => {
  return (
    <div className="writing-animation-student">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
};

export const WritingAnimationProfessor = () => {
  return (
    <div className="writing-animation-professor">
      <div className="dot" style={{backgroundColor: 'black'}}></div>
      <div className="dot" style={{backgroundColor: 'black'}}></div>
      <div className="dot" style={{backgroundColor: 'black'}}></div>
    </div>
  );
};
