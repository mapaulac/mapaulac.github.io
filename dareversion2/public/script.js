//CURRENT PROBLEMS: WHEN TIMER RUNS OUT FOR BOTH PEOPLE - THEN THEY ARE ABLE TO BOTH SIMULTANEOUSLY START THE TIMER AGAIN 
//WHEN ONE USER COMPLETES/DOESNT COMPLETE AND ANOTHER ALLOWS THE TIME TO RUN OUT (EVERYTHING GETS STUCK)
//falta: agregar un counter que keeps track del current score de cada persona, it determines the end reward sequence 
//agregar los new rounds 
//agregar swapping functionality (maybe not if it's too complicated)

var socket = io();

let otherUser;
let currentRound = 0; 
let userCompleted = false;

//dare values
let dareNumber1;
let dareNumber2;
let dareNumber3;
let roundCompletionCount = 0;
let prevRound = 1; 
let alreadyFinishedRound = false;

//timer values
var timeOutput = document.getElementById("time");
var timeOutput2 = document.getElementById("time2");
var timeOutput3 = document.getElementById("time3");
let alreadySetTimer = false;
let stopTimer = false;
var socketTimer;

//FILTERING DARE VARIABLES
let userChoseSocial = false;
let userNoSocial = false;
let chosenRisk;
let dareArray;
let dareArrayRound1;
let dareArrayRound2;
let dareArrayRound3;
let numOfIndividualDares = 3;
let dareCounter = 0;
let choseDare1 = false;
let choseDare2 = false;
let choseDare3 = false;
let numSocialMediaAccounts = 0;
let indexToRemove;

//DARE ARRAYS
let facebookArray = [];
let instaArray = [];
let snapArray = [];
let twitterArray = [];

//CHECKBOX VARIABLES
var checkboxFace = document.getElementById("checkFace");
var checkboxInsta = document.getElementById("checkInsta");
var checkboxSnap = document.getElementById("checkSnap");
var checkboxTwit = document.getElementById("checkTwit");

//POINT TRACKING 
var userScore = 0; 

facebookArray = [["Angry react to the first 5 posts on your Facebook feed",
    "Love react to the first 5 posts on your Facebook feed",
    "Share the first 3 posts on your Facebook feed"],
    ["Take a selfie and post it on Facebook with no context.",
    "Special dare! Go to the Handle Box. Take a piece of paper out and contact that person. If you don't have the platform they specify, return that paper and take out a new one. (Don't worry, the people in the Handle Box have consented to be contacted)","Change your Facebook Cover Picture right now."],
    ["Change your Facebook profile picture to the first photo in your Camera Roll.",
    "Change your Facebook profile picture to your most recent photograph.",
    "Share the 3 most recent photos of yourself from your camera roll in your Facebook public story."]];

    instaArray = [["Unfollow 3 Instagram accounts and follow 3 new ones",
    "Like your 5 most recent posts on Instagram. ",
    "Compliment yourself in the comments of your newest Instagram post."],
    ["Like the 3 most recent posts of the first person that appears on your Instagram feed.",
    "Make a new Instagram post right now and advertise it in your story.",
    "Special dare! Go to the Handle Box. Take a piece of paper out and contact that person. If you don't have the platform they specify, return that paper and take out a new one. (Don't worry, the people in the Handle Box have consented to be contacted)"],
    ["Take a selfie and post it on Instagram with no context.",
    "Share the 3 most recent photos of yourself from your camera roll in your Instagram public story.",
    "Reply to the first 3 stories on your Instagram."]];

    snapArray = [["Send a Bitmoji to your top 3 Best Friends on Snapchat",
    "Share a Snapchat story with 3 people not on your Best Friends list.",
    "Share your Snapchat Bitmoji story with whoever is in it."],
    ["Screenshot the story of the first person on your Snapchat stories feed.",
    "Special dare! Go to the Handle Box. Take a piece of paper out and contact that person. If you don't have the platform they specify, return that paper and take out a new one. (Don't worry, the people in the Handle Box have consented to be contacted)",
    "Reply to the first 3 people's stories on your Snapchat."],
    ["Take a selfie and share it in your Snapchat story with no context.",
    "Take a selfie and send it to the last name in your 'Recent' friends list on Snapchat.",
    "Take a selfie with a random person in the exhibition and send it to 5 Snapchat friends."]];

    twitterArray = [["Retweet the first 5 tweets on your Twitter timeline.",
    "Unfollow 3 Twitter accounts and follow 3 new ones",
    "Tweet the last meal you had."],
    ["Special dare! Go to the Handle Box. Take a piece of paper out and contact that person. If you don't have the platform they specify, return that paper and take out a new one. (Don't worry, the people in the Handle Box have consented to be contacted)",
    "Copy a popular Tweet on your feed and Tweet it yourself. ",
    "Send a DM to the first 4 accounts on your Twitter feed."],
    ["Retweet something you disagree with (politically, ethically, etc.)",
    "Find a Twitter account of a person you know in real life (but you are not close to) and like and retweet 3 of their most recent Tweets.",
    "Take a selfie. Now Tweet it to the first 3 people that appear on your feed with no context."]];

