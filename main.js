const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config({ path: './config/config.env' });

// Connection URL
const url = process.env.DB_LOCAL;

// Connec to MongoDB
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('TezDeal');
    const Car = db.collection('cars');
    const CarImages = db.collection('carimages');
    Car.find().toArray(function (err, results) {
      // console.log(results);
      // console.log(results.length);

      let carsCollection = results.map((result) => result.image);
      // console.log(carsCollection);
      // console.log(carsCollection.length);
      CarImages.find().toArray((err, results) => {
        // console.log(results);

        let imageCollection = results.map((result) => result.images);
        // console.log(imageCollection);
        // console.log(imageCollection.length);

        let resultA = carsCollection.filter(
          (elm) => !imageCollection.map((elm) => JSON.stringify(elm)).includes(JSON.stringify(elm)),
        );

        let resultB = imageCollection.filter(
          (elm) => !carsCollection.map((elm) => JSON.stringify(elm)).includes(JSON.stringify(elm)),
        );

        // show merge
        console.log([...resultB]);
      });
    });

    console.log(`MongoDB Connected: ${url}`);
  },
);
