import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    return (
      <div className="App">
        <input type="text" />
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        >
          Carrinho
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

Home.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Home;