//CHANGING (VISIBILITY) BETWEEN PHASES
$( "#button2" ).click(function() {
    document.getElementById("part1").style.display = "none";
    document.getElementById("part2").style.display = "flex";
});

$( "#button3" ).click(function() {
    getName();
    document.getElementById("myForm").style.display = "none";
});

$( "#button4" ).click(function() {
    let tempFullDare = facebookArray.concat(instaArray);
    let tempFullDare2  = tempFullDare.concat(snapArray);
    dareArray = tempFullDare2.concat(twitterArray);
    console.log("all dares:");
    console.log(dareArray);
    console.log(dareArray.length);
    seeWhichChecked(); //make sure options are selected
    if (userChoseSocial){
        submitCheckbox(); //filter out social media boxes
        document.getElementById("part3").style.display = "none";
        document.getElementById("part4").style.display = "flex";
        currentRound = 1;
        dareArrayRound1 = JSON.parse(JSON.stringify(dareArray));
        dareArrayRound2 = JSON.parse(JSON.stringify(dareArray));
        dareArrayRound3 = JSON.parse(JSON.stringify(dareArray));
        console.log("dare array 1: ");
        console.log(dareArrayRound1);
        console.log("dare array 2: " + dareArrayRound2.length);
        console.log("dare array 3: " + dareArrayRound3.length);
        filterDares(); //filter out dares for round 1
        var reachedPart4 = true;
        socket.emit('instructions checkpoint', reachedPart4); //sending checkpoint mark
        console.log("went to instructions menu! waiting for other player");
        
    } else if (userNoSocial){
        document.getElementById("part3").style.display = "none";
        document.getElementById("part35").style.display = "flex";
    }
    else {
        alert("You must select one of the options before proceeding");
    }
});

//ROUND 1
$( "#button5" ).click(function() {
    console.log("start round");
    document.getElementById("part4").style.display = "none";
    document.getElementById("part5").style.display = "flex";
    display = document.querySelector('#time');
    var reachedRound1 = true;
    socket.emit('round one checkpoint', reachedRound1); //REPEAT: START DARE ROUNDS
    setTimer(3000);
});

//ROUND 2   
//CONTINUE TO NEXT ROUND (AFTER ROUND 1)
function nextRound(){
    console.log("continue pressed. starting new round");
    console.log("current round: "+ currentRound);
    socket.emit('restart giveup', true);

    //starting new rounds
    if (currentRound == 2){
        console.log("STARTING ROUND 2.");
        socket.emit('round two checkpoint', true);
        setTimer(10);
    } else if (currentRound == 3){
        console.log("STARTING ROUND 3");
        socket.emit('round three checkpoint', true);
        setTimer(10);
    }
}

