var firebaseConfig = {
  apiKey: "AIzaSyBET4P2MUNvHQyxOX9qSExfpnlTOk3y8F4",
  authDomain: "labthestrokes.firebaseapp.com",
  databaseURL: "https://labthestrokes.firebaseio.com",
  projectId: "labthestrokes",
  storageBucket: "labthestrokes.appspot.com",
  messagingSenderId: "70622579594",
  appId: "1:70622579594:web:6b6a4b83c721a2d6789673"
}

firebase.initializeApp(firebaseConfig)


document.querySelector(".confirm").addEventListener("click", () => {

  let email = document.querySelector("#mail").value
  let pass = document.querySelector("#pass").value

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      return firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function () {
          alert("Vous êtes connecté")
          location.assign("index.html")
        })
    })
    .catch(function (error) {
      console.log(error.code)
      if(error.code === "auth/wrong-password" || error.code === "auth/invalid-email"){
        alert("Adresse email ou mot de passe incorrect")
      }
    })

})