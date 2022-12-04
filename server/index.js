//import fetch from 'node-fetch';

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const QuoteModel = require("./models/Quote");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://marko:markodimitrov@quotes.uq1mbb3.mongodb.net/quote?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

// const response = await fetch(
//   //"https://type.fit/api/quotes"
//   "https://zenquotes.io/api/quotes"
// );

// if (!response.ok) {
//   throw new Error("Something went wrong!");
// }

// const responseData = await response.json();
// console.log(responseData);
// const loadedQuotes = [];

// for (const key in responseData) {
//   //let author = JSON.stringify(responseData[key].a);
//   const quote = new QuoteModel({
//     oip: responseData[key].c,
//     qoute: responseData[key].q,
//     author: responseData[key].a,
//     flag: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Globe_Flag.png",
//   });
//   try{
//     await quote.save();
//   }catch{
//     console.log(err);
//   }
// }

// fetch("https://api.github.com/users")
//   .then((res) => res.json())
//   .then((res) => console.log(res));

app.get("/", async (req, res) => {
  QuoteModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/random", async (req, res) => {
  QuoteModel.find({ oip: 5 }, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
