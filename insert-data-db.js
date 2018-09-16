require('dotenv').config({ silent: true });

var MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app-work';
const collection = 'employee';

MongoClient.connect(
    url,
    function(err, db) {
      if (err) throw err;
      const dbo = db.db();
  
      const data =  [
        {
          "fname": "Kristin",
          "lname": "Smit",
          "img": "user",
          "position": "manager",
          "office": "a35",
          "role": "manager"
        },
        {
          "fname": "Kollin",
          "lname": "Fert",
          "img": "user-o",
          "position": "pharmacist",
          "office": "a35",
          "role": "employee"
        },
        {
          "fname": "Rebecca",
          "lname": "Trudo",
          "img": "user-o",
          "position": "pharmacist",
          "office": "a35",
          "role": "employee"
        },
        {
          "fname": "Karolina",
          "lname": "Reddic",
          "img": "user-o",
          "position": "pharmacist",
          "office": "a35",
          "role": "employee"
        },
        {
          "fname": "Victoria",
          "lname": "Backhem",
          "img": "user-o",
          "position": "cleaner",
          "office": "a35",
          "role": "employee"
        }
      ];
  
      dbo.listCollections({ name: 'questions' }).next(function(err, collinfo) {
        if (collinfo) {
          dbo.collection('questions').drop(function(err, delOK) {
            if (!delOK) {
                console.log('delete');
                
              return;
            }
            instertData(dbo, db, data);
          });
        } else {
          instertData(dbo, db, data);
        }
      });
    }
  );
  
  const instertData = (dbo, db, data) => {
    dbo.collection(collection).insertMany(data, function(err, res) {
        if (err) throw err;
        console.log(res, 'success');
      db.close();
    });
  };
  