//COMPLETED DARE PART
//both users finish the dare function
function dareCompletedFunction(){
    socket.emit('dare complete checkpoint', true); //sending checkpoint mark
    console.log("DARE COMPLETED. ADDING SCORE. went to dare completion menu! waiting for other player");
    //showing give up buttons again
    document.getElementById("giveUp1").style.display = "block";
    document.getElementById("giveUp2").style.display = "block";
    alreadyFinishedRound = true; 
    userScore++;
    console.log("sending to server increase in round completion count");
    socket.emit('round completion count', true);
    console.log("USER SCORE");
    console.log(userScore);
    changeRoundText();
    changeSection();
    if (currentRound != 3){
        document.getElementById("dareCompletedPart").style.display = "flex";
        document.getElementById("waitingDareText").style.display = "block";
        document.getElementById("menu").style.display = "none";
    }
}

//DARE NOT COMPLETED PART
function dareNotCompletedFunction(){
    socket.emit('dare complete checkpoint', true); //sending checkpoint mark
    console.log("DARE NOT COMPLETED. went to dare completion menu! waiting for other player");
    //showing give up buttons again
    document.getElementById("giveUp1").style.display = "block";
    document.getElementById("giveUp2").style.display = "block";
    console.log("sending to server increase in round completion count");
    socket.emit('round completion count', true);
    alreadyFinishedRound = true; 
    changeRoundText();
    changeSection();
    if (currentRound != 3){
        document.getElementById("dareNotCompletedPart").style.display = "flex";
        document.getElementById("waitingDareText2").style.display = "block";
        document.getElementById("menu2").style.display = "none";
    }
}

//CHANGE VISIBILITY ACCORDING TO ROUNDS 
function changeSection(){
    if (currentRound == 1){
        document.getElementById("part5").style.display = "none";
    } else if (currentRound == 2){
        document.getElementById("part6").style.display = "none";
        document.getElementById("scorePart").style.display = "none";
    } else if (currentRound == 3){
        document.getElementById("part7").style.display = "none";
        document.getElementById("scorePart").style.display = "flex";
    }
}

//CHANGING CURRENT ROUND TEXT
function changeRoundText(){
    console.log("changing inner html values");
    var outRound = document.getElementById("currentRoundView");
    var outRound2 = document.getElementById("currentRoundView2");
    var outRound3 = document.getElementById("currentRoundView3");
    var outScore1 = document.getElementById("scoreText1");
    var outScore2 = document.getElementById("scoreText2");
    var outScore3 = document.getElementById("scoreText3");
    if (currentRound == 1){
        outRound.innerHTML = "1";
        outRound2.innerHTML = "1";
        outRound3.innerHTML = "1";
        outScore1.innerHTML = userScore;
        outScore2.innerHTML = userScore;
    } else if (currentRound == 2){
        outRound.innerHTML = "2";
        outRound2.innerHTML = "2";
        outRound3.innerHTML = "2";
        outScore1.innerHTML = userScore;
        outScore2.innerHTML = userScore;
    } else if (currentRound == 3){
        outScore3.innerHTML = userScore;
    }
}


//GET NAME - change all name instances in innerHTML here
function getName(){
    userName = document.getElementById("m").value;
    console.log("person's name: " + userName);
    let output = document.getElementById("nameHTML");
    let output2 = document.getElementById("nameHTML2");
    let output3 = document.getElementById("nameHTML3");
    output.innerHTML = userName;
    output2.innerHTML = userName;
    output3.innerHTML = userName;
}

