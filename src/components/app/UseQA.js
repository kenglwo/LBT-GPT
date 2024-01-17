import { useState, useRef } from "react";
import { QATopicsHuman } from "../4-3-eukaryotic-cells/eukaryoticCellText_v2";
import { logData } from '../misc/userManagement';


const useQA = ({ setUsedBot, sInfo }) => {
  const [message, setMessage] = useState("");
  const [qaState, setQAState] = useState("SEND");
  const [qID, setQID] = useState(0);

  let time = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const chatLog = useRef({
    questions: [{text: QATopicsHuman[qID].question, date: time}],
    solutions: [{text: QATopicsHuman[qID].solution, date: time}],
    answers: []
  });

  // PUT TWO FUNCTIONS INTO ONE BUTTON
  function sendMessage(e) {
    e.preventDefault();
    if (qaState === "NEXT") {
      setMessage("");
      // save user message
      let t1 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      setQID(qID + 1);
      chatLog.current.questions.push({text: QATopicsHuman[qID].question, date: t1, q_id: qID});
      chatLog.current.solutions.push({text: QATopicsHuman[qID].solution, date: t1, q_id: qID});
      setQAState("SEND");
    } else if ((qaState === "SEND") && (message.trim() !== "")) {
      setUsedBot(true);
      // save user message
      let t1 = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
      chatLog.current.answers.push({ text: message, date: t1, q_id: qID });
      if (qID === (QATopicsHuman.length - 1)) {
        setQAState("DONE");
      } else {
        setQAState("NEXT");
      }
      sInfo.current.chatLog = chatLog;
      logData(sInfo);
    }
  }

  return { qID, qaState, message, setMessage, sendMessage, chatLog };
};

export default useQA;
