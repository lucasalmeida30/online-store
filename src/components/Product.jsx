import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class Product extends Component {
  state = {
    product: [],
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getProductById(id);
    this.setState({
      product: data,
      loading: true,
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  render() {
    const { product, loading } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img
          src={ product.thumbnail }
          alt=""
          data-testid="product-detail-image"
        />
        <h5 data-testid="product-detail-price">{ product.price }</h5>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="shopping-cart-button"
        >
          Carrinho
        </button>
        { loading && product.attributes.map((atribute) => (
          <p key={ atribute.id }>{ `${atribute.name}: ${atribute.value_name}` }</p>
        )) }
      </div>
    );
  }
}

Product.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Product;
