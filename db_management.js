var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/";

MongoClient.connect(url)
    .then((db) => {
        var DB = db.db("bonApetit");
        DB.collection("Users").insertOne(myobj)
            .then(() => {
                console.log("1 document inserted");
                db.close();
            }).catch((err) => {
            console.log("Not create collection ERROR! ", err);
        });
    }).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});