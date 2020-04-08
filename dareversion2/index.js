const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

var numUsers = 0; 
var numNames = 0;
var namesSubmitted = false;
var part4CheckNumber = 0;
var continuePart5 = false;
var userArray = [];
var choseTimerUser = false;
var timerUser; 
var choseTimerUser2 = false;
var timerUser2; 
var roundCompleted = 0;
var continueDare = false;
var currentRound = 1;


io.on('connection', function(socket){
  console.log(numUsers);
  const sessionID = socket.id;
  console.log("ID: " + sessionID); //get users' IDs 
  userArray.push(sessionID);
  console.log(userArray);
  numUsers++;
  console.log('a user has connected');
  console.log('number of users online: '+numUsers);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    numUsers--;
    console.log('UPDATED number of users online: '+ numUsers);


    //RESTARTING ALL VALUES ONCE 
    if (numUsers <= 0){
      console.log("restarting name count"); 
      numNames = 0; 
      part4CheckNumber = 0;
      console.log(numNames);
      var numIDs = userArray.length; 
      userArray.splice(0,numIDs);
      console.log("restarted ID array");
      choseTimerUser = false;
      roundCompleted = 0;
      choseTimerUser2 = false;
      timerUser2 = 0;
      continueDare = false;
    }
  });

  //CHECKPOINTS 
  //instructions checkpoint
  socket.on('instructions checkpoint', function(reached){
    if (reached){
      part4CheckNumber++;
    }
    if (part4CheckNumber == 2){
      continuePart5 = true;
      io.emit('instructions checkpoint', continuePart5);
    }
  });

  //round completion checkpoint - REPEAT FOR EVERY ROUND
  socket.on('dare complete checkpoint', function(reachedDare){
    if (reachedDare){
      roundCompleted++;
    }
    if (roundCompleted == 2){
      continueDare = true;
      console.log("both users submitted something");
      io.emit('dare complete checkpoint', continueDare);
      roundCompleted = 0;
      continueDare = false;
    }
  });

  //timer checkpoint (filtering) - round 1
  socket.on('round one checkpoint', function(reachedTimer){
    if (reachedTimer){
      if (choseTimerUser == false){
        console.log("timer user "+ sessionID);
        timerUser = sessionID;
        choseTimerUser = true;
        io.emit('start round', true);
      }
    }
  });

  //timer checkpoint - round 2
  socket.on('round two checkpoint', function(reachedTimer2){
    currentRound = 2;
    console.log("current round: " + currentRound);
    if (reachedTimer2){
      if (choseTimerUser2 == false){
        console.log("timer user "+ sessionID);
        timerUser2 = sessionID;
        choseTimerUser2 = true;
        io.emit('start round', true);
      }
    }
  });

  socket.on('timer', function(receiveTimer){
    if (currentRound == 1){
      if (sessionID == timerUser){
        console.log('time left: '  + receiveTimer);
        io.emit('timer', receiveTimer);
      }
    } else if (currentRound == 2){
      if (sessionID == timerUser2){
        console.log('time left: '  + receiveTimer);
        io.emit('timer', receiveTimer);
      }
    }
  });

  socket.on('timer done', function(isTimerDone){
    console.log("timer is done");
    if (isTimerDone){
      io.emit('timer done', isTimerDone);
    }
});

  socket.on('chat message', function(msg){ //when form is submitted
    numNames++;
    console.log('name: ' + msg);
    io.emit('chat message', msg);//send name to client-side
    socket.broadcast.emit('broadcast', msg); //sending name, only other player receives it

    //all names have been submitted
    if (numNames == 2){
      console.log("names have been sumbitted, sending over to client")
      namesSubmitted = true;
      io.emit('names submitted', namesSubmitted);
    }
  });
});

http.listen(port, () => console.log('listening on port ' + port));