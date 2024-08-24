const questions = [
    {
        question:"Which of the following is the correct syntax to declare an array of integers in C?",
        options: [
            {text: "1. array int[10];", correct : false},
            {text: "2. int arr[10];",correct : true},
            {text: "3. int[10] arr;", correct : false},
            {text: "4. int arr;", correct : false}
        ]
    },
    {
        question:"Which of the following operators is used for logical AND in C?",
        options: [
            {text: "1. &", correct : false},
            {text: "2. ||",correct : false},
            {text: "3. &&", correct : true},
            {text: "4. ==", correct : false}
        ]
    },
    {
        question:"Which of the following is a valid declaration of a pointer?",
        options: [
            {text: "1. int *ptr;", correct : true},
            {text: "2. int ptr;",correct : false},
            {text: "3. int &ptr;", correct : false},
            {text: "4. int ptr[];", correct : false}
        ]
    },
    {
        question:"Which of the following symbols is used to represent the address-of operator in C?",
        options: [
            {text: "1. *", correct : false},
            {text: "2. &",correct : true},
            {text: "3. %", correct : false},
            {text: "4. @", correct : false}
        ]
    },
]

let questionElement = document.querySelector("#ques");
let answerButton = document.querySelector("#options");
const next = document.querySelector("#next");

let currentQuesIndex = 0;
let score = 0;

function timer(){    

    window.onload = function () {
        let timer = 60;// 1 minute in seconds
        let minutes , seconds;
        const display = document.getElementById('timer');
    
        const interval = setInterval(() => { //setinterval is usded to execute the func again and again.
            minutes = Math.floor(timer / 60);
            seconds = timer % 60;
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                clearInterval(interval);  // Stop the timer when it reaches 0
                display.textContent="Time Up!!";
            }
        }, 1000);
    };
    
       
    }

function startQuiz(){
   
    currentQuesIndex=0;
    score=0;
    next.innerHTML="NEXT";
    showQuestion();
}

function showQuestion(){
    resetQuiz();
    let currentQues = questions[currentQuesIndex];
    let questNo = currentQuesIndex + 1;
    questionElement.innerHTML = "Question" + questNo + ": " + currentQues.question;

    currentQues.options.forEach(answer=>{
        const btn=document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("op");
        answerButton.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct=answer.correct;
        }
        btn.addEventListener('click',selectAnswer)

        
    });
}

function resetQuiz(){
    // next.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(btn=>{
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled=true;
    });
    next.style.display="blocked";
}

function showScore(){
    resetQuiz();
    questionElement.innerHTML=`You Scored ${score} Out of ${questions.length}`;
    questionElement.style="font-size:45px ; text-decoration:underline ; color:rgb(5, 13, 73)";
    next.innerHTML="PLAY AGAIN";
    next.style.display="blocked";

}

function handleNext(){
    currentQuesIndex++;
    if(currentQuesIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

next.addEventListener("click",()=>{
    if(currentQuesIndex<questions.length){
        handleNext();
    }else{
        location.reload();
        timer();
        startQuiz();
    }
})

timer();
startQuiz();


// let ans=document.querySelectorAll('.op');
// let result=" ";

// Array.from(ans).forEach((elm)=>{
//     elm.addEventListener('click',(e)=>{
//         result=(e.target.innerHTML);
//         console.log(result);
//         if(result=='BLUE'){
//             console.log("right answer");
//         }else{
//             console.log("wrong answer");
//         }
//     })    
// })

