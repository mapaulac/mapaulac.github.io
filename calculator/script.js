//CREATING VARIABLES
var squareButton = document.getElementById('square-button');
var halfButton = document.getElementById('half-button');
var percentButton = document.getElementById('percent-button');
var areaButton = document.getElementById('area-button');

//EVENT LISTENERS FOR BUTTON CLICK
squareButton.addEventListener('click', function(){
  squareNumber();
});

halfButton.addEventListener('click', function(){
  halfNumber();
});

percentButton.addEventListener('click', function(){
  percentOf();
});

areaButton.addEventListener('click', function(){
  areaOfCircle();
});

//FUNCTIONS
function squareNumber(){
  var num = document.getElementById('square-input').value;
  var answer = Math.sqrt(num);
  console.log("The result of squaring the number " + num + " " + "is " + answer);
  document.getElementById('solution').innerHTML = "The result of squaring the number " + num + " " + "is " + answer;
}

function halfNumber(){
  var num = document.getElementById('half-input').value;
  var answer = num/2;
  console.log("Half of " + num + " is " + answer);
  document.getElementById('solution').innerHTML = "Half of " + num + " is " + answer;
}

function percentOf(){
  var num = document.getElementById('percent1-input').value;
  var num2 = document.getElementById('percent2-input').value;
  var answer = (num/num2)*100;
  console.log(num + " is " + answer + "% of " + num2);
  document.getElementById('solution').innerHTML = num + " is " + answer + "% of " + num2;
}

function areaOfCircle(){
  var num = document.getElementById('area-input').value;
  var answer = num * num * Math.PI;
  console.log("The area for a circle with radius " + num + " is " + answer);
  document.getElementById('solution').innerHTML = "The area for a circle with radius " + num + " is " + answer;
}
