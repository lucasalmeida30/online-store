import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <input
          type="text"
          data-testid="query-input"
        />

        <button
          type="button"
          data-testid="query-button"
        >
          Pesquisar
        </button>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}

export default App;
