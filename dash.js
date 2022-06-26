import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import {
  getFirestore, collection,
  doc, getDocs, setDoc, addDoc, deleteDoc,
  deleteField,
  query,where,

} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';


// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4BGSVyzZE1725rn4T1nQuRXSYp6N6MdE",
  authDomain: "flutter-login-d65de.firebaseapp.com",
  databaseURL: "https://flutter-login-d65de-default-rtdb.firebaseio.com",
  projectId: "flutter-login-d65de",
  storageBucket: "flutter-login-d65de.appspot.com",
  messagingSenderId: "677870289140",
  appId: "1:677870289140:web:5236e24ebdac5a4413dea1",
  measurementId: "G-FCCWWBCY9F"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);
//init services
const db = getFirestore(app);


//collection ref
const colRef = collection(db, 'tickets');



//quieries
const q = query(colRef, where("payAsYouGo", "==", true));
const ticketA = query(colRef, where("price", "==", '5.0'));
const ticketB = query(colRef, where("price", "==", '7.0'));
const ticketC = query(colRef, where("price", "==", '10.0'));
const ticketD = query(colRef, where("price", "==", '12.0'));
//read button
const readBtn = document.getElementById('readBtn');

// let xxx = 0;
//get collection data
let sum=0;
try{
  let snapshot = await getDocs(colRef);
  // console.log(snapshot.docs)
  let ticketsData = [];
  snapshot.docs.forEach(doc => {
    ticketsData.push({ ...doc.data(), id: doc.id });
  });

  //console.log(ticketsData[1].price);
  let ticketNum = ticketsData.length;

  for(let i=0; i<ticketNum; i++){
    sum += parseFloat(ticketsData[i].price);
    // xxx=sum;
  }
  console.log("The total price is: ", sum);
  console.log("The number of tickets is: ", ticketNum);
  document.getElementById("toto").innerHTML = sum;
}catch(error){
  console.log(error);
}


  // .then(snapshot => {
  //
  //
  //
  // })
  // .catch(err => {
  //   console.log(err.message);
  // });

// console.log("xxx is: ", xxx);
//get collection data
getDocs(ticketB)
  .then(snapshot => {
    // console.log(snapshot.docs)
    let ticketsData = [];
    snapshot.docs.forEach(doc => {
      ticketsData.push({ ...doc.data(), id: doc.id });
    });
    //console.log(ticketsData);
    let ticketNum = ticketsData.length;
    //console.log("The number of tickets is: ", ticketNum);

  })
  .catch(err => {
    console.log(err.message);
  });




  let myChart = document.getElementById('myChart').getContext('2d');
  let pieChart = document.getElementById('pieChart').getContext('2d');
  //Global options
  Chart.defaults.font.family = 'Lato';
  Chart.defaults.font.size = 16;
  Chart.defaults.font.color = '#777';

  let ticketsChart = new Chart(myChart, {
    type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
    data:{
      labels:['Mezalat', 'Ataba', 'Tahrir', 'Maadi'],
      datasets:[{
        label:'Tickets',
        data:[
        34567,
        45678,
        23456,
        12345,
      ],
      backgroundColor: [
        '#00AD95',
        'red',
        '#00AD95',
        '#00AD95'
      ]
      }]
    },
    options: {
      plugins:{
        title:{
          display: true,
          text: 'Number of sold tickets in the past week',
          padding: {
            top: 50,
            bottom: 10
          },
          font:{size: 34},
          color: 'black',
        },
        legend:{
          display: false,
        }
      }
    },
  });

  console.log("The total price is: ", sum);

  let subsChart = new Chart(pieChart, {
    type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
    data:{
      labels:['puplic', 'students', 'senior', 'injuried of revolution'],
      datasets:[{
        label:'Tickets',
        data:[
        sum,
        3,
        7,
        2,
      ],
      backgroundColor: [
        'green',
        'red',
        'blue',
        'yellow'
      ]
      }]
    },
    options: {
      layout: {
        padding: {
            left: 300,
            right: 300,
            bottom:0,
            top:0
        }
      },
      plugins:{
        title:{
          display: true,
          text: 'Number of subscriptions',
          padding: {
            top: 100,
            bottom: 0
          },
          font:{size: 34},
          color: 'black',
        },
        legend:{
          display: true,
        },

      }
    },
  });
