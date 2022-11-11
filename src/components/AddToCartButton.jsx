import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddToCartButton extends Component {
  render() {
    const { productAddToCart, dataTestId } = this.props;

    return (
      <button
        data-testid={ dataTestId }
        type="button"
        onClick={ productAddToCart }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

AddToCartButton.propTypes = {
  productAddToCart: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default AddToCartButton;
