import { useState, useRef, useEffect } from "react";
import ChatBot, { STUDENT_OPENING_SENTENCE, STUDENT_END_SENTENCE } from "../open_ai/qa_bot";
import { WritingAnimationStudent } from '../misc/writingAnimation.js';
import { logData } from '../misc/userManagement';
const chatBot = new ChatBot();


const useChatQABot = (setUsedBot, setCompleted, QATopics, sInfo) => {
  const [qID, setQID] = useState(0);
  const [message, setMessage] = useState("");
  const [sendActive, setSend] = useState(false);
  const [chat, setChat] = useState([{ text: STUDENT_OPENING_SENTENCE, type: "student", waiting: false }]);
  const didRun = useRef(false);
  let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const chatLog = useRef({
    main: [{text: STUDENT_OPENING_SENTENCE, isUser: false, date: time}],
    paste: [],
  });

  useEffect(() => {  // initialize the conversation
    const initChat = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setChat((prevChat) => [
        ...prevChat,
        { text: <WritingAnimationStudent />, type: "student", waiting: true },
      ]);
      let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      let text = QATopics[0].question;
      chatLog.current.main.push({text: text, isUser: false, date: time});
      setChat((prevChat) => [
        ...prevChat.slice(0, -1),
        { text: text, type: "student", waiting: false }
      ]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSend(true);
    };
    if (!didRun.current) {
      initChat();
      didRun.current = true;
    }
  }, [QATopics]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (sendActive && (message.trim() !== "")) {  // add new user message to chain
      setUsedBot(true);
      setSend(false);
      // handle user response
      setChat((prevChat) => [ 
        ...prevChat,
        { text: message, type: "user", misconception: false },
      ]);
      setMessage("");
      let t1 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      chatLog.current.main.push({text: message, isUser: true, date: t1});
      await new Promise((resolve) => setTimeout(resolve, 200));

      // display bot feedback
      setChat((prevChat) => [
        ...prevChat,
        { text: <WritingAnimationStudent />, type: "student", waiting: true },
      ]);
      const botResponse = await chatBot.callLLM(QATopics[qID].question, QATopics[qID].solution, message);
      let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      chatLog.current.main.push({text: botResponse, isUser: false, date: time});
      setChat((prevChat) => [
        ...prevChat.slice(0, -1),
          { text: botResponse, type: "student", waiting: false }
      ]);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // display showing answer
      setChat((prevChat) => [
        ...prevChat,
        { text: <WritingAnimationStudent />, type: "student", waiting: true },
      ]);
      let t2 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      chatLog.current.main.push({text: QATopics[qID].solution, isUser: false, date: t2});
      setChat((prevChat) => [
        ...prevChat.slice(0, -1),
          { text: QATopics[qID].solution, type: "student", waiting: false }
      ]);

      // display next question
      await new Promise((resolve) => setTimeout(resolve, 15000));
      setChat((prevChat) => [
        ...prevChat,
        { text: <WritingAnimationStudent />, type: "student", waiting: true },
      ]);
      let t3 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (qID < QATopics.length - 1) {
        chatLog.current.main.push({text: QATopics[qID + 1].question, isUser: false, date: t3});
        setChat((prevChat) => [
          ...prevChat.slice(0, -1),
            { text: QATopics[qID + 1].question, type: "student", waiting: false }
        ]);
        setQID(qID + 1);
        setSend(true);
      } else {
        chatLog.current.main.push({text: STUDENT_END_SENTENCE, isUser: false, date: t3});
        setChat((prevChat) => [
          ...prevChat.slice(0, -1),
            { text: STUDENT_END_SENTENCE, type: "student", waiting: false }
        ]);
        setCompleted(true);
      }
      sInfo.current.chatLog = chatLog;
      logData(sInfo);
    }
  };

  return { chat, message, setMessage, sendMessage, chatLog };
};

export default useChatQABot;
