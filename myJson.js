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
  forFetch(proQuestions);
})




