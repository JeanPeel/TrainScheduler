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
    var trainName = $("#train-name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequencyInput = $("#frequency").val().trim();
    var descriptionInput = $("#description").val().trim();
    
    console.log(trainName + " | " + destinationInput + " | " + firstTrainTime + " | " + frequencyInput + " | " + descriptionInput);
    
    // Creates local "temporary object for holding the train schedule"

    var newTrain = {
        train: trainName,
        destination: destinationInput,
        firsTrain: firstTrainTime,
        frequency: frequencyInput,
        description: descriptionInput
    };

    console.log(newTrain);

    // uploads Scheduled Train to FBase
    database.ref().push(newTrain);

    console.log("New Train's Information Pushed to Database");

})
