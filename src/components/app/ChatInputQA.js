import React from "react";
import TextField from '@mui/material/TextField';

const ChatInputQA = ({ message, setMessage, sendMessage, qaState, chatLog }) => {
  const handlePaste = (e) => {
    // log paste actions
    const pastedData = e.clipboardData || window.clipboardData;
    const pastedText = pastedData.getData('text');
    let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    chatLog.current.paste.push({text: pastedText, date: time})
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default action (new line)
      sendMessage(e); // Calls the sendMessage function
    }
  };

  return (
    <form onSubmit={sendMessage} className="parent-input-qa">
      <TextField
        placeholder="type here"
        multiline
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPaste={handlePaste}
        onKeyPress={handleKeyPress}
        variant="outlined"
        sx={{
          marginTop: '10px',
          marginBottom: '10px',
          boxSizing: 'border-box',
          flex: 1,
          marginRight: '10px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#8F8F9D',
            },
            '&:hover fieldset': {
              borderColor: '#8F8F9D',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8F8F9D',
            },
          }
        }}
      />
     {qaState === 'SEND' ? <button className="qa-send_button" type="send">Submit Response</button> :
      qaState === 'NEXT' ? <button className="qa-next_button" type="send">Next Question</button> :
      <button className="qa-done_button" type="send">Completed Activity</button>}
    </form>
  );
};

export default ChatInputQA;
