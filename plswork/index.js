// const PORT = process.env.PORT || 5000
var express=require('express');
var app=express();
const fs = require('fs');
var bodyparser=require('body-parser');
const path = require('path');

app.use(express.static('public'));//or 'website' (?)
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.set('view engine', 'ejs');

var tempUser = {
  dare: "NEW DARE 1",
  id: "0"
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//----------------------------------------------------------
//READING DARE 2
// fs.readFile('./daredata.json', 'utf8', (err, jsonString) => {
//   if (err) {
//       console.log("Error reading file from disk:", err)
//       return
//   }
//   try {
//       const user = JSON.parse(jsonString)
//       console.log("User's dare is:", user[1].dare) //obtaining dare from user 2
// } catch(err) {
//       console.log('Error parsing JSON string:', err)
//   }
// })

//SENDING DARE TO USER 1 - WRITING TO JSON FILE
function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
      if (err) {
          return cb && cb(err)
      }
      try {
          const object = JSON.parse(fileData)
          return cb && cb(null, object)
      } catch(err) {
          return cb && cb(err)
      }
  })
}

//---------------------------------------------------------------

// var server=app.listen(3030,listening);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

function listen(){
console.log("listening..");
}

//SEND USER'S DARE (B) TO HTML
app.get('/send', function(req, res, next) {
  console.log('entering /');
  //read file to get data
  fs.readFile('./daredata.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const user = JSON.parse(jsonString)
        console.log("User's dare is:", user[1].dare) //obtaining dare from user 2
        console.log("sending json"); //STUCK HERE
        res.json(user[1].dare)
  } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
  })
});

// app.get('/all',sendAll);

//OBTAIN USER A'S DARE FROM PAGE TO JSON
app.post('/asend', (req, res, next) => {
  //res.send("hello"); //send new dare here, read from JSONa
  // res.send("dare from database " + req.body.msg);

  jsonReader('./daredata.json', (err, user) => {
    if (err) {
        console.log('Error reading file:',err)
        return
    }
    console.log("before");
    console.log(user);
    user[0].dare = req.body.msg //CHANGE USER A'S DARE IN JSON
    fs.writeFile('./daredata.json', JSON.stringify(user, null, 2), (err) => {
          if (err) console.log('Error writing file:', err)
      })
    console.log("after");
    console.log(user);
    res.send(user[1].dare);//SENDING BACK USER B'S DARE
  })

})

//SEND A'S DARE BACK TO FRONTEND - SOMEHOW DOESNT WORK??
app.post('/asendback', (req, res, next) => {
  //res.send("hello"); //send new dare here, read from JSONa
  //READING DATABASE
  // fs.readFile('./daredata.json', 'utf8', (err, jsonString) => {
  //   if (err) {
  //       console.log("Error reading file from disk:", err)
  //       return
  //   }
  //   try {
  //       const user = JSON.parse(jsonString)
  //       console.log("USER A's dare:", user[0].dare) //obtaining dare from user A
  // } catch(err) {
  //       console.log('Error parsing JSON string:', err)
  //   }
  // })

  //SENDING BACK DARE A
  // res.send(user[0].dare);

})

//OBTAIN USER B'S DARE
app.post('/bsend', (req, res, next) => {
  //res.send("hello"); //send new dare here, read from JSONa
  // res.send("dare from database " + req.body.msg);
  // res.send("received dare from B");

  jsonReader('./daredata.json', (err, user) => {
    if (err) {
        console.log('Error reading file:',err)
        return
    }
    console.log("before");
    console.log(user);
    user[1].dare = req.body.msg //CHANGE USER B'S DARE
    fs.writeFile('./daredata.json', JSON.stringify(user, null, 2), (err) => {
          if (err) console.log('Error writing file:', err)
      })
    console.log("after");
    console.log(user);
    res.send(user[0].dare);//SENDING BACK USER A'S DARE
  })
})



 
//  function sendAll(request,response){
//   response.send(user); //VER QUE MANDAR ACA
//  }