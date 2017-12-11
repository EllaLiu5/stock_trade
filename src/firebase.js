import * as firebase from 'firebase';

//init Firebase
const config = {
  apiKey: "AIzaSyDQdQuBw91_ZhI9S2YHL7VMsICDHYaDyf8",
  authDomain: "doc-generator-d054a.firebaseapp.com",
  databaseURL: "https://doc-generator-d054a.firebaseio.com",
  projectId: "doc-generator-d054a",
  storageBucket: "doc-generator-d054a.appspot.com",
  messagingSenderId: "999859148973"
};

export const firebaseApp = firebase.initializeApp(config);
export const balanceRef = firebase.database().ref('stock/balance');
export const stocksRef = firebase.database().ref('stock/stocks');
