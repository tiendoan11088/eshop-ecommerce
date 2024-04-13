import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { Header,Footer, AdminOnlyRoute } from './components/index.js'
import { Home, Contact, Reset, Login, Register, Admin, OrderHistory} from "./pages/index.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './components/product/productDetails/ProductDetails.jsx'
import {Cart} from './pages/index.js';
import CheckoutDetails from './pages/checkout/CheckoutDetails.jsx';
import Checkout from './pages/checkout/Checkout.jsx';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess.jsx';
import OrderDetails from './pages/orderDetails/OrderDetails.jsx';
import NotFound from './pages/notFound/NotFound.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
         <Header/>
         <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/reset' element={<Reset/>}/>

          <Route path='/admin/*' element={
          <AdminOnlyRoute>
            <Admin />
          </AdminOnlyRoute> } />

          <Route path='/product-details/:id' element={<ProductDetails />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/checkout-details' element={<CheckoutDetails />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/checkout-success' element={<CheckoutSuccess />}/>
          <Route path='/order-history' element={<OrderHistory/>}/>
          <Route path='/order-details/:id' element={<OrderDetails/>}/>
          <Route path='*' element={<NotFound/>}/>
          
         </Routes>
         <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
