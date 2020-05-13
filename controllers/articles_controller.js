/* articles_controller.js
 *
 * This file will control all the operations
 * associated with articles
 *
 */
// Dependencies
let express = require("express");
let router = express.Router();
let models = require("../models");
let Article = models.Article;
let Note = models.Note;
let mongoose = require("mongoose");
const axios = require("axios");
const validateSearchInputs = require("../app/utils").validateSearchInputs;

// Main "/" Route. This will redirect the user to the rendered React application
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This route will receive a GET request, make a request to the New York Times and
//   return valid articles.
//   Valid articles: articles that have snippets that are not null nor empty
// This route serves as a middleware to hide the New York Times API Key from the client.
router.get("/api/search", function (req, res) {
  // Find all the records, sort them in descending order, then limit the records to 10
  const KEY_WORD = req.query["q"];
  const BEGIN_DATE = req.query["begin_date"];
  const END_DATE = req.query["end_date"];
  const API_KEY = process.env.API_KEY;
  let inputErrors = validateSearchInputs(KEY_WORD, BEGIN_DATE, END_DATE);

  if (
    inputErrors.keyWord["status"] ||
    inputErrors.beginDate["status"] ||
    inputErrors.endDate["status"]
  ) {
    res.statusMessage = "Wrong parameters.";
    return res.status(400).json(inputErrors);
  }

  const url =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    KEY_WORD +
    "&begin_date=" +
    BEGIN_DATE +
    "&end_date=" +
    END_DATE +
    "&api-key=" +
    API_KEY;

  axios
    .get(url)
    .then((response) => {
      let articles = response.data.response.docs.reduce(
        (filteredArticles, article) => {
          //Filter all the articles that don't have snippets or articles that have null or empty snippets
          const validArticle =
            article.hasOwnProperty("snippet") &&
            typeof article["snippet"] === "string" &&
            article["snippet"].length;
          if (validArticle) {
            filteredArticles.push(article);
          }
          return filteredArticles;
        },
        []
      );
      res.send(articles);
    })
    .catch((error) => {
      console.log(error);
      res.statusMessage("There are some issues with the NYT API.");
      res.status(400).json(error);
    });
});

// This route will receive GET requests and send the articles stored in the db.
// This route will be called at the moment the page gets rendered
router.get("/api/saved", function (req, res) {
  // Find all the records, sort them in descending order, then limit the records to 10
  Article.find({})
    .sort([["date", "descending"]])
    .limit(10)
    .populate("note")
    .exec(function (err, articles) {
      if (err) throw err;
      res.send(articles);
    });
});

// This route will receive POST requests and store articles into the db.
router.post("/api/saved", function (req, res) {
  let entry = new Article({
    title: req.body.title,
    url: req.body.url,
    date: Date.now(),
  });
  // Now, save that article to the db
  entry.save(function (err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

// This route will receive DELETE requests and remove articles from the db.
router.delete("/api/saved", function (req, res) {
  let url = req.query.url;

  Article.findOneAndDelete({ url: url }, function (err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

module.exports = router;
