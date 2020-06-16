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

/**
 * Animations
 */

// albums

const albumsPath = [
    "./lib/coverTheNewAbnormal.jpg",
    "./lib/coverComedownMachine.jpg",
    "./lib/coverAngles.jpg",
    "./lib/coverFirstImpressionsOfEarth.jpg",
    "./lib/coverRoomOnFire.jpg",
    "./lib/coverIsThisIt.jpg"
]
function animation() {

    // variables
    let album = document.querySelector(".album")
    let disque = document.querySelector(".disque")
    const parent = document.querySelector(".leftContainer")
    const value = select.value

    // when animation ends
    album.addEventListener("animationend", () => {
        switch (value) {
            case "1":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[0]}" alt=""></div><div class="disque disque1 disqueAnim2"></div>`
                break;
            case "2":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[1]}" alt=""></div><div class="disque disque2 disqueAnim2"></div>`
                break;
            case "3":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[2]}" alt=""></div><div class="disque disque2 disqueAnim2"></div>`
                break;
            case "4":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[3]}" alt=""></div><div class="disque disque2 disqueAnim2"></div>`
                break;
            case "5":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[4]}" alt=""></div><div class="disque disque2 disqueAnim2"></div>`
                break;
            case "6":
                parent.innerHTML = `<div class="album albumAnim2"><img src="${albumsPath[5]}" alt=""></div><div class="disque disque2 disqueAnim2"></div>`
                break;
        }
        album = document.querySelector(".album")
        disque = document.querySelector(".disque")
        album.addEventListener("animationend", () => {
            album.classList.remove("albumAnim2")
            disque.classList.remove("disqueAnim2")
        })
    })

    album.classList.add("albumAnim1")
    disque.classList.add("disqueAnim1")
}

let select = document.querySelector("#albumsSelect")
select.addEventListener("change", animation)
