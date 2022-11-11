import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    let items = [];
    const getItems = localStorage.getItem('cart');
    if (getItems) items = getItems && JSON.parse(getItems);

    return (
      <div>
        {
          items.length > 0
            ? items.map(({ title, price, id }) => (
              <div key={ id }>
                <h3 data-testid="shopping-cart-product-name">{ title }</h3>
                <h4>{ price }</h4>
              </div>
            ))
            : <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        }
        <p data-testid="shopping-cart-product-quantity">{ items.length }</p>
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleClick }
        >
          Checkout
        </button>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Cart;
