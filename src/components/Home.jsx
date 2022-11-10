import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends Component {
  state = {
    search: '',
    products: [],
    categories: [],
    category: '',
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

  searchProducts = async () => {
    const { search, category } = this.state;
    const products = await getProductsFromCategoryAndQuery(category, search);
    this.setState(({
      products: products.results,
      search: '',
      category: '',
    }));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  filterCategory = async (category) => {
    this.setState({ category, search: '', }, () => {
      this.searchProducts();
    });
  };

  render() {
    const { search, products, categories } = this.state;
    return (
      <div className="App">
        {
          categories.map((category) => (
            <label
              htmlFor="categoryRadioButton"
              key={ category.id }
              data-testid="category"
            >
              <input
                type="radio"
                name="button"
                id="categoryRadioButton"
                onClick={ () => this.filterCategory(category.id) }
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
