$(document).ready(function () {

    // animation
    // const logo = document.querySelector(".logo")
    // logo.classList.add("logoAnim")
    const links = document.querySelectorAll(".navLinks")
    links.forEach(element => element.classList.add("linksAnim"))
  
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


/**
 * Buttons
 */

const navLinks = document.querySelectorAll(".navLinks")

// Albums
navLinks[0].addEventListener("click", () => { location.assign("albums.html") })

// Tournées
navLinks[2].addEventListener("click", () => { location.assign("tournées.html")})

// Réseaux
navLinks[3].addEventListener("click", () => { location.assign("réseaux.html") })


/**
 * Animations
 */

// background move on mousemove
const windo = $(window)

$(".hero").mousemove((e) => {
    let moveX = ((windo.width() / 2) - e.pageX) * 0.1
    let moveY = ((windo.height() / 2) - e.pageY) * 0.1
    $(".heroBack").css("margin-left", moveX + "px")
    $(".heroBack").css("margin-top", moveY + "px")
})

