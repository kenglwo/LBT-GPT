// function to assign user to condition
import firebaseHelp from "../../firebaseHelp";
import {httpsCallable} from "firebase/functions";

// cloud function to register user
const regUser = httpsCallable(firebaseHelp.functions, 'registerUser');
// cloud function to store logs
const logSurvey = httpsCallable(firebaseHelp.functions, 'logSurvey');
// cookie validity duration
const duration = 2 * 60 * 60 * 1000;


export function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + duration);
  const expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export async function registerUser(sInfo) {
  try { // register user on backend
    const reg = await regUser(sInfo.current);
    for (let key in reg.data) {
      if (reg.data.hasOwnProperty(key)) {
          sInfo.current[key] = reg.data[key];
      }
    }
  } catch (error) {
    console.error("registration error");
    console.log(error);
  }
}

export async function logData(sInfo) {
  try { // store user data on backend
    await logSurvey(sInfo.current);
  } catch (error) {
    console.error("logging error");
    console.log(error);
  }
}
