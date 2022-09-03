import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import QuestionList from './components/QuestionList'


function App() {
  const [isStarted,setIsStarted] = useState(false)
  const [quizData,setQuizData] = useState({})



  function handleStart(){
    setIsStarted(true)
  }

  // useEffect(()=>{
  //   fetch('https://opentdb.com/api.php?amount=10')
  // },[])

  useEffect(() => {

      console.log("Effect ran")
      async function getQuizData(){
        const res = await fetch(`https://opentdb.com/api.php?amount=2`)
        const data = await res.json()
        setQuizData(data)
        console.log(data)
        }
      getQuizData()  
      console.log(quizData)
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
        {/* <pre>{JSON.stringify(quizData, null, 2)}</pre> */}
        <QuestionList data={quizData.results}/>
      </div>
        }



     <img src="./bottom-blob.png" className='bottom-blob'/>
    </div>
  )
}

export default App
