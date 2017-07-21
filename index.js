var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://snap-test-25140.firebaseio.com/"
});

var fs = require("fs");
var console = require("console");


function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + "-" + hour;

}

var db = admin.database();

var downloadDate = getDateTime();
console.log("Today's date: "+downloadDate);

var dataPath = "./data"
if(!fs.existsSync(dataPath)){
  fs.mkdirSync(dataPath);
}

var userInfoPath = "./users"
if(!fs.existsSync(userInfoPath)){
  fs.mkdirSync(userInfoPath);
}

//get the data reference
var dataQuery = db.ref("data/").orderByKey();
dataQuery.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key;

      var childData = childSnapshot.val();
      var jsonData = JSON.stringify(childData);
      console.log("Opening file");

      var filename = key + ".json";
      var filepath = "./data/" + downloadDate + "/";
      if(!fs.existsSync(filepath)){
        fs.mkdirSync(filepath);
      }

      //fs.openSync(filepath + filename,'w+',{ encoding: 'utf8'});

      fs.writeFileSync(filepath + filename,jsonData,{ encoding: 'utf8'});

      //fs.closeSync(fd);

    });
  });


//get the userinfo reference
var userQuery = db.ref("users/").orderByKey();
userQuery.once("value")
  .then(function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key;

      var userData = childSnapshot.val();
      var jsonData = JSON.stringify(userData);

      console.log("Opening file");

      var filename = key + ".json";
      var filepath = "./users/" + downloadDate + "/";
      if(!fs.existsSync(filepath)){
        fs.mkdirSync(filepath);
      }
      //fs.openSync(filepath + filename,'w+',{ encoding: 'utf8'});

      fs.writeFileSync(filepath + filename,jsonData,{ encoding: 'utf8'});

      //fs.closeSync(fd);

    });
  });
