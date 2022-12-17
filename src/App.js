import React from 'react';
import GameBord from './GameBord';
import './App.css';


function App() {
  return (
      <div className="App">
          <div className={"title"}>Connect 4</div>
        <GameBord />
      </div>
  );
}

export default App;