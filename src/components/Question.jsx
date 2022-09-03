import React from 'react'
import he from 'he'
import { useState } from 'react'
import Answer from './Answer'

export default function Question(props) {
    const {question , incorrectAnswers , correctAnswer} = props
    const [answersObj,setAnswersObj] = useState(getAllAnswers())



    function getAllAnswers(){
        const answersObj = []
        for(let i = 0 ; i< incorrectAnswers.length; i++){
            answersObj.push({text: incorrectAnswers[i], id:i, correct:false, isClicked: false})
        }
        answersObj.push({"text": correctAnswer, "id":answersObj.length, "correct":true , isClicked: false})
        answersObj.sort(() => Math.random() - 0.5)
        console.log('data',answersObj)
        return answersObj

    }
    


    const answers = answersObj.map(ans =>
        <Answer
        key={ans.id}
        text={ans.text}
        isCorrect={ans.isCorrect}
        isClicked={ans.isClicked}
        selectAnswer={() => selectAnswer(ans.id)}
         />)
  
   

   function selectAnswer(id){
    setAnswersObj(prevAnswers => prevAnswers.map(ans =>{
        if (ans.id != id ){
            if(ans.isClicked)
             return {...ans, isClicked: !ans.isClicked}
            else{
             return ans
            }

        }else{
            return {...ans, isClicked: !ans.isClicked}
        }
     } ))
   }

    
  return (
    <div className='question-container'>
        <span>{he.decode(question)}</span>
        <div className='answer-container'>
            {answers}
        </div>
        <div className='line-break'></div>
    </div>
  )
}
