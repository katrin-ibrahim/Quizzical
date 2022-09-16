import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'


export default function Quiz() {
    const [quizData,setQuizData] = useState([])
    const [isShowAnswers, setIsShowAnswers] = useState(false);
    const [resetQuiz, setResetQuiz] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

      let apiLink = `https://opentdb.com/api.php?amount=5&difficulty=easy`;

      fetch(apiLink)
          .then(res => res.json())
          .then(data => {
              setQuizData(() => {
                  return data.results.map(question => {
                      
                      const incorrect = question.incorrect_answers.map(answer => {
                          return {value: answer, id: nanoid(), isClicked: false, isCorrect: false};
                      });
                      
                      const correct = {value: question.correct_answer, id: nanoid(), isClicked: false, isCorrect: true};
                      
                      let allAnswersArr = [...incorrect];
                      const randomNum = Math.floor(Math.random() * 4);
                      allAnswersArr.splice(randomNum, 0, correct);

                      /* T/F AnswersArr logic */
                      if(question.type === 'boolean') {
                          if(correct.value === 'True') {
                              allAnswersArr = [correct, incorrect[0]];
                          } else {
                              allAnswersArr = [incorrect[0], correct];
                          }    
                      }
                      
                      return {...question, allAnswers: allAnswersArr, id: nanoid()}; 
                  });
              });
          })
          .catch(error => console.log(error))
          .finally(() => setIsLoading(false));
  }, [resetQuiz]);


  function updateClicked(qID, aID) {
    setQuizData(prevQuizData => {
        return prevQuizData.map( question => {
            if(qID !== question.id ){
                return question;
            } else {
                const newAnswers = question.allAnswers.map(answer => {

                    return answer.id === aID 
                        ? {...answer, isClicked: !answer.isClicked}
                        : {...answer, isClicked: false};
                });
                
                return {...question, allAnswers: newAnswers};
            }
        });
    });
}

function checkAnswers() {
  setIsShowAnswers(true);
}

let score = 0;

if(isShowAnswers){
  quizData.map((question) => {
      return question.allAnswers.forEach(answer => {
          return answer.isHeld && answer.isCorrect ? score++ : score;
      });
  });
}


    const questionElements = quizData.map((question, index) => {
        
      return (
          <Question
              key = {nanoid()}
              question = {question.question}
              allAnswers = {question.allAnswers}
              qID = {question.id}
              type = {question.type}
              updateHeld = {updateClicked}
              questionIndex = {index}
              isShowAnswers = {isShowAnswers}
          />
      );
  });

    

  return (
  <>
  {questionElements}
  <button className='start-button' onClick={checkAnswers}>Check Answers</button>
  </>
         
  )
}
