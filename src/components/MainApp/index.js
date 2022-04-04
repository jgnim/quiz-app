import { useEffect, useState } from "react"
import styled from "styled-components"
import Game from "../Game";

const MainApp = ({palette}) => {
  const [category, setCategory] = useState('any');
  const [difficulty, setDifficulty] = useState('medium');
  const [quantity, setQuantity] = useState(10);
  const [type, setType] = useState('multiple');
  const [url, setUrl] = useState(`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=${type}`);
  const [play, setPlay] = useState(false);
  const trivia_categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]
  trivia_categories.sort((a,b)=>{
    if (a.name < b.name){
      return -1
    }
    else return 1    
  })
  useEffect(()=>{
    if (category != `any`){
      let categoryId = trivia_categories.find((value)=>{
        return value.name==category
      })
      setUrl(`https://opentdb.com/api.php?amount=${quantity}&category=${categoryId.id}&difficulty=${difficulty}&type=${type}`) 
    }
    else {
      setUrl(`https://opentdb.com/api.php?amount=${quantity}&difficulty=${difficulty}&type=${type}`)  
    }
  },[category,difficulty,quantity,type])
 const handleSubmit = (e) => {
  e.preventDefault()
  setPlay(true)
 }

 if (play == false) {
  return (
    <Container palette={palette}>
      <div style={{fontSize: '2em'}}>
        The Ultimate Trivia Quiz
      </div>
      <Form palette={palette}>
        <form onSubmit={handleSubmit}>
          <label id="category">        
            Select a category    
            <select defaultValue={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value={`any`} key={'99'}>
                Any Category
              </option>
              {trivia_categories.map((value)=>{
                return (
                  <option value={value.name} key={value.id}>{value.name}</option>
                )
              })}
            </select>
          </label>
          <label id="quantity">
            How many questions?
            <input type="number" min="5" max="20" value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
          </label>
          <label id="difficulty">
            Select a difficulty
            <select defaultValue={difficulty} onChange={(e)=>setDifficulty(e.target.value.toLocaleLowerCase())}>
              <option value="easy">
                Easy
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="hard">
                Hard
              </option>
            </select>
          </label>
          <label id="type">
            Select the type of question
            <select defaultValue={type} onChange={(e)=>setType(e.target.value)}>
              <option value="multiple">
                Multiple Choice
              </option>
              <option value="boolean">
                True / False
              </option>
            </select>
          </label>
          <button type="submit" onSubmit={handleSubmit}>
            Play
          </button>
        </form>
      </Form>
    </Container>
  )
 }
 else {
   return (
    <Container>
      <Game load={play} url={url} setPlay={setPlay}/>
    </Container>
   )
 }
}

export default MainApp

const Container = styled.div`
  width: 80vmin;
  margin: auto;
  margin-top: 20px;
  @media (max-width: 550px) {
    width: 100%;
  }
`
const Form = styled.div`
  form {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;    
    gap: 10px;    
  }   
  label {
    text-align: left;
    line-height: 150%;
  } 
  select, input, button {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    text-indent: 10px;
    border-radius: 10px;
  }  
  button {
    background-color: ${props => props.palette?.sub2};
    font-size: 1.5em;
    &:hover{
      cursor: pointer;
    }
  }
`

