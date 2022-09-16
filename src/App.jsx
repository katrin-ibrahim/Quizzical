import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'


function App() {
  const [isStarted,setIsStarted] = useState(false)
  const [rawQuizData,setRawQuizData] = useState({})



  function handleStart(){
    setIsStarted(true)
  }



  useEffect(() => {

      console.log("Fetching data")
      async function getQuizData(){
        const res = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=easy`)
        const data = await res.json()
        setRawQuizData(data)
        }
      getQuizData()  
      
  }, [])

  return (
    <div className="App">
      <img src="./top-blob.png" className='top-blob'/>

      {!isStarted && 
      <div className="centered">
        
        <h1 className='game-title'>Quizzical</h1>
        <span className='game-disc'>Answer the questions and test your knowledge!</span>
        <button className='start-button' onClick={handleStart}>Start quiz</button>
      </div>}

      {isStarted && 
      <div className='question-list'>
        <h1 className='game-title'>Quizzical</h1>
        <Quiz/>
      </div>
        }



     <img src="./bottom-blob.png" className='bottom-blob'/>
    </div>
  )
}

export default App
