
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCyIBg1v87lTvBc5Pky0NLBBJUNwUnF6tI",
    authDomain: "train-schedule-5b656.firebaseapp.com",
    databaseURL: "https://train-schedule-5b656.firebaseio.com",
    projectId: "train-schedule-5b656",
    storageBucket: "train-schedule-5b656.appspot.com",
    messagingSenderId: "607415815810"
};
firebase.initializeApp(config);

var database = firebase.database();

//Button to add different trains

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //Grab our inputs from our html form
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val().trim();

    //Create temporary Object to push to Firebase later
    var trainInput = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrainTime,
        frequency: frequency

    };

    //Push to Firebase
    database.ref().push(trainInput);

    //Clear all text boxes for next input
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

//Firebase event: adds new trainInput to firebase database and adds for to html for the table


