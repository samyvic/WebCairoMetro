(function () {
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB4BGSVyzZE1725rn4T1nQuRXSYp6N6MdE",
    authDomain: "flutter-login-d65de.firebaseapp.com",
    databaseURL: "https://flutter-login-d65de-default-rtdb.firebaseio.com",
    projectId: "flutter-login-d65de",
    storageBucket: "flutter-login-d65de.appspot.com",
    messagingSenderId: "677870289140",
    appId: "1:677870289140:web:5236e24ebdac5a4413dea1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();




  //LOGIN
  submit.addEventListener('click', (e)=>{

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const dt = new Date();
        update(ref(database, 'users/' + user.uid),{
          last_login_date: dt,
        })
        alert('Admin Logged In Successfully!');
        location.replace("home.html")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });


}());
