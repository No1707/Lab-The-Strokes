$(document).ready(function () {

    setTimeout(() => {

        // Remove "Free widget instagram" button
        const feedSize = document.querySelector(".elfsight-app-05fc4c4c-099b-4bd3-851b-ee37a7360373").getElementsByTagName("a")
        const lastElem = feedSize.length - 1
        feedSize[lastElem].parentNode.removeChild(feedSize[lastElem])

        // Remove "Follow us on Insta"
        const feedTitle = document.querySelector(".eui-widget-title")
        feedTitle.parentNode.removeChild(feedTitle)

    }, 2000)

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
 * Page loader
 */

// Fade out loader when loaded
$(window).on("load", function () {
    setTimeout(() => {
        $(".loaderWrapper").fadeOut("slow")
    }, 1400)
})

// Play audio
const audio = document.querySelector("#destructiveFire")
audio.play()

// Random image
function randomImage() {
    const theImage = document.querySelector('.loaderImg')
    const imgDir = './lib/'
    const imgArray = ["the-strokes-01.jpg", "the-strokes-02.jpg", "the-strokes-03.jpg", "the-strokes-04.jpg", "the-strokes-05.jpg"]
    let imgIndex = Math.floor(Math.random() * imgArray.length)

    var imgPath = imgDir + imgArray[imgIndex]

    theImage.src = imgPath
    theImage.alt = imgArray[imgIndex]
}
randomImage()

/**
 * Buttons
 */

document.querySelector(".returnHome").addEventListener("click", () => location.assign("index.html"))