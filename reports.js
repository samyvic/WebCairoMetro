import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import {
  getFirestore, collection,
  doc, getDocs, setDoc, addDoc, deleteDoc,
  deleteField,
  query,where,

} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js';



// import * as firebase from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
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

//console.log(Date.now());
let dateNow = Date.now();
let lastDay = dateNow - 86400*1000;
let lastWeek = dateNow - 604800*1000;
let lastMonth = dateNow - 2629743*1000;
let lastYear = dateNow - 31556926*1000;
let day = new Date(lastDay);
let week = new Date(lastWeek);
let month = new Date(lastMonth);
//console.log(day);

// window.selectRange = async function selectRange(){
//     return new Promise((resolve,reject)=>{
//       let starttt = document.getElementById("starttt").innerHTML;
//       let enddd = document.getElementById("enddd").innerHTML;
//       // console.log(starttt);
//       // console.log(enddd);
//       startDate = new Date(starttt*1000);
//       endDate = new Date(enddd*1000);
//       console.log(startDate);
//       console.log(endDate);
//
//         setTimeout(()=>{
//             // console.log("Hello from inside the testAsync function");
//             resolve();
//         ;} , 5000
//         );
//     });
// }
//
// async function callerFun(){
//     console.log("Caller");
//     await selectRange();
//     console.log("After waiting");
//     console.log(startDate);
//     console.log(endDate);
// }
//
// callerFun();
// async function seco(){
//   await selectRange();
//   console.log(startDate);
//   console.log(endDate);
// };
// seco();
// console.log(dateNow);
// console.log(lastDay);
// console.log(lastWeek);
// console.log(lastMonth);
// console.log(lastYear);
// const timestamp1 = Timestamp(System.currentTimeMillis())

//collection ref
const ticRef = collection(db, 'tickets');
const usersRef = collection(db, 'users');
const feedsRef = collection(db, 'feedbacks');
const issuesRef = collection(db, 'issues');
//quieries
const active = query(ticRef, where("status", "==", "active"));

const payg = query(ticRef, where("wasPayAsYouGo", "==", true));
const ticketA = query(ticRef, where("price", "==", '5.0'));
const ticketB = query(ticRef, where("price", "==", '7.0'));
const ticketC = query(ticRef, where("price", "==", '10.0'));
const ticketD = query(ticRef, where("price", "==", '12.0'));

const ticDayRef = query(ticRef, where("createdAt", ">", day));
const ticWeekRef = query(ticRef, where("createdAt", ">", week));
const ticMonthRef = query(ticRef, where("createdAt", ">", month));

let range = query(ticRef);
let timeDateRange = query(ticRef);

let startDate = new Date();
let endDate = new Date();

window.selectRange = async function selectRange(){
  let starttt = document.getElementById("starttt").innerHTML;
  let enddd = document.getElementById("enddd").innerHTML;
  // console.log(starttt);
  // console.log(enddd);
  startDate = new Date(starttt*1000);
  endDate = new Date(enddd*1000);
  // console.log(startDate);
  // console.log(endDate);
  range = query(ticRef, where("createdAt", ">", startDate ),where("createdAt", "<", endDate));
}

let timeDate1 = new Date();
let timeDate2 = new Date();
window.selectTimeDate = async function selectTimeDate(){
  let firstt = document.getElementById("firstTD").innerHTML;
  let secondd = document.getElementById("secondTD").innerHTML;
  timeDate1 = new Date(firstt*1000);
  timeDate2 = new Date(secondd*1000);
  timeDateRange = query(ticRef, where("createdAt", ">", timeDate1 ),where("createdAt", "<", timeDate2));
}

let ticketsData = [];
let usersData = [];
let feedsData = [];
let issuesData = [];
let totalTickets = 0;
let totalUsers = 0;
let totalFeeds = 0;
let totalIssues = 0;
let revenue = 0;
let activeString = [];
let fiveString = [];
let sevenString = [];
let tenString = [];
let twelveString = [];
let paygString = [];
let subString = [];
let activeNum = 0;
let aNum = 0;
let bNum = 0;
let cNum = 0;
let dNum = 0;
let paygNum = 0;
let aTotal = 0;
let bTotal = 0;
let cTotal = 0;
let dTotal = 0;
let paygTotal = 0;
let subs_revenue = 0;
let public_sub = 0;
let seniors_sub = 0;
let students_sub = 0;
let journalists_sub = 0;
let injured_sub = 0;
let avgFeed = 0;
let star1 = 0;
let star2 = 0;
let star3 = 0;
let star4 = 0;
let star5 = 0;

