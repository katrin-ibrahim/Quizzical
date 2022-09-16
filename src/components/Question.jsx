import React, { useEffect } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'

export default function Question(props) {
    const { allAnswers, qID, question, isShowAnswers, updateHeld} = props


  const answerButtons = allAnswers.map((answer, index) => {
    //Held Button Styles
    console.log(answer.isClicked)
    let styles = {
      backgroundColor: answer.isClicked? "#D6DBF5" : "white",
      border: answer.isClicked? "none" : ""
    };
    
    if(isShowAnswers) {
        
        if(answer.isClicked && answer.isCorrect){
            styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)' };

        } else if (answer.isClicked && answer.isCorrect === false) {
            styles = { backgroundColor: '#F8BCBC', opacity: '50%', border: 'none', color: 'var(--focused-btn-color)' };

        } else if (answer.isCorrect) {
            styles = { backgroundColor: '#94D7A2', color: 'var(--focused-btn-color)' };

        } else if (answer.isCorrect === false) {
            styles = { opacity: '50%' };
        }
    }

    return (
        <button key = {nanoid()} 
            onClick={() => updateHeld(qID, answer.id)}
            className = 'answer'
            style = {styles}
            // data-testid = {`button${index}`}
        >
            {he.decode(allAnswers[index].value)}
        </button>
    );
}); // end of answerButtonsJSX


            
  return (
    <div className='question-container'>
        <span>{he.decode(question)}</span>
        <div className='answer-container'>
          {answerButtons}
        </div>
        <div className='line-break'></div>
    </div>
  )
}
