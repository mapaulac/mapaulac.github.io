

function showThis(){
  console.log("HOVERING OVER");
  document.getElementById("body").style.cursor = "pointer";
  document.getElementById("text1").style.display = "none";
  document.getElementById("text2").style.display = "block";
  document.getElementById("text3").style.display = "none";

  // document.getElementById("text4").style.display = "none";
}

function showThis2(){
  console.log("HOVERING OVER");
  document.getElementById("text1").style.display = "block";
  document.getElementById("text2").style.display = "none";
  document.getElementById("text3").style.display = "none";
  document.getElementById("body").style.cursor = "pointer";
}

function showThis3(){
  console.log("HOVERING OVER");
  document.getElementById("text1").style.display = "none";
  document.getElementById("text2").style.display = "none";
  document.getElementById("text3").style.display = "block";
  document.getElementById("body").style.cursor = "pointer";
}
