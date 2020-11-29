import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container } from "semantic-ui-react";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  state = {
    authenticated: false,
    orderID: "",
    message: null,
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  async addToOrder(e) {
    debugger;
    let id = e.target.parentElement.dataset.id;
    let headers = JSON.parse(localStorage.getItem("credentials"));
    let response;
    if (this.state.orderID !== "") {
      response = await axios.put(
        `http://localhost:3000/api/orders/${this.state.orderID}`,
        { product_id: id },
        { headers: headers }
      );
    } else {
      response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: id },
        { headers: headers }
      );
    }

    this.setState({
      message: response.data.message,
      orderID: response.data.order_id,
    });
  };

  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Moody Foody
        </Header>
        <Header as="h2" textAlign="center">
          Run by Hungry Tigers
        </Header>
        <Container>
          <Login
            toggleAuthenticatedState={() => this.toggleAuthenticatedState()}
          />
          {this.state.message && (
            <h2 data-cy="message">{this.state.message}</h2>
          )}
          <DisplayMenu addToOrder={(e) => this.addToOrder(e)} />
        </Container>
      </>
    );
  }
}

export default App;
