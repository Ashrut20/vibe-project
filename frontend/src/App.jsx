import React from 'react'
import { BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import ProductPage from './page/Product/Page'
import CartPage from './page/Cart/Page'
import CheckoutPage from './page/Checkout/Page'
const App = () => {
  return (
    <div>
      <Router>
      <Routes>

        <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
      </Routes>


      </Router>
    </div>
  )
}

export default App
