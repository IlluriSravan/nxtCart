import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartist} = value
      let total = 0
      cartist.forEach(each => {
        total += each.item * each.quantity
      })
      return (
        <div className="summary">
          <div className="top-summary">
            <h2>Order Total:</h2>
            <h1>Rs {total}/-</h1>
          </div>
          <p>{cartist.length} items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
