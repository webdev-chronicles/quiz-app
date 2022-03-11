const myurl = "https://opentdb.com/api.php?amount=10&type=multiple&encode=base64";

fetch(myurl)
.then(response => response.json())
.then(data => {
  const questions = data.results;
  let qst = [];
  questions.map(element => {
    const individualQuestions = new Object();
    let encodedQuestion = element.question;
    let encodedCorrectAnswer = element.correct_answer;
    let encodedIncorrectAnswers = element.incorrect_answers;
    let decodedIncorrectAnswers = encodedIncorrectAnswers.map(element => atob(element));
    
    individualQuestions.question = atob(encodedQuestion);
    individualQuestions.answer = {};
    individualQuestions.answer.rightAnswer = atob(encodedCorrectAnswer);
    individualQuestions.answer.wrongAnswers = decodedIncorrectAnswers
    qst.push(individualQuestions);
  })
  let proQuestions = {
    options: qst
  }
  
  "use strict";

  const wrapper = document.getElementById('whole-section');
  const userScore = document.querySelector('.score');
  const answersWrapper = document.querySelector('.four-answers');
  const theQuestion = document.querySelector('.the-question');
  const rightAnswer = document.querySelector('.the-right-answer');
  const indAnswer = document.querySelectorAll('.ind-answer');
  const instructions = document.querySelector('.instructions');
  
  const controlsWrapper = document.querySelector('.controls');
  const controlStart = document.querySelector('.start');
  const controlNext = document.querySelector('.next');
  const finishGame = document.querySelector('.finish-game');
  
  const postGame = document.querySelector('#post-game');
  const postGameTitle = document.querySelector('#post-game-title');
  const ultimateScore = document.querySelector('#ultimate-score');
  const knowledgeLevel = document.querySelector('#knowledge-level');
  const controlNewR = document.querySelector('.new-round');
  
  let initialScore = 0;
  let limit = 0;
  
  let quizQuestions = proQuestions;
  let questionsList = quizQuestions.options;
  let backupQuestions = new Array();
  
  userScore.textContent = `Your Current Score is ${initialScore}`;
  
  function randomIndex(element){
      return Math.floor(Math.random() * element.length);
  }
  
  
  function addInfo(){
      let selectedIndex = randomIndex(questionsList);
      let selectedQuestion = questionsList[selectedIndex];
      let currentQuestion = selectedQuestion.question;
      let rightAnswer = selectedQuestion.answer.rightAnswer;
      let wrongAnswers = selectedQuestion.answer.wrongAnswers;
      let localAnswers = Array.from(indAnswer);
  
      theQuestion.textContent = currentQuestion;
  
      for (let answer of wrongAnswers){
          let thisRandomIndex = randomIndex(localAnswers);
          let answerIndex = localAnswers[thisRandomIndex];
          answerIndex.textContent = answer;
          localAnswers = localAnswers.filter(element => element !== answerIndex);
      }
      
      localAnswers[0].textContent = rightAnswer;
      backupQuestions.unshift(selectedQuestion);
      questionsList = questionsList.filter(element => element !== selectedQuestion);
  }
  
  function addScore(e){
      if (e.target.outerText === backupQuestions[0].answer.rightAnswer){
          initialScore += 1;
          rightAnswer.textContent = "Your answer is correct!";
          rightAnswer.style.textDecorationColor = "green"
      } else{
          rightAnswer.textContent = "Your answer is wrong!";
          rightAnswer.style.textDecorationColor = "red"
      }
      userScore.textContent = `Your Current Score is ${initialScore}`;
  }
  
  function hideSibling(e){
      let children = Array.from(indAnswer);
      let theTarget = e.target;
      for (let child of children){
          if(child !== theTarget){
              child.style.display = "none";
          }
      }
      theTarget.style.pointerEvents = "none"
      controlNext.style.display = "inline-block";
      
  }
  
  function startGame(){
      instructions.style.display = "none";
      userScore.style.display = "block";
      let answers = Array.from(indAnswer);
      answers.forEach(element => element.style.display = "block");
      addInfo();
      controlStart.style.display = "none";
  }
  
  function continueGame(e){
      addScore(e);
      hideSibling(e);
  }
  
  
  function finish(){
      
      if (limit === 5){
          wrapper.style.display = 'none';
          postGame.style.display = 'block';
      }
      ultimateScore.textContent = `Your final score is: ${initialScore}`;
      
      if (initialScore <= 2){
          knowledgeLevel.textContent = "Your knowledge level is: Low";
      } else if (initialScore === 3){
          knowledgeLevel.textContent = "Your knowledge level is: Medium";
      } else {
          knowledgeLevel.textContent = "Your knowledge level is: Good";
      }
      
  
  }
  function followUp(){
      ++limit;
      let children = Array.from(indAnswer);
      children.forEach(element => {
        element.style.display = "block";
        element.style.pointerEvents = "auto";
      });
      controlNext.style.display = "none";
      rightAnswer.textContent = "";
      addInfo();
  
      limit === 4 ? controlNext.textContent = "Finish Quiz": 0;
  
      
      if (limit === 5){
          answersWrapper.style.display = "none";
          controlNext.style.display = "none";
          finishGame.style.display = "inline-block";
          userScore.style.display = "none";
          theQuestion.style.display = "none";
      }
  }
      
  controlStart.addEventListener('click', startGame);
  answersWrapper.addEventListener('click', continueGame);
  controlNext.addEventListener('click', followUp);
  finishGame.addEventListener('click', finish);
  controlNewR.addEventListener('click', () => location.reload());
  
})




