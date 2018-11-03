
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

$("#add-train-btn").on("click", function (event) {
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

//Firebase event: adds new trainInput to firebase database and adds to html table
database.ref().on("child_added", function (childSnap) {

    //Firebase Variables
    var trainName = childSnap.val().name;
    console.log(trainName);
    var destination = childSnap.val().destination;
    console.log(destination);
    var firstTrainTime = childSnap.val().firstTrain;
    console.log(firstTrainTime);
    var frequency = childSnap.val().frequency;
    console.log(frequency);
    //Make sure first time is before current time
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

    //The Current Time
    var currentTime = moment();
    console.log(currentTime);

    //Difference between the current time and the first time in minutes
    var differenceInTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log(differenceInTime);

    //Amount of minutes remaining
    var remainingTime = differenceInTime % frequency;
    console.log(remainingTime);

    //Calculate Minutes Awway
    var minutesAway = frequency - remainingTime;
    console.log(minutesAway);

    //Calculate nextArrival
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log(nextArrival);
    var nextArrivalTime = moment(nextArrival).format("HH:mm");

    //Create new row on our table
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrivalTime),
        $("<td>").text(minutesAway)
    );

    // Append the input of the user to the table
    $("#train-table > tbody").append(newRow);

})

