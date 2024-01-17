import React, { useEffect } from "react";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import studentImage from "../../assets/images/student.svg";
import attentionImage from "../../assets/images/attention_sign.png"
import Typewriter from '../misc/Typewriter';
import UserMessage from "../misc/UserMessage";

const ChatBox = ({ chat, scrollToBottom }) => {

  const scrollTo = () => {
    scrollToBottom();
  };
  useEffect(scrollTo, [chat]);

  const renderMessage = (message, index) => {
    switch (message.type) {
      case 'user':
        // TODO: Add format for incorrect response
        return <UserMessage message={message} index={index} />;
      case 'student':
        return (
          <div>
            <Stack direction="row" spacing={1}>
              <img
                alt="Student"
                src={studentImage}
                style={{ width: 40, height: 40, borderRadius: 'none' }}
              />
              <Paper elevation={0}>
                {message.waiting ? (
                  <p className="system-message" key={index}>{message.text}</p>
                ) : (
                  <Typewriter text={message.text} scroll={scrollToBottom} />
                )}
              </Paper>
            </Stack>
          </div>
        );
      case 'alert':
        return (
          <div>
            <Stack direction="row" spacing={1}>
              <img
                alt="Attention"
                src={attentionImage}
                style={{ width: 27, height: 27, borderRadius: 'none' }}
              />
              <Paper elevation={0}>
                <Typewriter text={message.text} scroll={scrollToBottom} className="alert-message"/>
              </Paper>
            </Stack>
          </div>
        );
      default:
        console.error('Error in chat rendition');
        return null;
    }
  };

  return (
    <div>
      {chat.map((message, index) => renderMessage(message, index))}
    </div>
  );
};

export default ChatBox;
