import React from 'react';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Cart from './pages/Cart'; // 🆕
import PizzaCard from "./components/PizzaCard";
import Offers from './pages/Offers'; // Make sure this import is correct
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order';
import AdminPanel from './pages/AdminPanel';
import AdminLoginPage from './pages/AdminLoginPage'; 
import PaymentMethod from './pages/PaymentMethod';
import PayHereCheckout from "./pages/PayHereCheckout"; 


function App() {
  
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<About/>} path="/about"/>
        <Route element={<NotFound/>} path="*"/> 
        <Route path="/contact" element={<Contact/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/cart" element={<Cart />} /> {/* 🆕 */}
        <Route path="/pizzacard" element={<PizzaCard/>} />
        <Route path="/offers" element={<Offers />} /> 
        <Route path="/order" element={<Order/>} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/admin" element={<AdminPanel/>} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />
        <Route path="/payment" element={<PaymentMethod/>} />
        <Route path="/payhere-checkout" element={<PayHereCheckout />} />
        
    </Routes>
    </BrowserRouter>
  )
}

export default App
