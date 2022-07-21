//jshint esversion:6

// essentials
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

// contents
const homeStartingContent =
  "I created this journal guided by Angela Yu while studying her Web Development Bootcamp Course. This would be a great journey for me to document my life and adventures especially in the world of technology.";

const aboutContent =
  "You could also create your own, notebook or digitally, taking notes and thoughts about your life.";

const aboutContent2 =
  "By the way, I am currently in my Senior Year as a BS Architecture Student. Yup! Also at the side, I am studying Web Development and exploring the wonders of technology.";

const contactContent =
  "You could contact me here at the link below. Just navigate to the contact page below or message me on my social media platforms. Thank you and let's keep on building!";

// essential: express
const app = express();

// essential: app.set and app.use
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MONGOOSE CONNECT
mongoose.connect(
  "mongodb+srv://admin-john:test123@cluster0.aribk.mongodb.net/blogDB",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// MONGOOSE - ITEMS SCHEMA
const postSchema = mongoose.Schema({
  title: String,
  content: String,
});

// MONGOOSE MODEL
const Post = mongoose.model("Post", postSchema);

// GET METHOD
// app.get = the home route (root)
app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    if (!err) {
      res.render("home.ejs", {
        startingContent: homeStartingContent,
        posts: posts,
      });
    }
  });
});

// app.get = about
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
    aboutContent2: aboutContent2,
  });
});

// app.get = contact
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

// app.get compose
app.get("/composeJam", function (req, res) {
  res.render("compose");
});

// POST METHOD
app.post("/compose", function (req, res) {
  // See compose.ejs
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save();
  // Removed  posts.push(post);

  // Redirect to Home Page
  res.redirect("/");
});

//clicking on readmore on the home screen bring up the post with the id on the url (https://expressjs.com/en/guide/routing.html)
app.get("/posts/:postName", function (req, res) {
  // apply npm lodash = lowercase
  const requestedTitle = _.lowerCase(req.params.postName);
  // console.log(req.params.postName); = route parameters

  // For Each (Javascript) Array
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    // stric equality
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

// essentials: running server
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});
