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
//DOM 
let startBtn=document.querySelector('#startButton');
let containerEl=document.querySelector('#container');
let timerEl=document.querySelector('#timer');
let ulEl=document.querySelector('#changeToMutliChoiceAndBtn');
let scoreEl=document.querySelector('#score');
let highscoreEl=document.querySelector('#highscore');

let timer=15;
let currentQuestionIndex=0;
let score=0;
var timerInterval;

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
//gameover function
function gameover(){
    containerEl.textContent='';//clear content for container
    var gameoverTittle=containerEl.appendChild(document.createElement('h2'));//create h2 element and append in container
    gameoverTittle.textContent="Gameover";//input gameover in h2
    var scoreDisplay = containerEl.appendChild(document.createElement("p"));//create p element and append to container
    scoreDisplay.textContent = ("Your final score is " + score + "!");//input score in to p element
    //input name/initials and scores into local storage
    //submit score into highscore button
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
            gameover();//
        } 
    },1000)
});

containerEl.addEventListener('click',function(event){
    if(event.target.matches('li')){
        var currentQuestion=questionArray[currentQuestionIndex];
        var userGuess=event.target.textContent;
        //user answer is right
        if (userGuess===currentQuestion.answer){
            ('right');//create an element to input
            //increase score
            score=score+10;
            scoreEl.textContent=score;
            //modify timer
            timer=timer+3;
        }
        //user answer is wrong
        else{
            ('wrong');//create an element to input
            //modify timer
            timer=timer-2;
            //decrease score
            score=score-5;
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

//create high score page or form and sort high score

//sort with bubble sort or merge sort or log(n) or log(e) look into sort algo