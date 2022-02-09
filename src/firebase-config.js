import { initializeApp } from "firebase/app";
import{ getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBdeinpu3sRDz5NRH38zeYji-47SsufGg",
  authDomain: "taskdoro-4a857.firebaseapp.com",
  projectId: "taskdoro-4a857",
  storageBucket: "taskdoro-4a857.appspot.com",
  messagingSenderId: "547727251745",
  appId: "1:547727251745:web:cb7ef086fdd860e0c60660",
  measurementId: "G-E8TS94RCGV"
};
//create an env file
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)