//WEBSOCKET 
$(function () {  
    //RECEIVING, SAVING, SHOWING NAMES
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());//sending to server
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){//showing names
        $('#messages').append($('<li>').text(msg));
    });
    socket.on('broadcast', function(msg){//saving other name
        otherUser = msg;
        console.log("other user: " + msg);
    });

    //continuing to next phase once 2 names have been submitted
    socket.on('names submitted', function(namesSubmitted){
       document.getElementById("part2").style.display = "none";
       document.getElementById("part3").style.display = "flex";
    });

    //CHECKPOINTS
    //Part 4 Checkpoint
    socket.on('instructions checkpoint', function(continue5){
        console.log("received instructions confirmation! can continue");
        document.getElementById("waiting4").style.display = "none";
        document.getElementById("button5").style.display = "flex";
    });

    //FOR EACH ROUND
    //START ROUND
    socket.on('start round', function(startRound){
        userCompleted = false;
        if (currentRound == 1){
            document.getElementById("part4").style.display = "none";
            document.getElementById("part5").style.display = "flex";
        } else if (currentRound == 2){
            filterDares();
            document.getElementById("dareCompletedPart").style.display = "none";
            document.getElementById("dareNotCompletedPart").style.display = "none"; 
            document.getElementById("part6").style.display = "flex";
        } else if (currentRound == 3){
            filterDares();
            document.getElementById("dareCompletedPart").style.display = "none";
            document.getElementById("dareNotCompletedPart").style.display = "none";
            document.getElementById("part7").style.display = "flex";
        }
    });

    socket.on('dare complete checkpoint', function(continueRound){
        console.log("received dare confirmation! can continue");
        document.getElementById("waitingDareText").style.display = "none";
        document.getElementById("menu").style.display = "flex";
        document.getElementById("waitingDareText2").style.display = "none";
        document.getElementById("menu2").style.display = "flex";
        userCompleted = true;
        if (currentRound == 1){
            document.getElementById("part5").style.display = "none"; 
            currentRound = 2;  
            prevRound = 1;        
            console.log("logging change to current round: " + currentRound);
            console.log("logging change to previous round: " + prevRound);
        } else if (currentRound == 2){
            document.getElementById("part6").style.display = "none";
            currentRound = 3;
            prevRound = 2;
            console.log("logging change to current round: " + currentRound);
            console.log("logging change to previous round: " + prevRound);
        } 
        alreadyFinishedRound = false;
        console.log("reseting already finished round "+ alreadyFinishedRound);
    });

    //all changes for timer done here!!
    socket.on('timer done', function(updatedRoundCompletionCount){
            console.log("TIMER FOR BOTH PLAYERS DONE");
            console.log("ROUND COMPLETION COUNT");
            console.log(updatedRoundCompletionCount);

            //IF BOTH PLAYERS LOST TO TIME
            if (updatedRoundCompletionCount == 0){
                console.log("BOTH USERS LOST TO TIME");
                changeRoundText();
                changeSection();
            } 

            //if one user lost
             else if (updatedRoundCompletionCount == 1){
                console.log("ONE USER LOST TO TIME");
                changeRoundText();
                changeSection();
            }

            //CHANGING VISIBILIY - showing menu options
            if (alreadyFinishedRound == false){
                if (currentRound != 3){
                    document.getElementById("dareNotCompletedPart").style.display = "flex";
                }
            }

            //changing waiting text 
            if (currentRound != 3){
                document.getElementById("waitingDareText").style.display = "none";
                document.getElementById("waitingDareText2").style.display = "none";
                document.getElementById("menu").style.display = "flex";
                document.getElementById("menu2").style.display = "flex";
            }

            //changing status of round counters
            console.log("current round: " + currentRound)
            if (currentRound == 1){
                currentRound = 2; 
                prevRound = 1; 
                console.log("next round: " + currentRound)
            } else if (currentRound == 2){
                currentRound = 3;
                prevRound = 2;
                console.log("next round: " + currentRound)
            }

            alreadyFinishedRound = false;
            console.log("reseting already finished round "+ alreadyFinishedRound);        
    });

    //START TIMER
    socket.on('timer', function(currentTime){
        if (currentRound == 1){
            timeOutput.innerHTML = currentTime;
        } else if (currentRound == 2){
            timeOutput2.innerHTML = currentTime;
        } else if (currentRound == 3){
            timeOutput3.innerHTML = currentTime;
        }
    });

    //SWAP HERE
    socket.on('swap dares', function(swappedDare){
        console.log("swapped dares. received dare:");
        console.log(swappedDare);
        let dareOutput1 = document.getElementById("dareRound1");
        let dareOutput2 = document.getElementById("dareRound2");
        let dareOutput3 = document.getElementById("dareRound3");
        if (currentRound == 1){
            dareOutput1.innerHTML = swappedDare;
        } else if (currentRound == 2){
            dareOutput2.innerHTML = swappedDare;
        } else if (currentRound == 3){
            dareOutput3.innerHTML = swappedDare;
        }
    });

    //BOTH USERS AGREE TO GIVE UP
    socket.on('give up', function(gaveUp){
        //hiding current page
        document.getElementById("dareCompletedPart").style.display = "none";
        document.getElementById("dareNotCompletedPart").style.display = "none";

        //showing give up part
        document.getElementById("giveUpPart").style.display = "flex";  
    });

    socket.on('hide giveup one', function(hide){
        document.getElementById("giveUp1").style.display = "none";
    });

    socket.on('hide giveup two', function(hide){
        document.getElementById("giveUp2").style.display = "none";
    });

    socket.on('giveup alert', function(receivedAlert){
        alert('The other player has requested to give up. If you accept this request, select "Give Up" as well. If you have both changed your minds simply press "Continue" to go on to the next round.');
    });
});

