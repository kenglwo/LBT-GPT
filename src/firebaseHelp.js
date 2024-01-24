// module to administrate firebase functionality
import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator  } from 'firebase/functions';

// NOTE: could change path to locally emulated functions if necessary.

const firebaseConfig  = {
    apiKey: "AIzaSyDDOUGED-V3actDq1781O11gh5Yb6Ncg2Q",
    authDomain: "lbt-gpt.firebaseapp.com",
    projectId: "lbt-gpt",
    storageBucket: "lbt-gpt.appspot.com",
    messagingSenderId: "522264140077",
    appId: "1:522264140077:web:cf08c219c0e6dc4bef1ba4"
 };
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

if (window.location.hostname === "localhost") {
    // connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    // no need for our project
};

const helper = {
    app,
    functions,
};

export default helper;
