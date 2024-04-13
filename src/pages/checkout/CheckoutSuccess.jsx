import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <section>
      <div className='container'>
        <h3>Checkout successful</h3>
        <p>Thank you for your purchase</p>
        <br/>
          <button className='--btn --btn-primary'>
            <Link to='/order-history' style={{color: "#FFF"}}>View Order Status</Link>
          </button>
      </div>
    </section>
  )
}

export default CheckoutSuccess