import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    search: '',
    products: [],
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState(({
      search: value,
    }));
  };

  searchProducts = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    const products = await getProductsFromCategoryAndQuery(null, search);
    this.setState(({
      products: products.results,
      search: '',
    }));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { search, products, categories } = this.state;
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
        <input
          type="text"
          value={ search }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          type="button"
          onClick={ this.searchProducts }
          data-testid="query-button"
        >
          Pesquisar
        </button>

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
        {
          products.length > 0 ? products.map(({ title, price, thumbnail, id }) => (
            <div data-testid="product" key={ id }>
              <h3>{ title }</h3>
              <img src={ thumbnail } alt={ title } />
              <p>{ price }</p>
            </div>
          ))
            : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Home;
