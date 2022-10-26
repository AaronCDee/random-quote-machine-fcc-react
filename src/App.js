import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ImQuotesLeft } from 'react-icons/im';
import { FaTwitterSquare } from "react-icons/fa";
/*
- only thing changing in the quotes app is the color and the quote
- App will be the standard thing, componentDidMount async to call up the api data
- I don't really know how to change the color of the css with this react thing
*/
const randomColor = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];
const iconStyle = {
  fontSize: 30
}
const quotesUri = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      quotesArrived: false,
      quotes: [],
      currentQuote: 'Quotes Loading...',
      currentAuthor: 'Author Loading...',
      currentColor: '',
      visible: false
    };
    this.generateQuote = this.generateQuote.bind(this);
  }

  async componentDidMount(){
    let quotesRequest = await fetch(quotesUri);
    let quotesData = await quotesRequest.json();
    let quotes = quotesData.quotes;
    console.log(quotes);
    this.setState({
      quotes: quotes,
      quotesArrived: true,
    });
    this.generateQuote();
  }
  generateQuote(){
    console.log(this.state.quotes);
    if(!this.state.quotesArrived){
      return;
    }else{
      this.setState({
        visible: false
      });
        let randomQuoteInd = Math.floor(Math.random()*this.state.quotes.length);
        console.log(randomQuoteInd);
        let currentQuoteData = this.state.quotes[randomQuoteInd];
        console.log(currentQuoteData);
        let randomColorInd = Math.floor(Math.random()*randomColor.length);
        setTimeout(() => {this.setState({
          visible:true,
          currentQuote: currentQuoteData.quote,
          currentAuthor: currentQuoteData.author,
          currentColor: randomColor[randomColorInd],
        })}, 500);
    } 
  }
  render(){
    let quoteForTwitter = `${this.state.currentQuote}\n-${this.state.currentAuthor}`
    let twitterHref = `https://twitter.com/intent/tweet?hashtags=RandomQuotes&related=freecodecamp&text=${encodeURIComponent(quoteForTwitter)}`;
    document.body.style.backgroundColor = this.state.currentColor;
    document.body.style.transition = 'background-color 1s ease';

    return(
        <div id='quote-box' className='quote-card' style={{color: this.state.currentColor}}>
          <div id='quote-container' className={this.state.visible? 'fade-in': 'fade-out'}>
            <p id='text'><ImQuotesLeft/> {this.state.currentQuote}</p>
            <p id='author'>- {this.state.currentAuthor}</p>
          </div>
          <div className='quote-buttons'>
            <div className='social-buttons'>
                <a id='tweet-quote' href={twitterHref} target='_blank' style={{color : this.state.currentColor}}><FaTwitterSquare style={iconStyle}/></a>
            </div>
            <button id='new-quote' onClick={this.generateQuote} style={{backgroundColor: this.state.currentColor}} className='button-styling'>
              New Quote
            </button>
          </div>
        </div>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
    
//   );
// }
// App 
const HelloWorld = () => {
  return(<div><h1>Hello World</h1></div>);
}
export default App;
export {HelloWorld};

