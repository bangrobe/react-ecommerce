import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, SingleProduct, Cart, Checkout, Error, About, Products, PrivateRoute } from './pages'

function App() {

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/products/:id' element={<SingleProduct />} />
        {/* <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id' children={<SingleProduct />} />
        */
        <Route path='*' element={<Error />} /> }
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
