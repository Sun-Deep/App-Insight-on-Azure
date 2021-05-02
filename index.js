const express = require("express");
const app = express();

const appInsights = require("applicationinsights");
appInsights.setup("<ikey>").setSendLiveMetrics(true).start();
let client = appInsights.defaultClient;

app.get("/", (req, res) => {
  client.trackRequest({
    name: "GET /",
    url: "https://sandeep-appinsights.azurewebsites.net/",
    duration: 309,
    resultCode: 200,
    success: true,
  });
  return res.send("Hello, world");
});

app.get("/b", (req, res) => {
  client.trackException({
    exception: new Error("handled exceptions can be logged with this method"),
  });
  return res.send("Exception");
});

app.get("/c", (req, res) => {
  client.trackTrace({ message: "trace message" });
  return res.send("track trace");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Server started");
  }
});
