import logo from './logo.svg';
import './App.css';
import MainApp from './components/MainApp';
import { createGlobalStyle } from 'styled-components';

function App() {
  const palette = {
    primary: `#2C2E43`,
    secondary: `#595260`,
    sub1: `#B2B1B9`,
    sub2: `#FFD523`
  }
  const GlobalStyle = createGlobalStyle`
    body {
      background-color: #2C2E43;
      color: white;
    }
  `
  return (
    <div className="App">
      <GlobalStyle />
      <MainApp palette={palette}/>
    </div>
  );
}

export default App;
