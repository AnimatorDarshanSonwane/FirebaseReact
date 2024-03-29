import {initializeApp} from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyB7R4hiuFw5MJTaVROBpG0BfWLjpxRN-J4",
  authDomain: "fir-react-f997a.firebaseapp.com",
  projectId: "fir-react-f997a",
  storageBucket: "fir-react-f997a.appspot.com",
  messagingSenderId: "1058133484232",
  appId: "1:1058133484232:web:739850c5a84f58504dfbfd",
  measurementId: "G-861PKQGZDQ",
  databaseURL:"https://fir-react-f997a-default-rtdb.firebaseio.com"
};



export const app = initializeApp(firebaseConfig);