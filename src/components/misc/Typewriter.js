import React, { useState, useEffect } from 'react';

function Typewriter({ text, scroll=() => {}, speed=8, className="system-message" }) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
        scroll();
      }, speed);

      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed]);

  return <span> <p className={className} key={index}>{displayedText}</p></span>;
}

export default Typewriter;