let selectPeriod;
let buttons = document.getElementsByTagName("button");
let buttonsCount = buttons.length;


let tickets_line = null;
let tickets_pie = null;

let maleTotal = 0;
let femaleTotal = 0;
// let tickets_line = {};
// let tickets_pie = {};

// for (let i=0; i < buttonsCount; i++) {
//     // buttons[i].onclick = function(e) {
//     //     alert(this.id);
//     // };
//     if(buttons[0].onclick){
//       selectPeriod = ticDayRef;
//     }else if(buttons[1].onclick){
//       selectPeriod = ticWeekRef;
//     }else if(buttons[2].onclick){
//       selectPeriod = ticMonthRef;
//     }else{
//       console.log("hello world!");
//     }
// }​
// let selectPeriod = document.querySelector("#ticDayRef");
// for(var i = 0; i <= buttonsCount; i += 1) {
//     buttons[i].onclick = function(e) {
//         alert(this.id);
//     };
// }​

let search = document.getElementById('search');
let passengers = document.getElementById('passengers');
// let lWeek = document.getElementById('lWeek');
// let lMonth = document.getElementById('lMonth');

const handler =  async (e, ref,myChart_tick, pieChart_tick) => {
  e.preventDefault()
  // console.log(ref);
  let snapshot = await getDocs(ref);

  ticketsData = [];
  revenue = 0;
  totalTickets = 0;
  //console.log(snapshot);
  try{
    //get collection data
    // let snapshot = await getDocs(ticDayRef);

    // console.log(snapshot.docs)

    snapshot.docs.forEach(doc => {
      ticketsData.push({ ...doc.data(), id: doc.id });
    });
    //console.log(ticketsData);
    totalTickets = ticketsData.length;

    for(let i=0; i<totalTickets; i++){
      //console.log(ticketsData[i]);
      revenue += parseFloat(ticketsData[i].price);
    }
    // console.log("The total price is: ", sum);
    // console.log("The number of tickets is: ", ticketNum);
    document.getElementById("tico").innerHTML = revenue;
    document.getElementById("trips").innerHTML = totalTickets;
    let a = myChart_tick;
    let b = pieChart_tick;
    statistics(ticketsData,a,b);
  }catch(error){
    console.log(error);
  }

}

search.addEventListener('click',(e)=>{
    const ref = range;
    //Tickets Charts
    let myChart_tick = document.getElementById('myChart-tick-1').getContext('2d');
    let pieChart_tick = document.getElementById('pieChart-tick-1').getContext('2d');
    handler(e, ref,myChart_tick, pieChart_tick);
})


const visitorsHandler =  async (e, ref) => {
  e.preventDefault()
  // console.log(ref);
  let snapshot = await getDocs(ref);

  ticketsData = [];
  revenue = 0;
  totalTickets = 0;

  //console.log(snapshot);
  try{

    snapshot.docs.forEach(doc => {
      ticketsData.push({ ...doc.data(), id: doc.id });
    });
    // console.log(ticketsData);
    totalTickets = ticketsData.length;
    let visitor = 0;
    let departed = 0;
    let typeStation = document.getElementById("typeStation").value;
    for(let i=0; i<totalTickets; i++){
      if(ticketsData[i].startStation != null){
        if(ticketsData[i].startStation.name === typeStation){
          visitor++
          //console.log(ticketsData[i].createdAt);
        }
      }
      if(ticketsData[i].endStation != null){
        if(ticketsData[i].endStation.name === typeStation){
          departed++;
          //console.log(ticketsData[i].createdAt);
        }
      }
    }
    document.getElementById("visitors").innerHTML = visitor;
    document.getElementById("departed").innerHTML = departed;
  }catch(error){
      console.log(error);
    }

}
passengers.addEventListener('click',(e)=>{
    const ref = timeDateRange;
    visitorsHandler(e, ref);
})

  // console.log(ticketsData);

