import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <input type="text" />
      <h3
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
    </div>
  );
}

export default App;
