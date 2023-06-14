import logo from './logo.svg';
import './App.css';

import Score from './components/score';
import Boardcomponent from './components/board';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          CANDY CRUSH
        </a>
        <Boardcomponent rows={9} columns={5} colors= {['Red','Blue','Green','yellow','Orange','Purple']}/>
        <Score />
      </header>
    </div>
  );
}

export default App;
        // "@babel/plugin-proposal-private-property-in-object": "",
