import React from 'react'
import Question from './Question'


export default function QuestionList (props) {
    const questionElements = props.data.map(data =>  
    <Question 
        question={data.question} 
        correctAnswer={data.correct_answer} 
        incorrectAnswers={data.incorrect_answers}
    />
    )

  return (
  <>
  {questionElements}
  </>
         
   
  )
}
