var img = document.getElementsByTagName('img')[0]
//[0] is optional at this point because there is only one image

//img.style.left = '0px'

//add pixels to the current image position

//goal: move cat from left side to right side

// function catWalk(){
//    var oldLeft = parseInt(img.style.left)
//    var newLeft = oldLeft + 1
//    img.style.left = newLeft + 'px'
// }
//
// window.setInterval(catWalk, 1);

//new goal: when the cat reaches the right hand of the screen, have it reset back to the left

//how many pixels are on the screen? viewport width
//at what point does the left edge of the image leave the screen?

//will need an if/else to compare image position to window width

img.style.left = '0px'

//more sophisticated approach
var makeKittyWalk = function() {
  var left = parseInt(img.style.left)
  left = left + 10
  if (left > window.innerWidth){
    left = -300
  }
  img.style.left = left + 'px'
}

window.setInterval(makeKittyWalk, 50)

//if you don't use .innerwidth and try to assume the size of the screen, image will loop but not fully exit the screen
// function catWalk(){
//     if (img.style.left === '600px'){
//         img.style.left = '0px'
//     }
//     var oldLeft = parseInt(img.style.left)
//
//     var newLeft = oldLeft + 1
//     img.style.left = newLeft + 'px'
// }
//
//window.setInterval(catWalk, 10)
