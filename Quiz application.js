/*var currentQuestion = 0
      var maxPosition = 9;
      updateContent();
      
         }
      });
      function updateContent(){
         // update UI or make API call here
         var content = document.getElementById("content");
         content.innerHTML = "Current Position: " + currentPosition + "<br> <br>" ;
      }*/

var now= new Date().getTime();
var countDownDate = new Date('Apr 10, 2024 20:00:00').getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("time-left").innerHTML = minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    alert("Time out");
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    document.getElementById("previous").style.display = 'none';
    document.getElementById("time").style.display='none';
    document.getElementById("time-left").style.display='none';
    document.getElementById("retry").style.display='none';
    document.getElementById("done").style.display='inline-block';
    
  }
}, 1000);
const quizData = [
    {
      question: '1. Nigeria name was coined by____',
      options: ['Queen Amina', 'Mary Slessor', 'Flora Shaw', 'Mark Macpherson'],
      answer: 'Flora Shaw',
    },
    {
      question: '2.	Kakanfo Afonja rebelled against the Alafin in___',
      options: ['1818', '1817', '1826', '1820'],
      answer: '1817',
    },
    {
      question: '3.	The fall of Oyo Empire led to the formation of the following states EXCEPT',
      options: ['Ibadan', 'Illorin', 'New Oyo', 'Ijebu'],
      answer: 'Illorin',
    },
    {
      question: '4.	The first recorded contact between West Africa and the European traders was in',
      options: ['18th century', '15th century', '19th century', '20th century'],
      answer: '15th century',
    },
    {
      question: '5.	The British government declared the slave trade illegal  in',
      options: [
        '1888',
        '1807',
        '1812',
        '1889',
      ],
      answer: '1807',
    },
    {
      question: '6. One of the following is not among the principal actor in the colonization of Nigeria',
      options: ['The Christian Missionaries', 'British Traders', 'British government', 'Elites'],
      answer: 'Elites',
    },
    {
      question: '7. Who painted the Mona Lisa?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: '8. Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
      answer: 'Mars',
    },
    {
      question: '9. What is the largest species of shark?',
      options: [
        'Great White Shark',
        'Whale Shark',
        'Tiger Shark',
        'Hammerhead Shark',
      ],
      answer: 'Whale Shark',
    },
    {
      question: '10. Which animal is known as the King of the Jungle?',
      options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
      answer: 'Lion',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const previousButton = document.getElementById('previous');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  //quizData.sort(() => Math.random() - 0.5);
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      selectedOption.checked = false;
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    document.getElementById("previous").style.display = 'none';
    document.getElementById("time").style.display='none';
    document.getElementById("time-left").style.display='none';
    document.getElementById("done").style.display='inline-block';
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    previousButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    document.getElementById("done").style.display='inline-block'
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  //function previous(){
    //  return(quizData[currentQuestion--]);
   //   return(questionData);
 // }

  submitButton.addEventListener('click', checkAnswer);
  previousButton.addEventListener('click', previous)
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();

  //The react importation
  //import { mergeClasses } from "@material-ui/styles";
//import React, { useState } from "react";
/* import SimpleCard from "./SimpleCard"; */


/*function Example({ ...props }) {
  const [selected, setSelected] = useState(0);
  const handleAssigneeNextOnClick = (e) => {
    setSelected((prev) => {
      if (prev === quizData.length - 1) {
        return 0;
      } else {
        return (prev + 1) % quizData.length;
      }
    });
    e.preventDefault();
  };
  const handleAssigneePreviousOnClick = () => {
    setSelected((prev) => {
      if (prev === 0) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  };
  return (
    <div>
      <p style={{ color: "red" }}>
        {quizData[selected].question} {quizData[selected].options}
      </p>
      <div style={{ padding: "2rem" }}>
        <button onClick={handleAssigneePreviousOnClick}>...previous</button>{" "}
        <button onClick={handleAssigneeNextOnClick}>next...</button>
      </div>
    </div>
  );
}

export default Example;*/