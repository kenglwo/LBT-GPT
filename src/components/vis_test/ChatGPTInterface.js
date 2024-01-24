import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { sendChatToGPT } from './chatpgt_api';

export default function ChatGPTInterface(props) {
  const [studentInputPrompt, setStudentInputPrompt] = useState('');
  const [conversationData, setConversationData] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedFile(reader.result); // base 64 to save the file
      };
      reader.readAsDataURL(file); // read the file via url
    }
  };


  const onClickSubmit = async () => {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${now.getMonth() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;



    // to store the current text input, since we want to clear the input field after sending the message
    let currentTextInput = studentInputPrompt

    const conversationDataStudent = {
      role: 'user',
      type: 'text',
      content: currentTextInput,
      timestamp: timestamp,
    };


    let newConversationEntries = [conversationDataStudent]; // 初始化新对话条目数组

    setIsLoading(true); // start to load

    // Assume sendChatToGPT can handle both text and file inputs
    // need to add a timestamp to llmAnswer

    // clear the input field
    setStudentInputPrompt('');
    document.getElementById('fileInput').value = '';

    const llmAnswer = await sendChatToGPT(conversationData, currentTextInput, uploadedFile);

    setIsLoading(false); // finish loading

    

    // update the conversation log with the LLM's answer
    const llmAnswerData = {
      role: 'assistant',
      content: llmAnswer,
      type: 'text'
    }

    // if has uploaded file, add it to the conversation data. Otherwise, just add the student's question and llm's answer
    if (uploadedFile) {
      const conversationDataFile = {
        role: 'user',
        content: uploadedFile,
        type: 'image_url',
        timestamp: timestamp,
      };



      newConversationEntries.push(conversationDataFile); // add the file to the new conversation entries array
    } 

    newConversationEntries.push(llmAnswerData); // add the llm answer to the new conversation entries array

     // update the conversation data
    setConversationData(currentData => [...currentData, ...newConversationEntries]);
    console.log("newConversationEntries",newConversationEntries)
    props.setConversationDataParent(newConversationEntries); // update the parent component's conversation data
        

    // reset the input field
    setUploadedFile(null);

  };

  // // save to backend
  // useEffect(() => {
  //   props.setConversationDataParent(newConversationToSave);
  // }, [newConversationToSave]);

  return (
    <>
      <Box
        id='chat_area'
        sx={{
          height: '75vh',
          width: 400,
          display: 'inline-block',
          p: 1,
          mx: 1,
          border: '2px solid black',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          textAlign: 'center',
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}
      >
        Chat Area
        {conversationData.map((conversation, i) => (
          <Box
            key={i}
            className={`${conversation.role === 'user'
              ? 'student_question_container'
              : 'llm_answer_container'
              }`}
            sx={{ mt: 4 ,
              whiteSpace: 'pre-wrap'}}
          >
            <Stack
              direction='row'
              spacing={2}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar
                alt='Remy Sharp'
                src={`/images/${conversation.role === 'user' ? 'user.png' : 'student.jpeg'
                  }`}
              />
              <h3>{conversation.role === 'user' ? 'You' : 'ChatGPT'}</h3>
            </Stack>
            <Box sx={{ m: 2, textAlign: 'left', whiteSpace: 'pre-wrap' }}>
  {/* 检查内容是否是 base64 编码的图片 */}
  {conversation.content.startsWith('data:image') ? (
    <img src={conversation.content} alt="User Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
  ) : (
    // 检查内容是否是图片 URL
    conversation.content.startsWith('http') ? (
      <img src={conversation.content} alt="Generated Image" style={{ maxWidth: '100%', height: 'auto' }} />
    ) : (
      <p>{conversation.content}</p>
    )
  )}
</Box>

          </Box>
        ))}
        {isLoading && (
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <p>Loading...</p>
            {/* <CircularProgress /> */}
          </Box>
        )}
      </Box>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <TextField
        value={studentInputPrompt}
        sx={{ width: '90%', ml: 2, mt: 2 }}
        id='textInput'
        multiline
        rows={2}
        placeholder='Enter your question here'
        onChange={(e) => setStudentInputPrompt(e.target.value)}
      />
      <Button variant='contained' sx={{ ml: 2, mt: 1 }} onClick={onClickSubmit}>
        Send
      </Button>
    </>
  );

}
