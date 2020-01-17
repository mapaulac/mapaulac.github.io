let opponent; 
let phase = 1; 
console.log("reading js");
let chosenRisk; 
let dareArray;
let numOfIndividualDares = 3;
let facePos = 0; 
let instaPos = 1; 
let snapPos = 2; 
let twitPos = 3;
let userName;
let slider = document.getElementById("myRange");
let dareCounter = 0;
let choseDare1 = false;
let choseDare2 = false;
let choseDare3 = false;
let alreadySetTimer = false;
let userChoseSocial = false;
let riskTime; 

let facebookArray = [];
let instaArray = [];
let snapArray = [];
let twitterArray = [];

//CHECKBOX VARIABLES 
var checkboxFace = document.getElementById("checkFace");
var checkboxInsta = document.getElementById("checkInsta");
var checkboxSnap = document.getElementById("checkSnap");
var checkboxTwit = document.getElementById("checkTwit");


//CHANGING (VISIBILITY) BETWEEN PHASES
$( "#button-1" ).click(function() {
    document.getElementById("part1").style.display = "none";
    document.getElementById("part2").style.display = "flex";
});

//next phase
$( "#button-2" ).click(function() {
    document.getElementById("part2").style.display = "none";
    document.getElementById("part3").style.display = "flex";

    //ARRAY OF RISKS, ACCORDING TO SOCIAL MEDIA PLATFORM
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
    "Compliment yourself in the commens of your newest Instagram post."], 
    ["Like the 3 most recent posts of the first person that appears on your Instagram feed.", 
    "Make a new Instagram post right now and advertise it in your story.", 
    "Special dare! Go to the Handle Box. Take a piece of paper out and contact that person. If you don't have the platform they specify, return that paper and take out a new one. (Don't worry, the people in the Handle Box have consented to be contacted)"], 
    ["Take a selfie and post it on Instagram with no context.", 
    "Share the 3 most recent photos of yourelf from your camera roll in your Instagram public story.", 
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
    "Find a Twitter account of a person you know in real life and like and retweet 3 of their most recent Tweets.", 
    "Tweet a verified Twitter account (can't be Twitter official page) a selfie of yourself."]];
});

//submit risk level
$( "#button-3" ).click(function() {
    document.getElementById("part3").style.display = "none";
    document.getElementById("part4").style.display = "flex";
    updateChosenRisk();
});

//submit social media checkboxes, selectDare();
$( "#button-4" ).click(function() {
    seeWhichChecked();
    if (userChoseSocial){
        submitCheckbox();
        document.getElementById("part4").style.display = "none";
        document.getElementById("part5").style.display = "flex";
        selectDare();
        selectDare();
        selectDare();
    } else{
        alert("You must select one of the options before proceeding");
    }
});

$( "#button-5" ).click(function(){
    document.getElementById("part5").style.display = "none";
    document.getElementById("part6").style.display = "flex";
    setTimer();
    document.getElementById("timerContainer").style.display = "block";
});

$( "#button-6" ).click(function() {
    document.getElementById("part6").style.display = "none";
    document.getElementById("part7B").style.display = "flex";
});

//GET NAME 
function getName(){
    userName = document.getElementById("myInput").value;
    console.log("person's name: " + userName);
    var output = document.getElementById("nameHTML");
    var output2 = document.getElementById("nameHTML2");
    var output3 = document.getElementById("nameHTML3");
    var output4 = document.getElementById("nameHTML4");
    var output5 = document.getElementById("nameHTML5");
    output.innerHTML = userName;
    output2.innerHTML = userName;
    output3.innerHTML = userName;
    output4.innerHTML = userName;
    output5.innerHTML = userName;
}

//ARRAY OF DARES, DIFFERENT ACCORDING TO RISK & PLATFORMS
//change chosenRisk value according to user's choice
function updateChosenRisk(){
    if (slider.value == 1){
        chosenRisk = 1;
        riskTime = 60;
        console.log(chosenRisk);
    } else if (slider.value == 2){
        chosenRisk = 2;
        riskTime = 120;
        console.log(chosenRisk);
    } else if (slider.value == 3){
        chosenRisk = 3;
        riskTime = 180;
        console.log(chosenRisk);
    }
    console.log("create array called");
    createFirstDareArray();
};

