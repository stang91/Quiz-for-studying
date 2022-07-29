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

let timer=3;
let currentQuestionIndex=0;

var timerInterval;

//gunna use alot of random function important
function randomGen(array){
    var randomIndex=Math.floor(Math.random()*array[i]);
    var randomArray=array[randomIndex];
    return randomArray;
}

// for loop for questions and multi choices

function renderCurrentQuestion(){
    containerEl.innerHTML='';
    var currentQuestion=questionArray[currentQuestionIndex];
    var header=document.createElement('h2');
    header.textContent=currentQuestion.question;
    containerEl.appendChild(header);
    
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
        if(timer===-1){
            clearInterval(timerInterval);
            containerEl.innerHTML='';
            var gameoverTittle=containerEl.appendChild(document.createElement('h2'));
            gameoverTittle.textContent="Gameover";
        } 
    },1000)
});

containerEl.addEventListener('click',function(event){
    if(event.target.matches('li')){
        var currentQuestion=questionArray[currentQuestionIndex];

        var userGuess=event.target.textContent;
        console.log(userGuess);

        if (userGuess===currentQuestion.answer){
            console.log('you guest right.');
            //increase score
            //play sound
            //modify timer
        }else{
            console.log('wrong');
            //modify timer
            //decrease score
            //

        }
        ulEl.textContent='';
        currentQuestionIndex++;
        renderCurrentQuestion();
    }
});