// lWeek.addEventListener('click', (e)=>{
//     const ref = ticWeekRef;
//     //Tickets Charts
//     let myChart_tick = document.getElementById('myChart-tick-2').getContext('2d');
//     let pieChart_tick = document.getElementById('pieChart-tick-2').getContext('2d');
//     handler(e, ref,myChart_tick, pieChart_tick);
// })
//
// lMonth.addEventListener('click', (e)=>{
//     const ref = ticMonthRef;
//     //Tickets Charts
//     let myChart_tick = document.getElementById('myChart-tick-3').getContext('2d');
//     let pieChart_tick = document.getElementById('pieChart-tick-3').getContext('2d');
//     handler(e, ref,myChart_tick, pieChart_tick);
// })

//Total Revenue & total tickets
// try{
//   //get collection data
//   // let snapshot = await getDocs(ticDayRef);
//
//   // console.log(snapshot.docs)
//
//   snapshot.docs.forEach(doc => {
//     ticketsData.push({ ...doc.data(), id: doc.id });
//   });
//
//   totalTickets = ticketsData.length;
//
//   for(let i=0; i<totalTickets; i++){
//     revenue += parseFloat(ticketsData[i].price);
//   }
//   // console.log("The total price is: ", sum);
//   // console.log("The number of tickets is: ", ticketNum);
//   document.getElementById("tico").innerHTML = revenue;
//   document.getElementById("trips").innerHTML = totalTickets;
// }catch(error){
//   console.log(error);
// }



// }catch(error){
//   console.log(error);
// }

let users_num = document.getElementById('users_num');

//Total Subscriptions
try{
  //get collection data
  let snapshot = await getDocs(usersRef);
  // console.log(snapshot.docs)

  snapshot.docs.forEach(doc => {
    usersData.push({ ...doc.data(), id: doc.id });
  });

  totalUsers = usersData.length;


  for(let i=0; i<totalUsers; i++){
    if(usersData[i].userSub != null){
      subString.push(usersData[i].userSub);
    }
    if(usersData[i].gender === "male"){
      maleTotal++;
    }
    if(usersData[i].gender === "female"){
      femaleTotal++;
    }
  }

  for (let j = 0; j < subString.length; j++) {
    subs_revenue += parseFloat(subString[j].type.price);
    if(subString[j].typeName === "public"){
      public_sub++;
    }else if(subString[j].typeName === "above 60 years"){
      seniors_sub++;
    }else if(subString[j].typeName === "students"){
      students_sub++;
    }else if(subString[j].typeName === "journalists"){
      journalists_sub++;
    }else if(subString[j].typeName === "injured of revolution"){
      injured_sub++;
    }else{
      console.log("This subscription is not defined!");
    }
  }
  // console.log("The number of tickets is: ", ticketNum);
  document.getElementById("subs-num").innerHTML = subString.length;
  document.getElementById("subs-revenue").innerHTML = subs_revenue;
  document.getElementById("users_num").innerHTML = totalUsers;
}catch(error){
  console.log(error);
}

//Subs Charts
let myChart_subs = document.getElementById('myChart-subs').getContext('2d');
//let pieChart_subs = document.getElementById('pieChart-subs').getContext('2d');

//Feeds Charts
let myChart_feed = document.getElementById('myChart-feed').getContext('2d');
//console.log(subString);

//Feeds Charts
let pieChart_users = document.getElementById('pieChart-users').getContext('2d');

let subs_line = new Chart(myChart_subs, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
  data:{
    labels:['Public', 'Seniors(>60)', 'Students', 'Journalists', 'Injured (revolution)'],
    datasets:[{
      label:'Tickets',
      data:[
      public_sub,
      seniors_sub,
      students_sub,
      journalists_sub,
      injured_sub,
    ],
    backgroundColor: [
      'yellow',
      'green',
      'purple',
      'blue',
      '#DB7C00',
    ]
    }]
  },
  options: {
    plugins:{
      title:{
        display: true,
        text: 'The number of subscribers in each subscription category',
        padding: {
          top: 50,
          bottom: 25
        },
        font:{size: 24},
        color: 'black',
      },
      legend:{
        display: false,
      }
    }
  },
});

