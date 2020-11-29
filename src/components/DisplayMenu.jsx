import React, { Component } from 'react'
import { getData } from '../modules/productData'
import { Header, Item, Button, Icon } from 'semantic-ui-react'

class DisplayMenu extends Component {
  state = {
    productData: [],
  }

  componentDidMount() {
    this.getProductData()
  }

  async getProductData() {
    let result = await getData();
    this.setState({ productData: result })
  }

  render() {
    let dataIndex
    if (Array.isArray(this.state.productData) && this.state.productData.length) {
      dataIndex = (
        <div id="menu">
          {this.state.productData.map(item => {
            return (
              <div
                key={item.id} 
                data-cy={`product-${item.id}`}
                id={`product-${item.id}`}
                data-id={item.id}
                data-price={item.price}
              >
                {`${item.name} ${item.description} ${item.price}`}
                { localStorage.getItem('authenticated') === 'true' &&
                  <button
                    data-cy="button"
                    onClick={(e) => this.props.addToOrder(e)}
                  >
                  Add to Order
                  </button> 
                }
              </div>
          )
          })}
          </div>
      )
      } else {
      return (
        <Header as='h3' id='no-menu'>
          There is no available menu.
        </Header>
      )
    }

    return (
      <div>
        {dataIndex}
      </div>
    )
  }
}

export default DisplayMenu