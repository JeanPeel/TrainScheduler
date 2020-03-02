// connect to Fire base (FBase)

var config = {
    apiKey : "AIzaSyBN6MzlnuG2gazwDmfDIKKJBQ_TtL5qUO4",
    authDomain : "train-scheduler-cd22f.firebaseio.com/",
    databaseURL : "https://train-scheduler-cd22f.firebaseio.com/"
};

firebase.initializeApp(config);
var database = firebase.database();

// Train Scheduler

// Submit Button

$("#submit").on("click", function (event){
    event.preventDefault();
    console.log("Submit has been clicked.")

    // Collects the Values of user inputs
    var tripClass = $("#trip-class").val().trim();
    var trainName = $("#train-name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequencyInput = $("#frequency").val().trim();
    var descriptionInput = $("#description").val().trim();
    
    console.log(tripClass + " | " + trainName + " | " + destinationInput + " | " + firstTrainTime + " | " + frequencyInput + " | " + descriptionInput);
    
    // Creates local "temporary object for holding the train schedule"

    var newTrain = {
        classification: tripClass,
        train: trainName,
        destination: destinationInput,
        firstTrain: firstTrainTime,
        frequency: frequencyInput,
        description: descriptionInput
    };

    console.log(newTrain);

    // uploads Scheduled Train to FBase
    database.ref().push(newTrain);

    // log new train info to console

    console.log(newTrain.classification);
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    console.log(newTrain.description);

    console.log("New Train's Information Pushed to Database");

    // clear all the text boxes

    $(tripClass).val("");
    $(trainName).val("");
    $(destinationInput).val("");
    $(firstTrainTime).val("");
    $(frequencyInput).val("");
    $(descriptionInput).val("");

})
