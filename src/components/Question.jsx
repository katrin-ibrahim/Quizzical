import React from 'react'
import he from 'he'

export default function Question(props) {
    const {question , incorrectAnswers , correctAnswer} = props
    
    const answers = incorrectAnswers.map(ans =><button className='answer'>{he.decode(ans)}</button>)

    
  return (
    <div className='question-container'>
        <span>{he.decode(question)}</span>
        <div className='answer-container'>
            {answers}
            <button className='answer'>{he.decode(correctAnswer)}</button>
        </div>
        <div className='line-break'></div>
    </div>
  )
}
