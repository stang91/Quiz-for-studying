//make some real questions, options and answers
let questionArray=[
    {
        question: "some questions",
        options: ["1","2","3","4"],
        answer: "1"
    },
    {
        question: "some questions2",
        options: ["1","2","3","4"],
        answer: "2"
    },
    {
        question: "some questions3",
        options: ["1","2","3","4"],
        answer: "3"
    }
];

let startBtn=document.querySelector('#startButton');
let containerEl=document.querySelector('#container');
let timerEl=document.querySelector('#timer');
let ulEl=document.querySelector('#changeToMutliChoiceAndBtn');
let scoreEl=document.querySelector('#score');

let timer=15;
let currentQuestionIndex=0;
let score=0;
var timerInterval;
var scoring;

//gunna use alot of random function important
function randomGen(array){
    var randomIndex=Math.floor(Math.random()*array);
    var randomArray=array[randomIndex];
    return randomArray;
}

// for loop for questions and multi choices
//json? using parse and stringify? might be a good choice for random
//how to randomize questions
function renderCurrentQuestion(){
    containerEl.textContent='';
    var currentQuestion=questionArray[currentQuestionIndex];
    var header=document.createElement('h2');
    header.textContent=currentQuestion.question;
    containerEl.appendChild(header);
    //randomize options
    for(var i=0; i<currentQuestion.options.length; i++){
        var liEL=document.createElement('li');
        liEL.textContent=currentQuestion.options[i];
        ulEl.appendChild(liEL);
    }
    containerEl.appendChild(ulEl);
   
}

startBtn.addEventListener('click',function(){
    renderCurrentQuestion();
    //timer
    timerInterval = setInterval(function(){
        timerEl.textContent=timer;
        timer--;  
        if(timer<0){
            clearInterval(timerInterval);
            containerEl.textContent='';
            var gameoverTittle=containerEl.appendChild(document.createElement('h2'));
            gameoverTittle.textContent="Gameover";
            var scoreDisplay = document.createElement("p");
            scoreDisplay.textContent = ("Your final score is " + score + "!");
            containerEl.appendChild(scoreDisplay);
            //input name/initials and scores into local storage
        } 
    },1000)
});

containerEl.addEventListener('click',function(event){
    if(event.target.matches('li')){
        var currentQuestion=questionArray[currentQuestionIndex];
        var userGuess=event.target.textContent;

        if (userGuess===currentQuestion.answer){
            ('right');
            //increase score
            score=score+10;
            scoreEl.textContent=score;
            //play sound
            //modify timer
            timer=timer+3;
        }
        else{
            ('wrong');
            //modify timer
            timer=timer-2;
            //decrease score
            score=score-5;
            scoreEl.textContent=score;
            //

        }
        ulEl.textContent='';
        currentQuestionIndex++;
        if (questionArray.length>currentQuestionIndex){
        renderCurrentQuestion();
        }else{
            containerEl.textContent='';
            var gameoverTittle=containerEl.appendChild(document.createElement('h2'));
            gameoverTittle.textContent="Gameover";
            var scoreDisplay = document.createElement("p");
            scoreDisplay.textContent = ("Your final score is " + score + "!");
            containerEl.appendChild(scoreDisplay);
            //input name/initials and scores into local storage

        }
    }
});

//create high score page or form and sort high score

//sort with bubble sort or merge sort or log(n) or log(e)