//DETERMINE DARES, ACCORDING TO RISK
function createFirstDareArray(){
    console.log("inside create array");
    if (chosenRisk ==1){
        let tempArrayFace = facebookArray[0];
        let tempArrayInsta = instaArray[0];
        let tempArraySnap = snapArray[0]; 
        let tempArrayTwit = twitterArray[0];       
        //THEN CONCATENATE THEM TOGETHER IN THE FINAL LIST OF DARES
        let tempFullDare = tempArrayFace.concat(tempArrayInsta);
        let tempFullDare2  = tempFullDare.concat(tempArraySnap);
        dareArray = tempFullDare2.concat(tempArrayTwit);
    } else if (chosenRisk == 2){
        let tempArrayFace = facebookArray[1];
        let tempArrayInsta = instaArray[1];
        let tempArraySnap = snapArray[1]; 
        let tempArrayTwit = twitterArray[1];       
        let tempFullDare = tempArrayFace.concat(tempArrayInsta);
        let tempFullDare2  = tempFullDare.concat(tempArraySnap);
        dareArray = tempFullDare2.concat(tempArrayTwit);
    } else if (chosenRisk == 3){
        let tempArrayFace = facebookArray[2];
        let tempArrayInsta = instaArray[2];
        let tempArraySnap = snapArray[2]; 
        let tempArrayTwit = twitterArray[2];       
        let tempFullDare = tempArrayFace.concat(tempArrayInsta);
        let tempFullDare2  = tempFullDare.concat(tempArraySnap);
        dareArray = tempFullDare2.concat(tempArrayTwit);
    }
    console.log("finished pushing from risk level " + chosenRisk + " current dares:");
    console.log(dareArray);
};

//PART 5: SELECTING DARE AND CHANGING INNER HTML WHILE HIDDEN 
function selectDare(){
    //1. select 3 random dares out of the dareArray
    var randDare = Math.floor(Math.random() * dareArray.length);
    var dareToSend = dareArray[randDare];
    console.log(randDare);
    console.log(dareArray[randDare]);
    dareArray.splice(randDare,1);
    console.log("taking out of array");
    console.log(dareArray);
    dareCounter++;
    console.log(dareCounter + ":counter");

    //2. display 3 dares into dareOption HTML
    if (dareCounter == 1){
        var dare1 = document.getElementById("dareOption1");
        dare1.innerHTML = dareToSend;
    } else if (dareCounter == 2){
        var dare2 = document.getElementById("dareOption2");
        dare2.innerHTML = dareToSend;
    } else if (dareCounter == 3){
        var dare3 = document.getElementById("dareOption3");
        dare3.innerHTML = dareToSend;
    }
};

//SHOWING HIDDEN CHOSEN DARE 
function selectDare1(){
    console.log("SELECT DARE1");
    choseDare1 = true;
    showDare();
    document.getElementById("dareOptionDiv2").style.display = "none";
    document.getElementById("dareOptionDiv3").style.display = "none";
}

function selectDare2(){
    console.log("SELECT DARE2");
    choseDare2 = true;
    showDare();
    document.getElementById("dareOptionDiv1").style.display = "none";
    document.getElementById("dareOptionDiv3").style.display = "none";
}

function selectDare3(){
    console.log("SELECT DARE3");
    choseDare3 = true;
    showDare();
    document.getElementById("dareOptionDiv2").style.display = "none";
    document.getElementById("dareOptionDiv1").style.display = "none";
}

//OPTIONAL:FADE
// function selectDare1(){
//     console.log("SELECT DARE1");
//     choseDare1 = true;
//     showDare();
//     var element = document.getElementById("dareOptionDiv2");
//     var element2 = document.getElementById("dareOptionDiv3");
//     fade(element);
//     fade(element2);
// }

