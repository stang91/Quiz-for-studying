//make some real questions, options and answers
let questionArray=[
    {
        question: "What method do you use to add at the beginning of an array?",
        options: ["shift ()","push ()","unshift ()","pop ()"],
        answer: "unshift ()"
    },
    {
        question: " Is JavaScript a case-sensitive language?",
        options: ["true","false"],
        answer: "true"
    },
    {
        question: "What method do you use to add at the end of an array?",
        options: ["unshift ()","pop ()","shift ()","push ()"],
        answer: "push ()"
    },
    {
        question: "Can you assign a anonymous function to a variable?",
        options: ["true","false"],
        answer: "true"
    },
    {
        question: "JavaScript is written under which of the following tag?",
        options:[
            "<JavaScript></JavaScript>",
            "<script></script>",
            "<code></code>",
            "<header></header>"
        ],
        answer: "<script></script>"

    },
    {
        question: "What method do you use to remove at the end of an array?",
        options: ["unshift ()","pop ()","shift ()","push ()"],
        answer: "pop ()"
    }

];
//DOM 
let startBtn=document.querySelector('.startButton');
let containerEl=document.querySelector('#container');
let timerEl=document.querySelector('#timer');
let ulEl=document.querySelector('.mutliChoiceBtn');
let scoreEl=document.querySelector('#score');
let highscoreListEl=document.querySelector('#highscoreList');

let timer=20;
let currentQuestionIndex=0;
let score=0;
var timerInterval;
let submitEl;

//question rendering 
function renderCurrentQuestion(){
    containerEl.textContent='';//clear content of containerEl
    var currentQuestion=questionArray[currentQuestionIndex];
    var header=document.createElement('h2');//create h2 element
    header.textContent=currentQuestion.question;//place question into h2 element
    containerEl.appendChild(header);
    //options rendering
    for(var i=0; i<currentQuestion.options.length; i++){
        var liEL=document.createElement('li');
        liEL.textContent=currentQuestion.options[i];
        ulEl.appendChild(liEL);
    }
    containerEl.appendChild(ulEl);
}

//input name/initials and scores into local storage function?
function saveHighscore(){
    let initialsValue=document.querySelector("input").value;
    let highscoreArr={
        initials: initialsValue.trim(),
        scoreValue: score
    };
    localStorage.setItem("highscoreArr",JSON.stringify(highscoreArr));
}
//sort highscore with bubble sort, insertion sort, or merge sort


function renderHighScore(){
    var currentHighscore = JSON.parse(localStorage.getItem("highscoreArr"));
    if(currentHighscore!==null){
        var listedHighscoreItems=document.createElement('li');
        listedHighscoreItems.textContent = currentHighscore.initials+" - "+currentHighscore.scoreValue;
        highscoreListEl.appendChild(listedHighscoreItems);
    } else {
      return;
    }
  }

function highScoreGameoverTag(){
    let formEl=containerEl.appendChild(document.createElement("form"));
    formEl.appendChild(document.createElement("label")).textContent="Initials:";
    formEl.appendChild(document.createElement("input")).setAttribute("type","text");
    submitEl=formEl.appendChild(document.createElement("button"));
    submitEl.textContent="Submit";
    //"submit score into highscores" button
    submitEl.addEventListener('click',function (event){
        event.preventDefault();
        saveHighscore();
        renderHighScore();
    });
}

//gameover function
function gameover(){
    containerEl.textContent='';//clear content for container
    var gameoverTittle=containerEl.appendChild(document.createElement('h2'));//create h2 element and append in container
    gameoverTittle.textContent="GAMEOVER";//input gameover in h2
    var scoreDisplay = containerEl.appendChild(document.createElement("p"));//create p element and append to container
    if(score===(questionArray.length*10)){
        scoreDisplay.textContent = ("You broke my quiz, you obtain the Highest Possible Score of "+score+"!");
    
    }else{
        scoreDisplay.textContent = ("Your final score is " + score + "!");//input score in to p element
    }
    timer=0;
    highScoreGameoverTag();
}

//start button event
startBtn.addEventListener('click',function(){
    renderCurrentQuestion();
    //timer
    timerInterval = setInterval(function(){
        timerEl.textContent=timer;//change timer element to timer number
        timer--;//countdown
        if(timer<0){
            clearInterval(timerInterval);//stop timer
            gameover();
        } 
    },1000)
});
//
containerEl.addEventListener('click',function(event){
    if(event.target.matches('li')){
        var currentQuestion=questionArray[currentQuestionIndex];
        var userGuess=event.target.textContent;
        //user answer is right
        if (userGuess===currentQuestion.answer){
            //increase score
            score+=10;
            scoreEl.textContent=score;
            //modify timer
            timer+=3;
        }
        //user answer is wrong
        else{
            //modify timer
            timer-=2;
            //decrease score
            score-=4;
            scoreEl.textContent=score;        
        }          
        ulEl.textContent='';//clear multiChoices
        currentQuestionIndex++;//next questionn
        //renders next question if there are more question coming next
        if (questionArray.length>currentQuestionIndex){
            renderCurrentQuestion();
        }else{
            gameover();
        }
    }
});
