const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var axios = require("axios");
const app = express();
const fs = require("fs");
const { json } = require("body-parser");
const { resolve } = require("path");

//used this to create an outfile to store all the logs
const myConsole = new console.Console(fs.createWriteStream("./output.txt"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors()); // Use this after the variable declaration
const port = process.env.PORT || 5000;

/**
 * used this api to fetch blogs by doing an axios get call to get list of all blogs associated with a site along with their 
 * title,content,excerpt,time,siteId,BlogId as response which is then stored in array as a json and sent back to client as a response
 */

app.get("/fetchblogs", (req, res) => {
  let title = [];
  let result = [];
  myConsole.log("fetching blogs")
  axios
    .get("https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/")
    .then((res1) => {
      myConsole.log("posts", res1.data.posts);
      res1.data.posts.map((post) => {
        let json = {};
        json["title"] = post.title;
        json["content"] = post.content;
        json["time"] = post.date;
        json["siteId"] = post.site_ID;
        json["id"] = post.ID;
        json["excerpt"] = post.excerpt;
        json["thumbnail"] = post.post_thumbnail.URL;
        result.push(json);
      });
      myConsole.log("output", result);
      return result;
    })
    .then((res2) => res.status(200).send(res2));
});

/**
 * used this api to fetch related posts by doing an axios post call to get list of all related posts associated with a site and then calling 
 *  getDta() to get title,content of the post.
 * 
 */

app.post("/fetchRelatedPosts", (req, res) => {
  let relatedPosts = [];
  myConsole.log("requested", req.body);
  axios
    .post(
      `https://public-api.wordpress.com/rest/v1/sites/${req.body.siteId}/posts/${req.body.id}/related?http_envelope=true`
    )
    .then((res1) => {
      return getData(res1, req.body.siteId);
    })
    .then((res2) => {
      myConsole.log("sending data to client", res2);
      res.status(200).send(res2);
    })
    .catch((err) => myConsole.log("error", err));
});

/**
 * used this api to fetch related tags by doing an axios get call to get list of all tags associated with a site and inserting the tagName into 
 * an array and passing the array as a response to the client
 * 
 */

app.post("/tags", (req, res) => {
  myConsole.log("inisde tags api", req.body);
  let result = [];
  axios
    .get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${req.body.siteId}/tags`
    )
    .then((res) => {
       myConsole.log("tags",JSON.stringify(res.data));
      for (let i = 0; i < 10; i++) {
        result.push(res.data.tags[i].name);
      }
      myConsole.log("tags array", result);
      return result;
    })
    .then((res2) => res.status(200).send(res2))
    .catch((err) => myConsole.log("error", err));
});


/**
 * used this api to fetch related categories by doing an axios get call to get list of all categories associated with a site and inserting the categoryName into 
 * an array and passing the array as a response to the client
 * 
 */

app.post("/categories", (req, res) => {
  myConsole.log("inisde categories api", req.body);
  let result = [];
  axios
    .get(
      `https://public-api.wordpress.com/rest/v1.1/sites/${req.body.siteId}/categories`
    )
    .then((res) => {
      myConsole.log("categories", JSON.stringify(res.data));
      for (let i = 0; i < 10; i++) {
        result.push(res.data.categories[i].name);
      }
      myConsole.log("categories array", result);
      return result;
    })
    .then((res2) => res.status(200).send(res2))
    .catch((err) => myConsole.log("error", err));
});

/**
 * 
 * @param {*} res1 returned result from previos async axios call
 * @param {*} id   sitId 
 * We will map over res1.data.body.hits and for each element we will extract the element title,content ,excerpt and thumbnail and insert it as an json into an array
 * and return the array
 */

const getData = (res1, id) => {
  return new Promise((resolve, reject) => {
    let relatedPosts = [];
    res1.data.body.hits.map((element, index) => {
      axios
        .get(
          `https://public-api.wordpress.com/rest/v1.1/sites/${id}/posts/${element.fields.post_id}`
        )
        .then((res3) => {
          let json = {};
          myConsole.log("data for each post", res3.data);
          json["title"] = res3.data.title;
          json["siteId"] = res3.data.site_ID;
          json["id"] = res3.data.ID;
          json["content"] = res3.data.content;
          json['excerpt']=res3.data.excerpt;
          json["time"] = res3.data.date;
          json['thumbnail']=res3.data.post_thumbnail.URL;
          relatedPosts.push(json);
          myConsole.log("realted posts", relatedPosts);

          if (index === res1.data.body.hits.length - 1) {
            resolve(relatedPosts);
          }
        })
        .catch((err) => myConsole.log("error", err));
    });
  });
};
app.listen(5000, () => {
  console.log("Server is up on port 5000.");
});
