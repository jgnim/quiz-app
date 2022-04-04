import useSWR from "swr";
import styled from "styled-components";
import parse from 'html-react-parser';
import { useState } from "react";
import Loader from "../../utils/Loader";

const Game = ({url, setPlay}) =>{  
  const fetcher = (...args) => fetch(...args).then(res => res.json()) 
  const {data} = useSWR(url, fetcher, {revalidateOnFocus: false, revalidateOnReconnect: false})
  const [correct, setCorrect] = useState(0)
  const [currentIndex, setIndex] = useState(0)

  const userSelect = (e) => {
    if (e.target.value == data.results[`${currentIndex}`].correct_answer) {
      setCorrect(prev=>prev+1)
    }
    setIndex(prev=>prev+1)
  }

  const GetQuestion = () => {
    let question = data.results[`${currentIndex}`].incorrect_answers.concat(data.results[`${currentIndex}`].correct_answer).sort()
    return (
      <Answers>
        {question.map((value,index)=>{
          return (
            <div key={index*2+2}>
              <button value={value} onClick={userSelect}>
                {parse(value)}
              </button>
            </div>
          )
        })}
      </Answers>
    )
  }
  const reset = () => {
    setPlay(false)
    setCorrect(0)
    setIndex(0)
  }
  if (!data) {
    return (<Loader/>)
  }
  else if (data?.response_code !== 0) {
    return (
      <div>
        <div>
          The parameters you have entered is invalid. This happens when there is not enough questions for your query. <br/>          
        </div>
        <button onClick={reset} style={{marginTop: '10px', fontSize: '1.4em', padding: '5px', borderRadius: '10px'}}>
          Play Again
        </button>
      </div>
    )
  }
  else if (currentIndex <= data?.results.length-1) {
    const y = `Schindler&#039;s List`
    return (      
      <div>        
        <div style={{fontSize: '2em'}}>
          Question {currentIndex+1} of {data.results.length}
        </div>
        <Question>
          {parse(data.results[`${currentIndex}`].question)}
        </Question>
        <div style={{marginTop: '15px'}}>
          Please choose one of the following answers:
        </div>
        <div>
          <GetQuestion />
        </div>
      </div>
    )
  }
  else if (currentIndex > data?.results.length-1) {
    return (
      <div>        
        <div style={{fontSize: '2em'}}>
          You got {correct} out of {data.results.length} correct!
        </div>
        <button onClick={reset} style={{marginTop: '10px', fontSize: '1.4em', padding: '5px', borderRadius: '10px'}}>
          Play Again
        </button>
      </div>
    )
  }  
}

export default Game

const Question = styled.div`
  font-size: 1.1em;
  text-align: left;
  margin-top: 20px;
  margin-left: 10px;
  min-height: 60px;
  border: grey solid 2px;
  border-radius: 10px;
  padding: 10px;

`
const Answers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;  
  margin-top: 15px;
  gap: 5px;
  button{
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    &:hover{
      cursor: pointer;
    }
  }  
  @media (max-width: 550px){
    display: flex;
    flex-direction: column;
  }
`