let issue_id = 0;
let issue_text = "";
let issue_userID = "";
let phone_num = "";
let issue_tbody = document.getElementById('issue-tbody');
//Total Issues
try{
  //get collection data
  let snapshot = await getDocs(issuesRef);

  snapshot.docs.forEach(doc => {
    issuesData.push({ ...doc.data(), id: doc.id });
  });

  totalIssues = issuesData.length;

  for(let i=0; i<totalIssues; i++){

    issue_id = i+1;
    issue_text = issuesData[i].text;
    issue_userID = issuesData[i].userId;
    for(let j=0; j<totalUsers; j++){
      if(usersData[j].id === issuesData[i].userId){
        phone_num = usersData[j].mobile;
      }
    }
    // phone_num = usersData[].id().mobile;

    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    td1.innerHTML = issue_id;
    td2.innerHTML = issue_text;
    td3.innerHTML = phone_num;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    issue_tbody.appendChild(trow);

  }

  // console.log("The number of tickets is: ", ticketNum);
  // document.getElementById("avg-feed").innerHTML = avgFeed;
  // document.getElementById("num-feed").innerHTML = totalFeeds;

}catch(error){
  console.log(error);
}

let feedback_id = 0;
let feedback_text = "";
let feedback_stars = 0;
let tbody = document.getElementById('tbody1');

//Total Feedbacks
try{
  //get collection data
  let snapshot = await getDocs(feedsRef);

  snapshot.docs.forEach(doc => {
    feedsData.push({ ...doc.data(), id: doc.id });
  });

  totalFeeds = feedsData.length;
  let sum = 0;
  for(let i=0; i<totalFeeds; i++){
    sum += parseInt(feedsData[i].index+1);
    avgFeed = sum/totalFeeds;

    feedback_id = i+1;
    feedback_text = feedsData[i].text;
    feedback_stars = feedsData[i].index+1;

    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    td1.innerHTML = feedback_id;
    td2.innerHTML = feedback_text;
    td3.innerHTML = feedback_stars;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    tbody.appendChild(trow);

    if(feedsData[i].index === 0){
      star1++;
    }else if(feedsData[i].index === 1){
      star2++;
    }else if(feedsData[i].index === 2){
      star3++;
    }else if(feedsData[i].index === 3){
      star4++;
    }else if(feedsData[i].index === 4){
      star5++;
    }else{
      console.log("Hello world!");
    }

  }

  // console.log("The number of tickets is: ", ticketNum);
  document.getElementById("avg-feed").innerHTML = avgFeed;
  document.getElementById("num-feed").innerHTML = totalFeeds;

}catch(error){
  console.log(error);
}

let feeds_line = new Chart(myChart_feed, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
  data:{
    labels:['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets:[{
      label:'Rating',
      data:[
      star1,
      star2,
      star3,
      star4,
      star5,
    ],
    backgroundColor: [
      '#00AD95',
      '#00AD95',
      '#00AD95',
      '#00AD95',
      '#00AD95',
    ]
    }]
  },
  options: {
    indexAxis: 'y',
    plugins:{
      title:{
        display: true,
        text: 'Rating In Stars (out of 5)',
        padding: {
          top: 25,
          bottom: 25
        },
        font:{size: 24},
        color: 'black',
      },
      legend:{
        display: false,
      }
    }
  },
});

let users_pie = new Chart(pieChart_users, {
  type:'pie',
  data:{
    labels:['Male', 'Female'],
    datasets:[{
      label:'Users',
      data:[
      maleTotal,
      femaleTotal,
    ],
    backgroundColor: [
      'blue',
      'pink',
    ]
    }]
  },
  options: {
    layout: {
      padding: {
          left: 150,
          right: 150,
      }
    },
    plugins:{
      title:{
        display: true,
        text: 'Male - Female Statistics',
        padding: {
          top: 50,
          bottom: 0,
        },
        font:{size: 24},
        color: 'black',
      },
      legend:{
        display: true,
        position: 'right',

      },

    }
  },
});



