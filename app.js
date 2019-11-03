//jshint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//css and images needs to be in public folder and using below code
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extedned: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
  //console.log("hello");
  var  firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/699d62adc5",
    method: "POST",
    headers: {
      "Authorization" : "salem1 "
    },
    body: jsonData

  };

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

    }

  });
});
//try again section to return to homepage.
app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server started listening on port 3000");
});




//API Key
//


//list // ID
// 699d62adc5
