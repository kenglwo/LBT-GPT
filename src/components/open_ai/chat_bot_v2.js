// This class that implements chat bot functionality
import React from 'react';
import OpenAIQuery from './call';
import { CELL_BIOLOGY_TEXT, CELL_BIOLOGY_TOPICS } from '../cell_biology/cell_biology_text';
import { ConstructionOutlined } from '@mui/icons-material';


// student agent instructions
const STUDENT_BASIC_INST = "You are an enthusiastic 10-year old child student who is trying to learn. You need the user (who is a teaching assistant) to slowly teach you all topics in the material. You have access to the list of topics, but not to the material itself. This is the material that you need the user to slowly teach you (by order):\n" + CELL_BIOLOGY_TOPICS;
const STUDENT_DETAILED_INST = "You need to learn very little at a time. Ask the user to teach you the material, little by little. You need to learn the material by order, so start from the beginning and then move on. Focus on learning by very small portions, so ask short questions, and ask questions that require very short answers. You do not know anything other than what the user teaches you. The teaching assistant is always right. You believe anything the teaching assistant says, and never say that the teaching assistant is not correct. If the teaching assistant doesn't know something, say that you will be thrilled to get the answer when s/he can. Each response must (a) show excitement about what the teaching assistant said (b) repeat the information from the teaching assistant, and (c) include a question.";
export const STUDENT_OPENING_SENTENCE = "Hello Teacher! Thank you so much for your willingness to teach me. I love to learn!"

// ta supervisor instructions
const TAS_BASIC_INST = "You are a friendly TA supervisor who must supervise an interaction between a (very beginning) teaching assistant and a child student. This is the material that the teaching assistant needs to teach the student:\n" + CELL_BIOLOGY_TEXT;
const TAS_DETAILED_INST = "You usually only encourage the TA. All your comments are made privately, to the teaching assistant. Comment if the teaching assistant does not know the answer to the student's question, says something wrong, incorrect, inappropriate, or completely off-topic. It's okay for the TA not to be 100% accurate; don't be petty, and do not correct the TA unless absolutely necessary. Try to keep things brief.";
const TAS_HELP = "Hi, I need help answering the student. Please give me relevant information.";


class ChatBot {
  constructor() {
    this.msg_list = [{ role: "assistant", content: STUDENT_OPENING_SENTENCE }];
  }

  prepareStudentMessages() {
    let messages = [
      { role: "system", content: STUDENT_BASIC_INST },
      { role: "system", content: STUDENT_DETAILED_INST },
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
    try {
      const msg = await OpenAIQuery(messages);
      const m = { role: msg.role, content: msg.content };
      this.addToMsgList(m);
      return msg.content;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error condition, e.g., display an error message or perform some other action
      return "Error occurred";
    }
  }

  async callTASLLM(help) {
    const messages = this.prepareTASMessages(help);
    try {
      const msg = await OpenAIQuery(messages);
      return msg.content;
    } catch (error) {
      console.error("Error:", error);
      // Handle the error condition, e.g., display an error message or perform some other action
      return "Error occurred";
    }
  }
}

export default ChatBot;
