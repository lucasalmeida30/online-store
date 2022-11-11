import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    console.log(products);
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
    this.setState({ category, search: '' }, () => {
      this.searchProducts();
    });
  };

  productAddToCart = (idProduct) => {
    const { products } = this.state;
    const product = products.find(({ id }) => id === idProduct);
    const itemsLocalStotage = localStorage.getItem('cart');
    const objectItems = itemsLocalStotage && JSON.parse(itemsLocalStotage);
    if (objectItems) {
      objectItems.push(product);
      localStorage.setItem('cart', JSON.stringify(objectItems));
    } else localStorage.setItem('cart', JSON.stringify([product]));
  };

  render() {
    const { search, products, categories } = this.state;
    return (
      <div className="App">
        {
          categories.map((category) => (
            <label
              htmlFor={ `${category.name}-radio-button` }
              key={ category.id }
              data-testid="category"
            >
              <input
                type="radio"
                name="category-radio-button"
                id={ `${category.name}-radio-button` }
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
          products.length > 0
            ? products.map(({ title, price, thumbnail, id, shipping }) => (
              <div key={ id }>
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${id}` }
                >
                  <div
                    data-testid="product"
                  >
                    <h3>{ title }</h3>
                    <img src={ thumbnail } alt={ title } />
                    <p>{ price }</p>
                    <p>{ id }</p>
                  </div>
                </Link>
                <div>
                  {
                    shipping.free_shipping && (
                      <p
                        data-testid="free-shipping"
                      >
                        Frete Grátis
                      </p>)
                  }
                </div>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => this.productAddToCart(id) }
                >
                  Adicionar ao carrinho
                </button>
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
