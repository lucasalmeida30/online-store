import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Checkout extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    inputCpf: '',
    inputPhone: '',
    inputCep: '',
    inputAddress: '',
    inputValidation: false,
    clickValidation: false,
    button: false,
  };

  verifyLetters = ({ target }) => {
    const { value, name } = target;
    if (name === 'pay') {
      this.setState({
        button: true,
      });
    } else {
      this.setState(({
        [name]: value,
      }));
    }
  };

  verifyCheckout = () => {
    const {
      inputName,
      inputEmail,
      inputCpf,
      inputPhone,
      inputCep,
      inputAddress,
      button,
    } = this.state;

    const validation = inputName
    && inputEmail
    && inputCpf
    && inputPhone
    && inputPhone
    && inputCep
    && inputAddress;

    this.setState({
      inputValidation: validation && button,
      clickValidation: true,
    });
  };

  render() {
    let items = [];
    const getItems = localStorage.getItem('cart');
    if (getItems) items = getItems && JSON.parse(getItems);
    const {
      inputName,
      inputEmail,
      inputCpf,
      inputPhone,
      inputCep,
      inputAddress,
      inputValidation,
      clickValidation,
    } = this.state;
    if (inputValidation) {
      localStorage.clear();
    }
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
        <form action="">
          <label htmlFor="userInfos">
            Informações do comprador
            <br />
            <input
              type="text"
              id=""
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              value={ inputName }
              name="inputName"
              onChange={ this.verifyLetters }
            />
            <input
              type="email"
              id=""
              data-testid="checkout-email"
              placeholder="Email"
              value={ inputEmail }
              name="inputEmail"
              onChange={ this.verifyLetters }
            />
            <input
              type="text"
              id=""
              data-testid="checkout-cpf"
              placeholder="CPF"
              value={ inputCpf }
              name="inputCpf"
              onChange={ this.verifyLetters }
            />
            <input
              type="text"
              id=""
              data-testid="checkout-phone"
              placeholder="Telefone"
              value={ inputPhone }
              name="inputPhone"
              onChange={ this.verifyLetters }
            />
            <input
              type="text"
              id=""
              data-testid="checkout-cep"
              placeholder="CEP"
              value={ inputCep }
              name="inputCep"
              onChange={ this.verifyLetters }
            />
            <input
              type="text"
              id=""
              data-testid="checkout-address"
              placeholder="Endereço"
              value={ inputAddress }
              name="inputAddress"
              onChange={ this.verifyLetters }
            />
            <input
              type="radio"
              name="pay"
              id=""
              data-testid="ticket-payment"
              onChange={ this.verifyLetters }
            />
            Boleto
            <input
              type="radio"
              name="pay"
              id=""
              data-testid="visa-payment"
              onChange={ this.verifyLetters }
            />
            Visa
            <input
              type="radio"
              name="pay"
              id=""
              data-testid="master-payment"
              onChange={ this.verifyLetters }
            />
            MasterCard
            <input
              type="radio"
              name="pay"
              id=""
              data-testid="elo-payment"
              onChange={ this.verifyLetters }
            />
            Elo
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.verifyCheckout }
            >
              Finalizar Compra
            </button>
          </label>
          {
            inputValidation && <Redirect to="/" />
          }
          {
            clickValidation && <p data-testid="error-msg">Campos inválidos</p>
          }
        </form>
      </div>
    );
  }
}
export default Checkout;
