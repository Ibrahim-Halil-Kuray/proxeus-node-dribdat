var express = require("express");
var path = require("path");
var logger = require("morgan");
var axios = require("axios");

var app = express();

app.listen(3030);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Register this node with the Proxeus server */ 
let error = null;

const nodeId = "dribdat";
const name = "Dribdat Application";
const description = "Hello world";
const serviceUrl = "http://localhost:3030";
const jwtSecret = "ABCDE1234567";

const proxeusUrl = "http://localhost:1323";

let ExternalNode = {
    ID:     nodeId, // {dribdat.username}
    Name:   name,
    Detail: description,
    Url:    serviceUrl,
    Secret: jwtSecret,
  }

console.log("Attempting to connect to Proxeus", proxeusUrl);

const url = proxeusUrl + "/api/admin/external/register"
axios.post(url, {
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
  })
 .then(data => {
    if (data.status == 200) {
      console.log("Node was registered", name);
    } else {
      console.error("Error registering Node", name);
    }
  })
 .catch(err => {
    console.error("Error registering Node", name);
  });



// * GET `/health` heartbeat to check that the node is alive.
app.get('/health', async (req, res) => {
  console.log('Health Request Type:', req.method)
});

// * GET `/node/:id/config` return the configuraton HTML page for the given node instance.
app.get('/node/:id/config', async (req, res) => {
  const nodeId = request.params.id;
  console.log('Get the Config for ID:', nodeId)
});

// * POST `/node/:id/config` updated the configuration of the node instance with the give id.
app.post('/node/:id/config', async (req, res) => {
  const nodeId = request.params.id;
  console.log('Save the Config for ID:', nodeId)
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// * POST `/node/:id/next` trigger the execution of a node instance.
app.post('/node/:id/next', async (req, res) => {
  const nodeId = request.params.id;
  console.log('Save the Config for ID:', nodeId)

  // 
  axios.get("https://aareguru.existenz.ch/today?app=my.app.ch&version=1.0.42")
   .then(data => {
      if (data.status != 200) {
        console.error("Error talking to Dribdat");
      }
/*
{
  "aare": 22.1,
  "text": "Spaghettiwasser",
  "time": 1692627000
}
*/
      res.send(data)
    })
   .catch(err => {
      res.send(err)
    });
});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// * POST `/node/:id/remove` remove a node instance, called when a node instance is removed from a workflow definition.
app.post('/node/:id/remove', async (req, res) => {
  const nodeId = request.params.id;
  console.log('Save the Config for ID:', nodeId)
});

console.log(
  "Hello, world! App is running on http://localhost:3030"
);



module.exports = app;
