import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const foundDuplicate = cartList.find(
      each => each.id === product.id && each.quantity === product.quantity,
    )

    if (!foundDuplicate) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedProduct = cartList.find(each => each.id === id)
    const updatedProductList = cartList.map(each => {
      if (each.id === updatedProduct.id) {
        return {...updatedProduct, quantity: updatedProduct.quantity + 1}
      }
      return each
    })
    this.setState({cartList: updatedProductList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateQuantityProduct = cartList.find(item => item.id === id)

    if (updateQuantityProduct.quantity > 1) {
      const updatedProductList = cartList.map(item => {
        if (item.id === updateQuantityProduct.id) {
          const updatedQuantity = updateQuantityProduct.quantity - 1
          return {...updateQuantityProduct, quantity: updatedQuantity}
        }
        return item
      })
      this.setState({cartList: updatedProductList})
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedProductList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedProductList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
