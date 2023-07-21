// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Pu-pGv289UC9zsoxelVSX_hC78OAscM",
  authDomain: "blog-nestjs-7af2e.firebaseapp.com",
  projectId: "blog-nestjs-7af2e",
  storageBucket: "blog-nestjs-7af2e.appspot.com",
  messagingSenderId: "546686664452",
  appId: "1:546686664452:web:37177a0518474f21ac5a51",
  measurementId: "G-HN2ZMY1SGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);