import React from 'react';
import DisplayMenu from './components/DisplayMenu';
import { Header, Container } from 'semantic-ui-react'

const App = () => {
  return (
    <>
      
      <Header as='h1' textAlign="center">
        Moody Foody
      </Header>
      <Header as='h2' textAlign="center">
        Run by Hungry Tigers
      </Header>
      <Container>
        <DisplayMenu />
      </Container>
    </>
  );
}

export default App;