function statistics(ticketsData,myChart_tick,pieChart_tick){
  activeNum = 0;
  activeString =[];
  fiveString = [];
  sevenString = [];
  tenString = [];
  twelveString = [];
  paygString = [];
  aNum = 0;
  bNum = 0;
  cNum = 0;
  dNum = 0;
  paygNum = 0;
  aTotal = 0;
  bTotal = 0;
  cTotal = 0;
  dTotal = 0;
  paygTotal = 0;

  //Active tickets & tickets stats
  for(let i = 0; i<totalTickets; i++){
    if(ticketsData[i].status === "active"){
      activeString.push(ticketsData[i].status);
      //console.log(ticketsData[i].status);
    }
  }
  for(let i=0; i<totalTickets; i++){
    if(ticketsData[i].price === "5.0"){
      fiveString.push(ticketsData[i].price);
      aNum = fiveString.length;
      aTotal = 5*aNum;
      //console.log(aTotal);
    }else if(ticketsData[i].price === "7.0"){
      sevenString.push(ticketsData[i].price);
      bNum = sevenString.length;
      bTotal = 7*bNum;
    }else if(ticketsData[i].price === "10.0"){
      tenString.push(ticketsData[i].price);
      cNum = tenString.length;
      cTotal = 10*cNum;
    }else if(ticketsData[i].price === "12.0"){
      twelveString.push(ticketsData[i].price);
      dNum = twelveString.length;
      dTotal = 12*dNum;
    }else if(ticketsData[i].wasPayAsYouGo === true){
      paygString.push(ticketsData[i].price);
      paygNum = paygString.length;
      paygTotal += parseFloat(ticketsData[i].price);
      //console.log(paygTotal);
      //console.log(paygNum);
    }else{
      console.log("undefined type of ticket");
    }
  }
  //console.log(paygString.length);
  // for(let j=0; j<paygString.length; j++){
  //   paygTotal += parseFloat(paygString[j].price);
  //   console.log(paygString[j].price);
  // }
  //console.log(activeString);
  //console.log(activeString.length);
  activeNum = activeString.length;
  //console.log("The number of active tickets is: ", activeNum);
  document.getElementById("acto").innerHTML = activeNum;

  //Global options
  Chart.defaults.font.family = 'Raleway';
  Chart.defaults.font.size = 16;
  Chart.defaults.font.color = '#777';

  if(tickets_line != null){
    tickets_line.destroy();
  }

  tickets_line = new Chart(myChart_tick, {
    type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
    data:{
      labels:['5 L.E', '7 L.E', '10 L.E', '12 L.E', 'PAYG'],
      datasets:[{
        label:'Tickets',
        data:[
        aNum,
        bNum,
        cNum,
        dNum,
        paygNum,
      ],
      backgroundColor: [
        'yellow',
        'green',
        'purple',
        'blue',
        '#DB7C00',
      ]
      }]
    },
    options: {
      plugins:{
        title:{
          display: true,
          text: 'The Number Of Sold Tickets In Each Ticket Category',
          padding: {
            top: 50,
            bottom: 25
          },
          font:{size: 24},
          color: 'black',
        },
        legend:{
          display: false,
        }
      }
    },
  });

  if(tickets_pie != null){
    tickets_pie.destroy();
  }

  tickets_pie = new Chart(pieChart_tick, {
    type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, PolarArea
    data:{
      labels:['5 L.E', '7 L.E', '10 L.E', '12 L.E', 'PAYG'],
      datasets:[{
        label:'Tickets',
        data:[
        aTotal,
        bTotal,
        cTotal,
        dTotal,
        paygTotal,
      ],
      backgroundColor: [
        'yellow',
        'green',
        'purple',
        'blue',
        '#DB7C00',
      ]
      }]
    },
    options: {
      layout: {
        padding: {
            left: 150,
            right: 150,
        }
      },
      plugins:{
        title:{
          display: true,
          text: 'The Total Revenue In Each Ticket Category',
          padding: {
            top: 50,
            bottom: 0,
          },
          font:{size: 24},
          color: 'black',
        },
        legend:{
          display: true,
          position: 'right',

        },

      }
    },
  });

}