//MAKING SURE USER CHOOSES SOCIAL BEFORE PROCEEDING
function seeWhichChecked(){
    if (checkFace.checked || checkInsta.checked || checkSnap.checked || checkTwit.checked){
        userChoseSocial = true;
    }
    else if (checkSocial.checked){
        userNoSocial = true;
    }
}

//CHECKING CHECKBOX STATUS
function submitCheckbox(){
    console.log(dareArray.length);
    if (checkSocial == true){

    }
    if (checkFace.checked == false){ //[I,S,T]
        console.log("face not checked");
        dareArray.splice(0,numOfIndividualDares); //taking out [0]
        console.log(dareArray);

        if (checkInsta.checked == false){ //[S,T]
            console.log("insta not checked");
            dareArray.splice(0,numOfIndividualDares); //taking out [0]
            console.log(dareArray);
            if (checkSnap.checked == false){ //[T]
                console.log("snap not checked");
                dareArray.splice(0,numOfIndividualDares); //taking out [0]
                console.log(dareArray);
                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(0,numOfIndividualDares);
                    console.log(dareArray);
                }
                else if (checkTwit.checked == true){
                    console.log("twitter checked");
                    numSocialMediaAccounts++;
                }

            } else if (checkSnap.checked == true){ //[S,T]
                console.log("snap checked");
                console.log(dareArray);
                numSocialMediaAccounts++;

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                    console.log(dareArray);
                }
                else if (checkTwit.checked == true){
                    console.log("twitter checked");
                    numSocialMediaAccounts++;
                }

            }

        } else if (checkInsta.checked == true){ //[I,I,S,S,T,T]
            console.log("insta checked");
            numSocialMediaAccounts++;

            if (checkSnap.checked == false){ //[I, I, T, T]
                console.log("snap not checked");
                dareArray.splice(numOfIndividualDares,numOfIndividualDares); //taking out [1]
                console.log(dareArray);
                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                    console.log(dareArray);
                }

            } else if (checkSnap.checked == true){ //[I,I,S,S,T,T]
                console.log("snap checked");
                numSocialMediaAccounts++;

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } 
                else if (checkTwit.checked == true){
                    console.log("twit checked");
                    numSocialMediaAccounts++;
                }
                
            }
        }

    } else if (checkFace.checked == true){ //[F,F,I,I, S,S,T,T]
        console.log("face checked");
        numSocialMediaAccounts++;

        if (checkInsta.checked == false){ //[F,F,S,S,T,T]
            console.log("insta not checked");
            dareArray.splice(numOfIndividualDares,numOfIndividualDares);//taking out [1]
            console.log(dareArray);

            if (checkSnap.checked == false){//[F,F,T,T]
                console.log("snap not checked");
                dareArray.splice(numOfIndividualDares,numOfIndividualDares);//taking out [1]
                console.log(dareArray);

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);//taking out last item
                }
                else if (checkTwit.checked == true){
                    console.log("twit checked");
                    numSocialMediaAccounts++;
                }

            } else if (checkSnap.checked == true){//[F,F,S,S,T,T]
                console.log("snap checked");
                numSocialMediaAccounts++;

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);//taking out last item
                }
                else if (checkTwit.checked == true){
                    console.log("twit checked");
                    numSocialMediaAccounts++;
                }
            }

        } else if (checkInsta.checked == true){//[F,F,I,I,S,S,T,T]
            console.log("insta checked");
            numSocialMediaAccounts++;

            if (checkSnap.checked == false){ //[F,F,I,I,T,T]
                console.log("snap not checked");
                dareArray.splice(dareArray.length - (numOfIndividualDares*2),numOfIndividualDares); //taking out [2]

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } else if (checkTwit.checked == true){
                    console.log("twit checked");
                    numSocialMediaAccounts++;
                }

            } else if (checkSnap.checked == true){
                console.log("snap checked");
                numSocialMediaAccounts++;
                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } else if (checkTwit.checked == true){
                    console.log("twit checked");
                    numSocialMediaAccounts++;
                }
            }
        }
    }
    console.log("finished filtering dares")
    console.log(dareArray);
    console.log("num of social media accounts");
    console.log(numSocialMediaAccounts);
};

