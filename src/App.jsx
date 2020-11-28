import React, { Component } from 'react';
import DisplayMenu from './components/DisplayMenu';
import { Header, Container } from 'semantic-ui-react';
import Login from './components/Login'
import axios from 'axios'


class App extends Component {
  state = {
    authenticated: false,
    message: null,
    order: {},
    orderItemsCount: null
  }

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated })
  }

  async addToOrder(e) {
    let productID = parseInt(e.target.dataset.product)
    let headers = JSON.parse(localStorage.getItem('credentials'))
    let response
    if (this.state.order.hasOwnProperty("id")) {
      response = await axios.put(`http://localhost:3000/api/orders/${this.state.order.id}`,
      { product_id: productID },
      { headers: headers }
    )
    } else {
      response = await axios.post('http://localhost:3000/api/orders',
      { product_id: productID },
      { headers: headers }
      )}
    this.setState({ message: response.data.message })
    let count = response.data.order.items.length
    this.setState({orderItemsCount: count, order: response.data.order})
  }

  render() {
    return (
      <>
        <Header as='h1' textAlign="center">
          Moody Foody
      </Header>
        <Header as='h2' textAlign="center">
          Run by Hungry Tigers
      </Header>
        <Container>
          <Login toggleAuthenticatedState={() => this.toggleAuthenticatedState()} />
          {this.state.message && <h2 data-cy="message">{this.state.message}</h2>}
          {this.state.orderItemsCount && <h2 data-cy="item-count">You have {this.state.orderItemsCount} items in your order</h2>}
          <DisplayMenu addToOrder={(e) => this.addToOrder(e)} />
        </Container>
      </>
    )
  }
}

export default App