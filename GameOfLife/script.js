var score = 100; 
var number = 40; 
var myScoreF = 50;
var phase = 1;

var checkbox1 = document.getElementById("answers7One");
var checkbox2 = document.getElementById("answers7Two");
var checkbox3 = document.getElementById("answers7Three");
var checkbox4 = document.getElementById("answers7Four");
var checkbox5 = document.getElementById("answers7Five");

console.log("reading JS");
changeScore();
answerQuestions();
console.log(myScoreF);

//END PAGE
function showFinalScore() {
  document.getElementById("finalScore").innerHTML = score;
}

//CHANGE SCORE 
function changeScore(){
  // document.getElementById("myScore").innerHTML = score;
  document.getElementById("thing").innerHTML = score;
  console.log("changing score");
}

function goHome(){
      window.location.href = "index.html";
    }

// function showNumber(){
//   document.getElementById("thing").innerHTML = number;
//   console.log(number);
// }


//ACHIEVEMENTS
function newAchievement(achievement){
  if (achievement == "travel"){
    alert("NEW ACHIEVEMENT UNLOCKED: ARDENT TRAVELLER")
  }
  if (achievement == "interesting"){
    alert("NEW ACHIEVEMENT UNLOCKED: INTERESTING AND UNIQUE")
  }
  if (achievement == "influential"){
    alert("NEW ACHIEVEMENT UNLOCKED: HIGHLY INFLUENTIAL")
  }
  if (achievement == "professional"){
    alert("NEW ACHIEVEMENT UNLOCKED: SUCCESSFUL PROFESSIONAL")
  }
  if (achievement == "attractive"){
    alert("NEW ACHIEVEMENT UNLOCKED: HIGHLY ATTRACTIVE")
  }
  if (achievement == "politics"){
    alert("NEW ACHIEVEMENT UNLOCKED: CULTURED")
  }
  if (achievement == "food"){
    alert("NEW ACHIEVEMENT UNLOCKED: FOOD CONNOISSEUR")
  }
  if (achievement == "memes"){
    alert("NEW ACHIEVEMENT UNLOCKED: FUNNY")
  }
}

//QUESTIONS LOGIC
function answerQuestions(){
  if (phase == 1){
    console.log("PHASE 1");
    document.getElementById("question1Container").style.display = "block";
    //checking answer
    document.getElementById('answers1One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 2;
      score -= 50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers1Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 2;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers1Three').addEventListener('click', function(){
      console.log("Answer 3 clicked!");
      phase = 2;
      score+=50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
  }

  //QUESTION 2
  if (phase == 2){
    console.log("PHASE 2");
    document.getElementById('question1Container').style.display = "none";
    document.getElementById('question2Container').style.display = "block";
    //answers
    document.getElementById('answers2One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 3;
      score -= 50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers2Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 3;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers2Three').addEventListener('click', function(){
      console.log("Answer 3 clicked!");
      phase = 3;
      score+=50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers2Four').addEventListener('click', function(){
      console.log("Answer 4 clicked!");
      phase = 3;
      score+=100;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
      newAchievement("interesting");
    });
  }

  if (phase == 3){
    console.log("PHASE 3");
    document.getElementById('question2Container').style.display = "none";
    document.getElementById('question3Container').style.display = "block";
    //answers
    document.getElementById('answers3One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 4;
      score -= 50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers3Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 4;
      score-=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers3Three').addEventListener('click', function(){
      console.log("Answer 3 clicked!");
      phase = 4;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers3Four').addEventListener('click', function(){
      console.log("Answer 4 clicked!");
      phase = 4;
      score+=50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers3Five').addEventListener('click', function(){
      console.log("Answer 5 clicked!");
      phase = 4;
      score+=100;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
      newAchievement("influential");
    });
  }

  //QUESTION 4
  if (phase == 4){
    document.getElementById('question3Container').style.display = "none";
    document.getElementById('question4Container').style.display = "block";
    //answers
    document.getElementById('answers4One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 5;
      score -= 25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers4Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 5;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
      newAchievement("travel");
    });
  }

  //QUESTION 5
  if (phase == 5){
    document.getElementById('question4Container').style.display = "none";
    document.getElementById('question5Container').style.display = "block";
    //answers5
    document.getElementById('answers5One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 6;
      score -= 50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers5Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 6;
      score -= 25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers5Three').addEventListener('click', function(){
      console.log("Answer 3 clicked!");
      phase = 6;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers5Four').addEventListener('click', function(){
      console.log("Answer 4 clicked!");
      phase = 6;
      score+=50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers5Five').addEventListener('click', function(){
      console.log("Answer 5 clicked!");
      phase = 6;
      score+=100;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
      newAchievement("professional");
    });

  }

  //QUESTION 6
  if (phase == 6){
    document.getElementById('question5Container').style.display = "none";
    document.getElementById('question6Container').style.display = "block";
    //answers
    document.getElementById('answers6One').addEventListener('click', function(){
      console.log("Answer 1 clicked!");
      phase = 7;
      score -= 50;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers6Two').addEventListener('click', function(){
      console.log("Answer 2 clicked!");
      phase = 7;
      score -= 25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
    });
    document.getElementById('answers6Three').addEventListener('click', function(){
      console.log("Answer 3 clicked!");
      phase = 7;
      score+=25;
      console.log("score "+ score);
      changeScore();
      answerQuestions();
      newAchievement("attractive");
    });
  }

  //QUESTION 7
  if (phase == 7 ){
    document.getElementById('question6Container').style.display = "none";
    document.getElementById('question7Container').style.display = "block";
  }
  console.log("CURRENT PHASE " + phase);
}


//FINAL SEQUENCE - ADD CHECKBOX SCORE ONCE BUTTON IS PRESSED
function finalSequence(){
  if (checkbox1.checked == true){
    score += 25;
    changeScore();
    console.log("score "+ score);
  }
  if (checkbox2.checked == true){
    score += 25;
    changeScore();
    console.log("score "+ score);
  }
  if (checkbox3.checked == true){
    score += 25;
    changeScore();
    console.log("score "+ score);
    newAchievement("politics");
  }
  if (checkbox4.checked == true){
    score += 25;
    console.log("score "+ score);
    changeScore();
    newAchievement("food");
  }
  if (checkbox5.checked == true){
    score += 25;
    console.log("score "+ score);
    changeScore();
    newAchievement("memes");
  }
  console.log("score "+ score);
  document.getElementById('question7Container').style.display = "none";
  document.getElementById('theEndContainer').style.display = "block";
  console.log("FINAL SEQUENCE");
}