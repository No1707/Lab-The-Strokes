$(document).ready( () => {

    // Fade out loader when loaded
    setTimeout(() => {
        $(".tournées").addClass("reveal")
        $(".loaderWrapper").fadeOut("slow")
    }, 1400)
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
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Play audio
const audio = document.querySelector("#destructiveFire")
audio.play()

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


const dateIp = $("#date")
const cityIp = $("#city")
const countryIp = $("#country")
const placeIp = $("#place")

// update tournées
db.collection("dates").onSnapshot(function (querySnapshot) {

    const main = $(".mainContainer")
    main.html("")
    

    querySnapshot.forEach(function (doc) {
        main.append(`<div class="tournées ${doc.id}"><h2>${doc.data().Date}</h2><h1>${doc.data().City}</h1><p>${doc.data().Country}</p><p>${doc.data().Place}</p><button class="adminEdit" title="Modifier/Supprimer"><img src="./lib/editIcon.png" alt=""></button></div>`)
    })

    // admin Options
    var user = firebase.auth().currentUser;
    if (user) {

        $("#adminAdd").css("display", "inline-block")
        $(".adminEdit").css("display", "inline-block")

        // admin edit
        $(".adminEdit").on("click", function () {

            window.classDiv = this.parentNode.className.split(" ")[1]

            // display values
            db.collection("dates").doc(classDiv).get().then(function (doc) {
                if (doc.exists) {
                    dateIp.val(doc.data().Date)
                    cityIp.val(doc.data().City)
                    countryIp.val(doc.data().Country)
                    placeIp.val(doc.data().Place)
                }
            })

            $("#deleteDates").css("display", "inline-block")
            $("#changeDates").css("display", "inline-block")
            $("#confirmDates").css("display", "none")
            $(".adminInputs").css("display", "flex")
        })
    }
})

// change dates
$("#changeDates").on("click", function () {

    db.collection("dates").doc(classDiv).set({
        Date: dateIp.val(),
        City: cityIp.val(),
        Country: countryIp.val(),
        Place: placeIp.val()
    }).then(function () {
        alert("Modifié")
        $(".adminInputs").css("display", "none")
    }).catch(function (error) {
        console.log(error)
    })
})

// delete dates
$("#deleteDates").on("click", function () {

    $(".adminInputs").css("display","none")

    db.collection("dates").doc(classDiv).delete().then(function () {
        alert("supprimé")
    }).catch(function (error) {
        console.log(error)
    })

})

// add dates
$("#adminAdd").on("click", () => {

    dateIp.val("")
    cityIp.val("")
    countryIp.val("")
    placeIp.val("")

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
        Place: placeIp.val()
    }).then(function () {
        alert("Date ajouté au site !")
    })
})

$("#cancelDates").on("click", () => $(".adminInputs").css("display","none"))