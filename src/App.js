import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import Product from './components/Product';
import Checkout from './components/Checkout';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ Product } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default App;
