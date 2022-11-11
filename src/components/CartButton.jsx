import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartButton extends Component {
  render() {
    const { handleClick } = this.props;

    let cartItems = localStorage.getItem('cart');
    if (!cartItems) cartItems = '[]';
    cartItems = JSON.parse(cartItems);
    localStorage.setItem('numberOfItems', cartItems.length);

    return (
      <div>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="shopping-cart-button"
        >
          Carrinho
        </button>
        <span data-testid="shopping-cart-size">{ cartItems.length }</span>
      </div>
    );
  }
}

CartButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CartButton;