//OPTIONAL: FADE
// function fade(element) {
//     var op = 1;  // initial opacity
//     var timer = setInterval(function () {
//         if (op <= 0.1){
//             clearInterval(timer);
//             element.style.display = 'none';
//         }
//         element.style.opacity = op;
//         element.style.filter = 'alpha(opacity=' + op * 100 + ")";
//         op -= op * 0.1;
//     }, 50);
// }

//RENDERING THE DARE, SHOWING NEW TEXT
function showDare(){
    //"Dare X to:"
    var newTitle = document.getElementById("part5NewText");
    newTitle.innerHTML = "Dare " + userName +" to:";
    if (choseDare1){
        document.getElementById("choiceNumber1").style.display = "none";
        document.getElementById("dareOption1").style.display = "flex";
        document.getElementById("dareOptionDiv1").style.width = "100%";
        document.getElementById("dareOptionDiv1").style.border = "none";
    } else if (choseDare2){
        document.getElementById("choiceNumber2").style.display = "none";
        document.getElementById("dareOption2").style.display = "flex";
        document.getElementById("dareOptionDiv2").style.width = "100%";
        document.getElementById("dareOptionDiv2").style.border = "none";
    } else if (choseDare3){
        document.getElementById("choiceNumber3").style.display = "none";
        document.getElementById("dareOption3").style.display = "flex";
        document.getElementById("dareOptionDiv3").style.width = "100%";
        document.getElementById("dareOptionDiv3").style.border = "none";
    }
    if (riskTime == 60){
        timeDisclaimer.innerHTML = "They have 1 minute";
    } else if (riskTime == 120){
        timeDisclaimer.innerHTML = "They have 2 minutes";
    } else{
        timeDisclaimer.innerHTML = "They have 3 minutes";
    }
    document.getElementById("button-5").style.display = "block";
}

//TIMER 
function startTimer(duration, display) {
    console.log("STARTTIMER");
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // display.textContent = seconds;
        display.textContent = minutes + ":" + seconds; //show minutes

        //ONCE TIMER IS DONE, GO TO PART 6
        if (--timer < 0) {
            document.getElementById("timerContainer").style.display = "none";
            document.getElementById("part6").style.display = "none";
            document.getElementById("part7").style.display = "flex";
        }
    }, 1000);
}

function setTimer() {
    if (alreadySetTimer == false){
    console.log("SETTIMER");
    var timeLeft = riskTime;
    display = document.querySelector('#time');
    startTimer(timeLeft, display);//timer length varies according to chosen risk
    alreadySetTimer = true;
    } else {
        console.log("already set timer!");
    }
};

//MAKING SURE USER CHOOSES SOCIAL BEFORE PROCEEDING
function seeWhichChecked(){
    if (checkFace.checked || checkInsta.checked || checkSnap.checked || checkTwit.checked){
        userChoseSocial = true; 
    } 
}

//CHECKING CHECKBOX STATUS 
function submitCheckbox(){
    console.log(dareArray.length);
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

            } else if (checkSnap.checked == true){ //[S,T]
                console.log("snap checked");
                console.log(dareArray);

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                    console.log(dareArray);
                } 

            }

        } else if (checkInsta.checked == true){ //[I,I,S,S,T,T]
            console.log("insta checked");

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

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } 
            }
        }

    } else if (checkFace.checked == true){ //[F,F,I,I, S,S,T,T]
        console.log("face checked");

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

            } else if (checkSnap.checked == true){//[F,F,S,S,T,T]

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);//taking out last item
                } 
            }

        } else if (checkInsta.checked == true){//[F,F,I,I,S,S,T,T]
            console.log("insta checked");

            if (checkSnap.checked == false){ //[F,F,I,I,T,T]
                console.log("snap not checked");
                dareArray.splice(dareArray.length - (numOfIndividualDares*2),numOfIndividualDares); //taking out [2]

                if (checkTwit.checked == false){ 
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } 

            } else if (checkSnap.checked == true){ 
                console.log("snap checked");

                if (checkTwit.checked == false){
                    console.log("twit not checked");
                    dareArray.splice(dareArray.length-numOfIndividualDares,numOfIndividualDares);
                } 
            }
        }
    }
    console.log(dareArray);
};






