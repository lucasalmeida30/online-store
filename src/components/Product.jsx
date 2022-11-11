import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import AddToCartButton from './AddToCartButton';
import CartButton from './CartButton';

class Product extends Component {
  state = {
    product: [],
    loading: false,
    numberOfItems: 0,
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

    const numberOfItems = localStorage.getItem('numberOfItems');
    if (numberOfItems) this.setState({ numberOfItems });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/cart');
  };

  addToCart = () => {
    const { product } = this.state;
    const cartItems = localStorage.getItem('cart');

    if (cartItems) {
      const cartItemsArray = JSON.parse(cartItems);
      cartItemsArray.push(product);
      localStorage.setItem('cart', JSON.stringify(cartItemsArray));
    } else localStorage.setItem('cart', JSON.stringify([product]));

    this.setState((prevState) => ({ numberOfItems: prevState.numberOfItems + 1 }));
  };

  render() {
    const { product, loading, numberOfItems } = this.state;

    return (
      <div>
        <h3 data-testid="product-detail-name">{ product.title }</h3>
        <img
          src={ product.thumbnail }
          alt=""
          data-testid="product-detail-image"
        />
        <h5 data-testid="product-detail-price">{ product.price }</h5>
        <AddToCartButton
          productAddToCart={ this.addToCart }
          dataTestId="product-detail-add-to-cart"
        />
        <CartButton
          key={ numberOfItems }
          handleClick={ this.handleClick }
        />
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
