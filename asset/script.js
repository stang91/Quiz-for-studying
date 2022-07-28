let questionArray=[
    {
        question: "some questions",
        options: ["1","2","3","4"],
        answer: "1"
    },
    {
        question: "some questions",
        options: ["1","2","3","4"],
        answer: "1"
    },
    {
        question: "some questions",
        options: ["1","2","3","4"],
        answer: "1"
    }
];

let startBtn=document.querySelector('#startButton');
let containerEl=document.querySelector('#container');
let timerEl=document.querySelector('#timer');
let ulEl=document.querySelector('#changeToMutliChoiceAndBtn');

let timer=120;
let currentQuestionIndex=0;

var timerInterval;

//gunna use alot of random function important
// Math.floor(math.random()*variable);

// for loop for questions and multi choices

function renderCurrentQuestion(){
    containerEl.innerHTML='';
    var currentQuestion=questionArray[currentQuestionIndex];
    var header=document.createElement('h2');
    header.innerText=currentQuestion.question[currentQuestionIndex];
    containerEl.appendChild(header);
    
    for(var i=0; i<currentQuestion.options.length; i++){
        var liEL=document.createElement('li');
        liEL.textContent=currentQuestion.options[i];
        ulEl.appendChild(liEL);
    }
    // liEl.textContent='';
    containerEl.appendChild(ulEl);
}



startBtn.addEventListener('click',function(){
    renderCurrentQuestion();

    //timer fix timer
    timerInterval = setInterval(function(){
        timerEl.texContent=timer;
        timer--;  
        if(timer===0){
            clearInterval(timerInterval);
            containerEl.innerHTML='';
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

        }
        currentQuestionIndex++;
        renderCurrentQuestion();
    }
});