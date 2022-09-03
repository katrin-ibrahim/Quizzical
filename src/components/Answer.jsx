import React from 'react'
import he from 'he'

export default function Answer(props) {
    const styles = {
        backgroundColor: props.isClicked? "#D6DBF5" : "white",
        border: props.isClicked? "none" : ""
    }

    //   key={ans.id}
    // text={ans.text}
    // isClicked={ans.isClicked}
    // handleClick={() => selectAnswer(ans.id)}

  return (
    <button 
        className='answer' 
        onClick={props.selectAnswer}
        style={styles}
    >
            {he.decode(props.text)}
    </button>
  )
}