//FILTER OUT DARES FOR EACH ROUND - HERE START THE TIMER, FILTER ROUND DIFFICULTY, SEND DARES TO EACH OTHER, START WIN COUNTER
function filterDares(){

    //GETTING ONLY EASY DARES
    if (currentRound == 1){
        console.log("starting round 1 filtering");
        console.log(dareArrayRound1);
        if (numSocialMediaAccounts == 1){
            indexToRemove = [1,2];
        } else if (numSocialMediaAccounts == 2){
            indexToRemove = [1,2,4,5];
        } else if (numSocialMediaAccounts == 3){
            indexToRemove = [1,2,4,5,7,8];
        } else if (numSocialMediaAccounts == 4){
            indexToRemove = [1,2,4,5,7,8,10,11];
        }

        //remove elements from dareArrayRound1
        for (var i = indexToRemove.length -1; i >= 0; i--){ 
            console.log("removing elements");
            dareArrayRound1.splice(indexToRemove[i], 1); 
        }

        console.log("easy dares: ")
        console.log(dareArrayRound1); 
        pickDare(dareArrayRound1);
    } else if (currentRound == 2){
        console.log("starting round 2");
        console.log(dareArrayRound2);
        if (numSocialMediaAccounts == 1){
            indexToRemove = [0,2];
        } else if (numSocialMediaAccounts == 2){
            indexToRemove = [0,2,3,5];
        } else if (numSocialMediaAccounts == 3){
            indexToRemove = [0,2,3,5,6,8];
        } else if (numSocialMediaAccounts == 4){
            indexToRemove = [0,2,3,5,6,8,9,11];
        }

        //remove elements from dareArrayRound1
        for (var i = indexToRemove.length -1; i >= 0; i--){ 
            console.log("removing elements");
            dareArrayRound2.splice(indexToRemove[i], 1); 
        }

        console.log("medium dares: ")
        console.log(dareArrayRound2); 
        console.log(dareArrayRound2.length); 
        pickDare(dareArrayRound2);
    } else if (currentRound == 3){
        console.log("starting round 3");
        console.log(dareArrayRound3);
        if (numSocialMediaAccounts == 1){
            indexToRemove = [0,1];
        } else if (numSocialMediaAccounts == 2){
            indexToRemove = [0,1,3,4];
        } else if (numSocialMediaAccounts == 3){
            indexToRemove = [0,1,3,4,6,7];
        } else if (numSocialMediaAccounts == 4){
            indexToRemove = [0,1,3,4,6,7,9,10]
        }

        //remove elements from dareArrayRound1
        for (var i = indexToRemove.length -1; i >= 0; i--){ 
            console.log("removing elements");
            dareArrayRound3.splice(indexToRemove[i], 1); 
        }

        console.log("hard dares: ")
        console.log(dareArrayRound3); 
        pickDare(dareArrayRound3);
    }
};

