import React, { Component } from 'react'
import { getData } from '../modules/productData'
import { Header, Item, Button, Icon } from 'semantic-ui-react'

class DisplayMenu extends Component {
  state = {
    productData: []
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
              <Item key={item.id} data-cy={`product-${item.id}`}>
                <Item.Image size='tiny' src={`images/image${item.id}.png`} />
                <Item.Content>
                  <Item.Header style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Item.Header>
                  <Item.Description>{item.description}</Item.Description>
                  <Item.Extra> {item.price}</Item.Extra>
                </Item.Content>
                { localStorage.getItem('authenticated') === 'true' && 
                 <Button animated='fade'>
                  <Button.Content visible>
                    Add To Order
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='food' />
                  </Button.Content>
                </Button>
                }
              </Item>
            )
          })
          }
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