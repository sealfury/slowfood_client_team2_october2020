import React, { Component } from 'react';
import DisplayMenu from './components/DisplayMenu';
import { Header, Container } from 'semantic-ui-react';
import Login from './components/Login'


 class App extends Component {
   state= {
     authenticated: false
   }

   toggleAuthenticatedState() {
     this.setState({ authenticated: !this.state.authenticated })
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
        <DisplayMenu />
      </Container>
    </>
    )
  }
}

export default App