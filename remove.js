var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gitdots.firebaseio.com"
});

var db = admin.database();
//get the root reference
var dataRef = db.ref("data/");
var userRef = db.ref("users/");


dataRef.remove(function(error){
    //do stuff after removal
    console.log(error);
});



userRef.remove(function(error){
    //do stuff after removal
    console.log(error);
});
