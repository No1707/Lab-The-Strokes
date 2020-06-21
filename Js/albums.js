$(document).ready(function () {

        setTimeout(() => {
            // fade out loader when loaded
            $(".loaderWrapper").fadeOut("slow")
    
            // reveal links
            const links = document.querySelectorAll(".navLinks")
            links.forEach(element => element.classList.add("linksAnim"))
    
            // dark background
            const background = document.querySelector(".heroBack")
            background.classList.add("backAnim")
    
            // reveal right
            const right = document.querySelector(".rightContainer")
            right.classList.add("rightAnim")
    
            // reveal right
            const left = document.querySelector(".leftContainer")
            left.classList.add("leftAnim")
        }, 1500)
    
    new Plyr('#player', {
        settings: []
    });

})

const Wwidth = window.innerWidth

/**
 * Page loader
 */

// Random image
function randomImage() {
    const theImage = document.querySelector('.loaderImg')
    const imgDir = './lib/'
    const imgArray = ["the-strokes-01.jpg", "the-strokes-02.jpg", "the-strokes-03.jpg", "the-strokes-04.jpg", "the-strokes-05.jpg", "the-strokes-06.jpg"]
    const imgIndex = Math.floor(Math.random() * imgArray.length)

    var imgPath = imgDir + imgArray[imgIndex]

    theImage.src = imgPath
    theImage.alt = imgArray[imgIndex]
}
randomImage()

/**
 * Resize
 */

if( Wwidth < "770"){
    $(".mobile").css("display","none")
}
window.addEventListener("resize", () => {

    const Wwidth = window.innerWidth

    if( Wwidth < "770"){
        $(".mobile").css("display","none")
    } else {
        $(".mobile").css("display","block")
    }
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
const storage = firebase.storage();

/**
 * Play music
 */

$(".playTitle").on("click", function () {

    $(".playTitle").removeClass("playing")
    this.classList.add("playing")
    const title = this.textContent
    const ref = title.split(" ").join("") + ".mp3"

    storage.ref(ref).getDownloadURL().then(function (url) {

        const player = document.querySelector("#player")
        player.src = url
        player.play()
    }).catch(function (error) {
        console.log(error)
    })
})
