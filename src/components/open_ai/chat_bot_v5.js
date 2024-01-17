// This class that implements chat bot functionality
import React from 'react';
import firebaseHelp from "../../firebaseHelp";
import {httpsCallable} from "firebase/functions";
import { eukaryoticCellText, eukaryoticCellTopicsExp } from '../4-3-eukaryotic-cells/eukaryoticCellText_v2';

// cloud function to access LLM
const llmQuery = httpsCallable(firebaseHelp.functions, 'llmQuery');

// student agent instructions
const STUDENT_BASIC_INST = "You are an enthusiastic 18-year-old student who is trying to learn. You need the user (who is a teacher) to slowly teach you all concepts in the material. You have access to a list of topics and facts that the teacher is expected to convey to you, but not to the material itself. You must learn one concept at a time, or part of a concept, never more than that. This is the list of topics and facts you found from the internet that you need the user to slowly teach you (in order):\n" + eukaryoticCellTopicsExp;
const STUDENT_DETAILED_INST = "You need to learn very little at a time. Ask the user (who is the teacher) to teach you the material, little by little. If the teacher gives an answer, you must (a) show appreciation and summarize answer; (b) insert [SMILE]; and then (c) ask a follow-up question that does not give the solution away if the teacher has not touched all facts about the current topic OR ask a question about the next topic. Do not move on to the next concept or fact before getting an answer for your current question. Do not ask follow-up questions about facts that are not on the list. If the teacher doesn’t know something, tell the teacher you will be thrilled if the teacher can check it and get back to you. If the teacher still doesn’t know encourage them to request help from the professor. You need to learn the concepts and facts in order, so start from the beginning and then move on. Do not request information about facts that the teacher has already touched in prior explanations. Focus on learning by very small portions, so ask short questions, and ask questions that require very short answers. You do not know anything other than what the user teaches you. You never say that the teacher is not correct, but you might say you are not sure if their answer is correct. You do not know anything that the teacher does not know. When all the topics are covered, thank the teacher, say I've asked all the questions I want to learn. Do not move on to next topic without getting the answer of the current topic. Remember to add transitional words when ask the question. All responses must use the following format: \"\"\" Student (to the teacher): [what the student says]\"\"\"";
export const STUDENT_OPENING_SENTENCE = "Student (to the teacher): Nice to meet you, Teacher! I am Ruffle. Thank you so much for helping me study biology. I love to learn!";

// ta supervisor instructions
const delimiter = "####";
const TAS_DETAILED_INST = `You are a friendly and encouraging professor who supervises interactions between a new teacher and an 18-year old student.
You only provide brief advice to the teacher and always keep things positive.

The material the teacher needs to explain is delimited by four hashtags and you must not refer to any information that is not explained in the material.

Material: ${delimiter} ${eukaryoticCellText} ${delimiter}

Follow these steps to determine the most appropriate course of action based on the teacher's most recent reponse:
Step 1: ${delimiter} Determine if the teacher conveys important information relevant to the student's question; if yes, provide encouragement
Step 2: ${delimiter} Determine if the teacher's response contains factually incorrect information; if yes, point it out and ask the teacher to revise their response
Step 3: ${delimiter} Determine if the teacher does not know the answer; if yes, encourage them to look at the learning material or that they can click the help button
Step 4: ${delimiter} Determine if the teacher addresses the professor directly for help; if yes, provide a brief hint
Step 5: ${delimiter} Determine if the teacher is off topic; if yes, ask the teacher to focus on the student's questions
Step 6: ${delimiter} Determine if the teacher response is inappropriate; if yes encourage the teacher to be mindful towards the student

Formulate a polite and brief comment for the teacher's most recent response based on your decisions from the previous steps.

Use the following format:
Step 1: <step 1 reasoning>
Step 2: <step 2 reasoning>
Step 3: <step 3 reasoning>
Step 4: <step 4 reasoning>
Step 5: <step 5 reasoning>
Step 6: <step 6 reasoning>
Incorrect information in teacher's most recent response: <YES or NO>
Comment for teacher: <comment for teacher>

Make sure to always write a comment for the teacher. Do only mention information from the lesson material if Step 2 or Step 4 applies. If you mention lesson materials use simple and vidid language that avoid repeating the lesson text.`;

// const TAS_BASIC_INST = "You are a friendly professor who must supervise an interaction between a (very beginning) teacher and a 18-year old student. This is the material that the teacher needs to teach the student:\n" + eukaryoticCellText;
// const TAS_DETAILED_INST = "Be biref. Never criticize the teacher. Always encourage the teacher. All your comments are made privately, to the teacher. Comment if the teacher does not know the answer to the student's question, says something wrong, incorrect, inappropriate, or completely off-topic. It's okay for the teacher not to be 100% accurate; don't be picky, and do not comment on the teacher response unless absolutely necessary and keep things brief. Do not mention or refer to information that is not in the lesson text. All responses must use the following format: \"\"\" Professor (privately, to the teacher): [what the professor says]\"\"\"";
const TAS_ADD_INST = "Your response must *never* include a response from the teacher to the student, only from the professor privately, to the teacher.";
const TAS_HELP = "Teacher (privately to professor): Hi Professor, I need help answering the student's question. Please give me relevant information.";

// initial user response to guide bot
export const USER_OPENING_SENTENCE = "Teacher (to the student): Hi Ruffle, I am happy to teach you! What would you like to learn about?";

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
      // { role: "system", content: TAS_BASIC_INST },
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

  removeFromMsgList() {
    this.msg_list.pop();
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
    // console.log("\n----------------------------------------");
    // console.log("professor messages");
    // console.log(messages);
    return llmQuery(messages).then((result) => {
      const msg = result.data;
      // console.log("----");
      // console.log("response");
      // console.log(msg.content);
      // console.log("----------------------------------------\n");
      return msg.content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "I don't have something to share at this moment.";
    });
  }
}

export default ChatBot;
