$(document).ready(() => {

    setTimeout(() => {
        // fade out loader when loaded
        $(".loaderWrapper").fadeOut("slow")

        // reveal links
        const links = document.querySelectorAll(".navLinks")
        links.forEach(element => element.classList.add("linksAnim"))

        // reveal dates
        $(".tournées").addClass("reveal")

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
    const imgArray = ["the-strokes-01.jpg", "the-strokes-02.jpg", "the-strokes-03.jpg", "the-strokes-04.jpg", "the-strokes-05.jpg", "the-strokes-06.jpg"]
    let imgIndex = Math.floor(Math.random() * imgArray.length)

    const imgPath = imgDir + imgArray[imgIndex]

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
const db = firebase.firestore()

/**
 * Update tournées 
 */

const dateIp = $("#date")
const cityIp = $("#city")
const countryIp = $("#country")
const placeIp = $("#place")

db.collection("dates").onSnapshot(function (querySnapshot) {

    const main = $(".mainContainer")
    main.html("")


    querySnapshot.forEach(function (doc) {

        if (doc.data().Full) {
            main.append(`<div class="tournées ${doc.id}"><h2>${doc.data().Date}</h2><h1>${doc.data().City}</h1><h3>${doc.data().Place}</h3><p>${doc.data().Country}</p><div><button class="adminEdit" title="Modifier"><img src="./lib/editIcon.png" alt=""></button><button class="deleteDate" title="Supprimer"><img src="./lib/deleteIcon.png" alt=""></button></div><p class="full">Complet</p></div>`)
        } else {
            main.append(`<div class="tournées ${doc.id}"><h2>${doc.data().Date}</h2><h1>${doc.data().City}</h1><h3>${doc.data().Place}</h3><p>${doc.data().Country}</p><div><button class="adminEdit" title="Modifier"><img src="./lib/editIcon.png" alt=""></button><button class="deleteDate" title="Supprimer"><img src="./lib/deleteIcon.png" alt=""></button></div></div>`)
        }
    })

    // admin options if User
    var user = firebase.auth().currentUser
    if (user) {

        $("#adminAdd").css("display", "inline-block")
        $(".tournées div").css("display", "flex")

        // admin edit
        $(".adminEdit").on("click", function () {

            window.classDiv = this.parentNode.parentNode.className.split(" ")[1]

            // display change dates inputs
            db.collection("dates").doc(classDiv).get().then(function (doc) {
                if (doc.exists) {
                    dateIp.val(doc.data().Date)
                    cityIp.val(doc.data().City)
                    countryIp.val(doc.data().Country)
                    placeIp.val(doc.data().Place)
                }
            })

            $("#isfull").css("display", "inline-block")
            $("#deleteDates").css("display", "inline-block")
            $("#changeDates").css("display", "inline-block")
            $("#confirmDates").css("display", "none")
            $(".adminInputs").css("display", "flex")
        })
    }
})

// change dates
$("#changeDates").on("click", function () {

    const checkbox = $("#isfull").is(":checked") ? true : false

    db.collection("dates").doc(classDiv).set({
        Date: dateIp.val(),
        City: cityIp.val(),
        Country: countryIp.val(),
        Place: placeIp.val(),
        Full: checkbox === true ? true : false
    }).then(function () {
        alert("Modifié")
        $(".adminInputs").css("display", "none")
    }).catch(function (error) {
        console.log(error)
    })
})

// delete dates
$(".deleteDate").on("click", function () {

    const deleteClasse = this.parentNode.parentNode.className.split(" ")[1]
    $(".adminInputs").css("display", "none")

    db.collection("dates").doc(deleteClasse).delete().then(function () {
        alert("supprimé")
    }).catch(function (error) {
        console.log(error)
    })

})

// display add dates inputs
$("#adminAdd").on("click", () => {

    dateIp.val("")
    cityIp.val("")
    countryIp.val("")
    placeIp.val("")

    $("#isfull").css("display", "inline-block")
    $("#changeDates").css("display", "none")
    $("#deleteDates").css("display", "none")
    $("#confirmDates").css("display", "inline-block")
    $(".adminInputs").css("display", "flex")
})

// confirm add dates
$("#confirmDates").on("click", () => {

    $(".adminInputs").css("display", "none")

    db.collection("dates").doc(dateIp.val()).set({
        Date: dateIp.val(),
        City: cityIp.val(),
        Country: countryIp.val(),
        Place: placeIp.val(),
        Full: false
    }).then(function () {
        alert("Date ajouté")
    })
})

$("#cancelDates").on("click", () => $(".adminInputs").css("display", "none"))