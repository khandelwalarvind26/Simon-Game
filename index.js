const buttonColors = ["blue","red","green","yellow"];
const buttonArr = [];
const userClickedPattern = [];

var level = 0;
var counter;
document.addEventListener("keydown",function() {
    nextSeq();
},{once:true});

function nextSeq() {
    userPatternClear();
    level++;
    $("h1").html("Level " + level);
    randomNumber = Math.floor(Math.random()*4);
    var color = buttonColors[randomNumber];
    $("." + color).fadeOut(100);
    $("." + color).fadeIn(100);
    var s = new Audio("sounds/" + color+".mp3");
    s.play();
    buttonArr.push(color);
    counter = 0;
}

$(".btn").click(function(event) {
    var currentColor = event.target.id;
    var s = new Audio("sounds/" + currentColor+".mp3");
    s.play();
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    },100)
    userClickedPattern.push(currentColor);
    if(buttonArr[counter] === userClickedPattern[counter] && counter < level-1) {
        console.log(counter);
    }
    else if(buttonArr[counter] == userClickedPattern[counter] && counter === level-1) {
        setTimeout(function() {
            nextSeq();
        },1000);
        
    }
    else {
        var so = new Audio("sounds/wrong.mp3");
        so.play();
        level  = 0;
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        buttonArrClear();
        $("h1").html("Wrong Answer. Press any key to restart");
        document.addEventListener("keydown",function() {
            nextSeq();
        },{once:true});
    }
    counter++;
    // console.log(userClickedPattern);
})

function userPatternClear() {
    while(userClickedPattern.length>0) {
        userClickedPattern.pop();
    }
}

function buttonArrClear() {
    while(buttonArr.length > 0) {
        buttonArr.pop();
    }
}