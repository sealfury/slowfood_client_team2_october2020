import React, { Component } from "react";
import DisplayMenu from "./components/DisplayMenu";
import { Header, Container, Button, Icon, Label } from "semantic-ui-react";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  state = {
    authenticated: false,
    orderID: "",
    message: null,
    productData: [] ,
    showOrder: false,
    //orderItemsCount: 0
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  async addToOrder(e) {
    debugger;
    let id = e.target.parentElement.dataset.id;
    // let id = e.target.id;
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

    //let count = response.data.order_items.length 
    this.setState({
      message: response.data.message,
      orderID: response.data.order_id,
      //orderItemsCount: count
    });
  };

  render() {
    let dataIndex
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
          
          {this.state.orderID !=="" && (
            
            <Button as='div' labelPosition='right'>
              <Button
                color='pink'
                data-cy="button"
                onClick={() => {
                  this.setState({ showOrder: !this.state.showOrder});
                }}
              >
                <Icon name='cart' />
                View order
              </Button>
              <Label basic color='pink' pointing='left'>
                3
                {/* {this.state.orderItemsCount} */}
              </Label>
            </Button>
          )}
          {this.state.showOrder && (
            <ul data-cy="order-details">
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          )}

           {dataIndex}

        </Container>
       </>
    );
  }
}

export default App;
