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
    // var tripClass = $("#trip-class").val().trim();
    var trainName = $("#train-name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var frequencyInput = $("#frequency").val().trim();
    var descriptionInput = $("#description").val().trim();
       
    // Creates local "temporary object for holding the train schedule"
    var newTrain = {
        // classification: tripClass,
        train: trainName,
        destination: destinationInput,
        firstTrain: firstTrainTime,
        frequency: frequencyInput,
        description: descriptionInput
    };

    // uploads Scheduled Train to FBase
    database.ref().push(newTrain);

    // Alerts that train info is added
    alert("New Train's Information Added");

    // clear all the text boxes

    // $("#trip-class").val("")
    $("#destination").val("")
    $("#first-train-time").val("")
    $("#frequency").val("")
    $("#train-name").val("")
    // $(descriptionInput).val("")

});

// Creates a Fbase event for adding 
// the New Train Schedule to the databse
// when user adds an entry

database.ref().on("child_added",function(childsnapshot){
    console.log(childsnapshot.val());

    // store information in a value

    // var storeTripClass = childsnapshot.val().classification;
    var storeTrainName = childsnapshot.val().train;
    var storeDestination = childsnapshot.val().destination;
    var storeFirstDeparture = childsnapshot.val().firstTrain;
    var storeFrequency = childsnapshot.val().frequency;
    var storeDescription = childsnapshot.val().description;

    // input for Minutes Away

    var firstTrainNew = moment(storeFirstDeparture, "hh:mm")
    console.log(firstTrainNew)
    var diffTime = moment().diff(moment(firstTrainNew),"minutes");
    console.log("diff Time:" +diffTime)
    var remainder = diffTime % storeFrequency;
    var minsAway = storeFrequency - remainder;
    var nextTrainTime = moment().add(minsAway, "m").format("hh:mm A");

    // create HTML to post on page with train information

    function newTrainTable () {
        $("#train-schedule > tbody").append(
            "<tr>"+
                $().text(),
                // $("<td>").text(storeTripClass),
                $("<td>").text(storeTrainName),
                $("<td>").text(storeDestination),
                // $("<td>").text(storeFirstDeparture),
                // $("<td>").text(storeFrequency),
                $("<td>").text(nextTrainTime),
                $("<td id=\"mins-away\">").text(minsAway),
                $("<td class=\"title3\">").text(storeDescription),+
            "</tr>"
            
            );
    }

    newTrainTable ();

});
