// connect Firebase

const config = {
    apiKey : "AIzaSyBN6MzlnuG2gazwDmfDIKKJBQ_TtL5qUO4",
    authDomain : "train-scheduler-cd22f.firebaseio.com/",
    databaseURL : "https://train-scheduler-cd22f.firebaseio.com/"
};

firebase.initializeApp(config);

const database = firebase.database();

// Train Scheduler

