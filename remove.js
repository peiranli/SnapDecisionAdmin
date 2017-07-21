var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://snap-test-25140.firebaseio.com/"
});

var db = admin.database();
//get the root reference
var dataRef = db.ref("data/");
var userRef = db.ref("users/");
var rootRef = db.ref();

rootRef.remove(function(error){
    console.log(error);
});

dataRef.remove(function(error){
    //do stuff after removal
    console.log(error);
});



userRef.remove(function(error){
    //do stuff after removal
    console.log(error);
});
