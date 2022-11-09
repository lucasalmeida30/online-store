import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="App">
        {
          categories.map((category) => (
            <label
              htmlFor="categorieRadioButton"
              key={ category.id }
              data-testid="category"
            >
              <input
                type="radio"
                name="button"
                id="categorieRadioButton"
              />
              { category.name }
            </label>
          ))
        }
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
