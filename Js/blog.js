$(document).ready(function () {

    setTimeout(() => {
        // Fade out loader when loaded
        $(".loaderWrapper").fadeOut("slow")
        
        // reveal links
        const links = document.querySelectorAll(".navLinks")
        links.forEach(element => element.classList.add("linksAnim"))

        //reveal first articles
        const articles = document.querySelectorAll(".revealFirst")
        articles.forEach(element => element.classList.add("articlesAnim"))

        // dark background
        const background = document.querySelector(".heroBack")
        background.classList.add("backAnim")
    }, 1500)

})

/**
 * Page loader
 */

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
 * Reveal
 */

const revealElements = document.querySelectorAll(".reveal")
const revealItems = []

for (const _element of revealElements) {
    const item = {}
    item.revealed = false
    item.element = _element

    const bounding = _element.getBoundingClientRect()
    item.top = bounding.top + scrollY
    item.height = bounding.height

    revealItems.push(item)
}

window.addEventListener('resize', () => {
    const scrollY = window.scrollY

    for (const _item of revealItems) {
        const bounding = _item.element.getBoundingClientRect()
        _item.top = bounding.top + scrollY
        _item.height = bounding.height
    }
})

window.addEventListener("scroll", () => {

    const limit = window.scrollY + window.innerHeight

    for (const _item of revealItems) {

        if (!_item.revealed && limit > _item.top + _item.height * 0.5) {
            _item.revealed = true
            _item.element.classList.add("revealed")
        }
    }

})