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
let startBtn=document.querySelector('.startButton');
let containerEl=document.querySelector('#container');
let timerEl=document.querySelector('#timer');
let ulEl=document.querySelector('.mutliChoiceBtn');
let scoreEl=document.querySelector('#score');
let highscoreEl=document.querySelector('#highscore');

let timer=15;
let currentQuestionIndex=0;
let score=0;
var timerInterval;
let submitEl;
let resetEl;

renderHighScore();
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

function renderHighScore(){
    let initialsValue=localStorage.getItem("Initials");
    let scoreValue=localStorage.getItem("Score");
    if (!initialsValue||!scoreValue){
        return;
    }
}

//input name/initials and scores into local storage function?
function highScoreGameoverTag(){
    let formEl=containerEl.appendChild(document.createElement("form"));
    formEl.appendChild(document.createElement("label")).textContent="Initials:";
    formEl.appendChild(document.createElement("input")).setAttribute("type","text");
    //need to fix something here to get localstorage to work?????
    let initialsValue=document.querySelector("input").value;
    let btnContainerEl=containerEl.appendChild(document.createElement("div"));
    submitEl=btnContainerEl.appendChild(document.createElement("button"));
    submitEl.textContent="Submit";
    //"submit score into highscores" button
    submitEl.addEventListener('click',function (){
        localStorage.setItem("Initials",initialsValue);
        localStorage.setItem("score",score);
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
        timer=0;
        highScoreGameoverTag();
    }else{
        scoreDisplay.textContent = ("Your final score is " + score + "!");//input score in to p element
        timer=0;
        highScoreGameoverTag();
    }
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
            ('right');//create an element to input
            //increase score
            score+=10;
            scoreEl.textContent=score;
            //modify timer
            timer+=3;
        }
        //user answer is wrong
        else{
            ('wrong');//create an element to input
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

//create high score page or form and sort high score
highscoreEl.addEventListener('click',function(){
    ;

});



//sort with bubble sort or merge sort or log(n) or log(e) look into sort algo