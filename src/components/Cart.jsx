import React, { Component } from 'react';

class Cart extends Component {
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
      </div>
    );
  }
}

export default Cart;
