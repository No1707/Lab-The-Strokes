$(document).ready(function () {

  // reveal links
  const links = document.querySelectorAll(".navLinks")
  links.forEach(element => element.classList.add("linksAnim"))

  // reveal background
  const background = document.querySelector(".heroBack")
  background.classList.add("backAnim")

  setTimeout(() => {
    $(".countdown").addClass("reveal")
  }, 3000)

})

/**
 * Firebase
 */

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
var db = firebase.firestore()


/**
 * countdown
 */
let datesArray = []
db.collection("dates").onSnapshot(function (querySnapshot) {

  querySnapshot.forEach(function (doc) {
    datesArray.push(new Date(doc.data().Date.split("-").reverse().join("-")))
  })

})

setTimeout(() => {
  console.log("exec")
  if (datesArray.length > 0) {
    const newDate = datesArray.sort((a, b) => {
      var da = new Date(a).getTime();
      var db = new Date(b).getTime();

      return da < db ? -1 : da > db ? 1 : 0
    });
  }
  countDown(datesArray[0])
}, 2000)

function countDown(date) {
  // Set the date we're counting down to
  var countDownDate = date.getTime()

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result in the element with id="demo"
    $(".countdown").html(days + "j " + hours + "h " + minutes + "m " + seconds + "s <br>avant leur prochain concert !")

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      $(".countdown").html("Expired");
    }
  }, 1000);
}


/**
 * Animations
 */

 // background move on mousemove
 function BGAnim(){
  const windo = $(window)

  $(".hero").on("mousemove", (e) => {
    let moveX = ((windo.width() / 2) - e.pageX) * 0.1
    let moveY = ((windo.height() / 2) - e.pageY) * 0.1
    $(".heroBack").css("margin-left", moveX + "px")
    $(".heroBack").css("margin-top", moveY + "px")
  })
 }

/**
 * Sizes 
 */

const Wwidth = window.innerWidth

if (Wwidth > "1024") {
  BGAnim()
}

// resize
$(window).on("resize", function () {

  if ($(window).width() > "1024") {
    BGAnim()
  } else {
    $(".hero").unbind("mousemove")
  }

})


