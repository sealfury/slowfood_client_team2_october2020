import React, { Component } from 'react';
import DisplayMenu from './components/DisplayMenu';
import { Header, Container } from 'semantic-ui-react';
import Login from './components/Login'
import axios from 'axios'


class App extends Component {
  state = {
    authenticated: false,
    message: null
  }

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated })
  }

  async addToOrder(e) {
    let productID = parseInt(e.target.dataset.product)
    let headers = JSON.parse(localStorage.getItem('credentials'))
    let response
    response = await axios.post('http://localhost:3000/api/orders',
      { product_id: productID },
      { headers: headers }
    )
    debugger
    this.setState({ message: response.data.message })
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
          <DisplayMenu addToOrder={(e) => this.addToOrder(e)} />
        </Container>
      </>
    )
  }
}

export default App