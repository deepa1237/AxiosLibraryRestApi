const express = require("express");
const app = new express();
const axios = require("axios");
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
let data;
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("index.ejs", { data: response.data });
  } catch (error) {
    res.render("index.ejs", { error: "No activities that match your criteria." });
  }
});

app.post("/", async (req, res) => {
  const response = await axios
    .get("https://bored-api.appbrewery.com/filter", {
      params: {
        type: req.body.type,
        participants: req.body.participants,
      },
    })
    .then((response) => {
      const result = response.data;
      res.render("index.ejs", {
        data: response.data[Math.floor(Math.random() * result.length)],
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.render("index.ejs", { error: "No activities that match your criteria." });
    });
});

app.listen(port);
