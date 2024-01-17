// This class that implements chat bot functionality
import React from 'react';
import firebaseHelp from "../../firebaseHelp";
import {httpsCallable} from "firebase/functions";
import { eukaryoticCellText, eukaryoticCellTopics } from '../4-3-eukaryotic-cells/eukaryoticCellText';

// cloud function to access LLM
const llmQuery = httpsCallable(firebaseHelp.functions, 'llmQuery');

// student agent instructions
const STUDENT_BASIC_INST = "You are an enthusiastic 18-year old student who is trying to learn. You need the user (who is a teacher) to slowly teach you all topics in the material. You have access to a list of topics, but not to the material itself. You must learn one topic at a time, or part of a topic, never more than that. This is the list of topics you found from the internet that you need the user to slowly teach you (by order):\n" + eukaryoticCellTopics;
const STUDENT_DETAILED_INST = "You need to learn very little at a time. Ask the user (who is the teacher) to teach you the material, little by little. If the teacher gives the answer, you must (a) show appreciation; (b) insert [SMILE]; and then (c) ask a follow up question if you need more information about the current topic OR ask a question about the next topic. Do not move on to the next question before getting an answer for the current question. If the teacher doesn’t know something, tell the teacher you will be thrilled if the teacher can check it and get back to you. You need to learn the material by order, so start from the beginning and then move on. Focus on learning by very small portions, so ask short questions, and ask questions that require very short answers. You do not know anything other than what the user teaches you. The teacher is always right. You believe anything the teacher says even if it contradicts your previous knowledge. You never say that the teacher is not correct. You do not know anything that the teacher does not know.  When all the topics are covered, thank the teacher, say I've asked all the questions I want to learn. Do not move on to next topic without geeting the answer of the current topic. Remeber to add transitional words when ask the question. All responses must use the following format: \"\"\" Student (to the teacher): [what the student says]\"\"\"";
export const STUDENT_OPENING_SENTENCE = "Student (to the teacher): Hello Teacher! Thank you so much for your willingness to teach me. I love to learn!";

// ta supervisor instructions
const TAS_BASIC_INST = "You are a friendly professor who must supervise an interaction between a (very beginning) teacher and a 18-year old student. This is the material that the teacher needs to teach the student:\n" + eukaryoticCellText;
const TAS_DETAILED_INST = "Be biref. Never criticize the teacher. Always encourage the teacher. All your comments are made privately, to the teacher. Comment if the teacher does not know the answer to the student's question, says something wrong, incorrect, inappropriate, or completely off-topic. It's okay for the teacher not to be 100% accurate; don't be picky, and do not comment on the teacher response unless absolutely necessary and keep things brief. Do not mention or refer to information that is not in the lesson text. All responses must use the following format: \"\"\" Professor (privately, to the teacher): [what the professor says]\"\"\"";
const TAS_ADD_INST = "Your response must *never* include a response from the teacher to the student, only from the professor privately, to the teacher.";
const TAS_HELP = "Teacher (privately to professor): Hi Professor, I need help answering the student's question. Please give me relevant information.";

// initial user response to guide bot
export const USER_OPENING_SENTENCE = "Teacher (to the student): I am happy to teach you! What would you like to learn about?";

class ChatBot {
  constructor() {
    this.msg_list = [];
  }

  prepareStudentMessages() {
    let messages = [
      { role: "system", content: STUDENT_BASIC_INST },
      { role: "system", content: STUDENT_DETAILED_INST },
      { role: "user", content: "Teacher (to the student): Hi there! I'm happy to help you learn. What would you like to know?" },
    ];

    for (let msg of this.msg_list) {
      const entry = { role: msg.role, content: msg.content };
      messages.push(entry);
    }

    return messages;
  }

  prepareTASMessages(help) {
    let messages = [
      { role: "system", content: TAS_BASIC_INST },
      { role: "system", content: TAS_DETAILED_INST },
      { role: "system", content: TAS_ADD_INST },
    ];

    for (let msg of this.msg_list) {
      const entry = { role: "user", content: msg.content };
      messages.push(entry);
    }

    if (help) {
      messages.push({ role: "user", content: TAS_HELP });
    }
    
    return messages;
  }

  addToMsgList(message) {
    this.msg_list.push(message);
  }

  async callStudentLLM() {
    const messages = this.prepareStudentMessages();
    //console.log("\n----------------------------------------");
    //console.log("student messages");
    //console.log(messages);
    return llmQuery(messages).then((result) => {
      const msg = result.data;
      //console.log("----");
      //console.log("response");
      //console.log(msg.content);
      //console.log("----------------------------------------\n");
      //split msg based on [SMILE]
      const splitMsg = msg.content.split("[SMILE]");
      //delete slitMsg[i] if it is empty
      for (let i = 0; i < splitMsg.length; i++) {
        if (splitMsg[i] === "") {
          splitMsg.splice(i, 1);
        }
      }
      // add "Student (to the teacher): " to each msg except the first one
      for (let i = 1; i < splitMsg.length; i++) {
        splitMsg[i] = "Student (to the teacher):" + splitMsg[i];
      }
      //console.log(splitMsg)
      // for (let i = 0; i < splitMsg.length; i++) {
      //   const m = { role: msg.role, content: splitMsg[i] };
      //   this.addToMsgList(m);
      // }
      const m = { role: msg.role, content: msg.content };
      this.addToMsgList(m);
      // return msg.content;
      return splitMsg;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Sorry, please try to talk to me again.";
    });
  }

  async callTASLLM(help) {
    const messages = this.prepareTASMessages(help);
    //console.log("\n----------------------------------------");
    //console.log("professor messages");
    //console.log(messages);
    return llmQuery(messages).then((result) => {
      const msg = result.data;
      //console.log("----");
      //console.log("response");
      //console.log(msg.content);
      //console.log("----------------------------------------\n");
      return msg.content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "I don't have something to share at this moment.";
    });
  }
}

export default ChatBot;