//pick out dare at random, display on the site
function pickDare(arrayOfDares){
    let randDare = Math.floor(Math.random() * arrayOfDares.length);
    let randDare2 = Math.floor(Math.random() * 3);
    console.log(arrayOfDares.length);
    console.log("random number:");
    console.log(randDare);
    console.log("random number 2");
    console.log(randDare2);
    //REPEAT: ADD DARE ROUND 3
    let dareToSend = arrayOfDares[randDare][randDare2];
    console.log("picked dare");
    console.log(dareToSend);

    //saving values according to each round & display on the site
    let dareOutput1 = document.getElementById("dareRound1");
    let dareOutput2 = document.getElementById("dareRound2");
    let dareOutput3 = document.getElementById("dareRound3");

    if (currentRound == 1){
        dareNumber1 = dareToSend;
        dareOutput1.innerHTML = dareNumber1;
        socket.emit('save dare', dareNumber1); 
    } else if (currentRound == 2){
        dareNumber2 = dareToSend;
        dareOutput2.innerHTML = dareNumber2;
        socket.emit('save dare', dareNumber2); 
    } else if (currentRound == 3){
        dareNumber3 = dareToSend;
        dareOutput3.innerHTML = dareNumber3;
        socket.emit('save dare', dareNumber3); 
    }

}


function startTimer(duration,display) {
    console.log("STARTTIMER");
    var timer = duration, minutes, seconds;
    var myVar = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        socketTimer = minutes + ":" + seconds;
        socket.emit('timer', socketTimer); 

        console.log("inside timer, user completed status: " + userCompleted);

        //STOPPING TIMER IF BOTH USERS HAVE COMPLETED THE DARE ALREADY. IF THERE ARE STILL USERS PLAYING THE CURRENT ROUND, CHECK IF THE TIME RUNS OUT
        if (userCompleted){
            console.log("both users finished!! stopped timer");
            clearInterval(myVar);
            document.getElementById("waitingDareText").style.display = "none";
            document.getElementById("menu").style.display = "flex";
            userCompleted = false;
            console.log("previous round: " + prevRound);
            console.log("current round: " + currentRound);
            if (prevRound == 1){
                currentRound = 2;
            } else if (prevRound ==2){
                currentRound = 3;
            }
        } else {
        //CHECKING HOW MANY PLAYERS LOST TO TIME
            if (--timer == 0) {
                console.log("TIMER IS DONE");
                socket.emit('timer done', true);
                clearInterval(myVar);

                // //CHECKING IF 
                // console.log("num users who completed the round before the timer ran out" + roundCompletionCount);
                // if (roundCompletionCount == 1){//if only one user's time goes out
                //     console.log("HIDING THE CONTENT");
                //     if (currentRound == 1){
                //         document.getElementById("part5").style.display = "none";
                //     }
                //     //REPEAT HERE FOR OTHER ROUNDS 
                //     document.getElementById("dareNotCompletedPart").style.display = "flex";
                //     document.getElementById("waitingDareText").style.display = "none";
                //     document.getElementById("waitingDareText2").style.display = "none";
                //     document.getElementById("menu").style.display = "flex";
                //     document.getElementById("menu2").style.display = "flex";
                //     console.log("ONLY ONE USER LOST");

                // } else if (roundCompletionCount == 0){ //if both users' time goes out
                //     if (userCompleted == false){
                //         console.log("timer done");
                //         socket.emit('timer done', true);
                //     }                
                //     clearInterval(myVar);
                // }
                // userCompleted = false; 


            }
        }
    }, 1000);
}

function setTimer(timeIsLeft) {
    console.log("SETTIMER");
    var timeLeft = timeIsLeft;
    display = document.querySelector('#time');
    startTimer(timeLeft, display);//timer length varies according to chosen risk
};

function swapDares(){
    socket.emit('swap dares', currentRound); 
}

function giveUp1(){
    socket.emit('give up one', true); 
}
function giveUp2(){
    socket.emit('give up two', true); 
}

