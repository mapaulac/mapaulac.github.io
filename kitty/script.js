var hat = document.getElementById('hat');
var bow = document.getElementById('bow');

hat.style.left = '-50px'
hat.style.top = '10px'
bow.style.left = '50px'

var happyCount = 0;

hat.addEventListener('click', function(){
  console.log('hat was clicked!');
  hat.style.left = '350px';
  hat.style.top = '-10px';
  happyCount++;

  console.log(happyCount);
  if (happyCount == 2){
    console.log("Piggy is happy!");
    document.getElementById('text').innerHTML = "Piggy is happy!";
  }
});

bow.addEventListener('click', function(){
  console.log('bow was clicked!');
  bow.style.left = '650px';
  bow.style.top = '500px';
  happyCount++;

  console.log(happyCount);
  if (happyCount == 2){
    console.log("Piggy is happy!");
    document.getElementById('text').innerHTML = "Piggy is happy!";
  }
});
