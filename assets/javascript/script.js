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

    // Collects the Values of user inputs
    var tripClass = $("#trip-class").val().trim();
    var trainName = $("#train-name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequencyInput = $("#frequency").val().trim();
    var descriptionInput = $("#description").val().trim();
       
    // Creates local "temporary object for holding the train schedule"

    var newTrain = {
        classification: tripClass,
        train: trainName,
        destination: destinationInput,
        firstTrain: firstTrainTime,
        frequency: frequencyInput,
        description: descriptionInput
    };

    // uploads Scheduled Train to FBase
    database.ref().push(newTrain);

    // log new train info to console

    // console.log(newTrain.classification);
    // console.log(newTrain.train);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);
    // console.log(newTrain.description);

    alert("New Train's Information Added");

    // clear all the text boxes

    // $(tripClass).val("")
    // $(trainName).val("")
    // $(destinationInput).val("")
    // $(firstTrainTime).val("")
    // $(frequencyInput).val("")
    // $(descriptionInput).val("")

});

// Creates a Fbase event for adding 
// the New Train Schedule to the databse
// when user adds an entry

database.ref().on("child_added",function(childsnapshot){
    console.log(childsnapshot.val());

    // store information in a value

    var storeTripClass = childsnapshot.val().classification;
    var storeTrainName = childsnapshot.val().train;
    var storeDestination = childsnapshot.val().destination;
    var storeFirstDeparture = childsnapshot.val().firstTrain;
    var storeFrequency = childsnapshot.val().frequency;
    var storeDescription = childsnapshot.val().description;

    // input for Minutes Away

    // var firstTrainNew = moment(childsnapshot.val().firsttrain, "hh:mm")
    // var diffTime = moment().diff(moment(firstTrainNew),"minutes");
    // var remainder = diffTime.childsnapshot.val().frequency;
    // var minsAway = childsnapshot.val().frequency - remainder;

    // Log train time

    // console.log(storeTripClass);
    // console.log(storeTrainName);
    // console.log(storeDestination);
    // console.log(storeFirstDeparture);
    // console.log(storeFrequency);
    // console.log(storeDescription);
    // console.log(minsAway);

    // create HTML to post on page with train information

    function newTrainTable () {
        $("#train-schedule > tbody").append(
            "<tr>"+
                $().text(),
                $("<td>").text(storeTripClass),
                $("<td>").text(storeTrainName),
                $("<td>").text(storeDestination),
                $("<td>").text(storeFirstDeparture),
                $("<td>").text(storeFrequency),
                $("<td class=\"title3\">").text(storeDescription),+
            "</tr>"
            
            );
    }

    newTrainTable ();

});
