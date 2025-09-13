// src/pages/Cart.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   // Load cart from sessionStorage on component mount
//   useEffect(() => {
//     const savedCart = JSON.parse(sessionStorage.getItem('pizzaCart')) || [];
//     setCart(savedCart);
//   }, []);

//   const getTotal = () => {
//     return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
//   };

//   const handleRemoveItem = (indexToRemove) => {
//     const updatedCart = cart.filter((_, index) => index !== indexToRemove);
//     setCart(updatedCart);
//     sessionStorage.setItem('pizzaCart', JSON.stringify(updatedCart));
//   };

//   const handleClearCart = () => {
//     setCart([]);
//     sessionStorage.removeItem('pizzaCart');
//   };

//   // --- MODIFIED handlePlaceOrder ---
//   const handlePlaceOrder = () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty. Please add some pizzas before ordering!");
//       return;
//     }

//     // Instead of directly going to order-confirmation, navigate to the Order page
//     // and pass the current cart items to it.
//     navigate('/order', { state: { orderCart: cart } }); // Pass the whole cart
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Navigation Bar */}
//       <nav>
//         <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
//           <h1 className="text-2xl font-bold text-white">🍕 PizzaHub</h1>
//           <div className="space-x-6 text-white font-medium">
//             <a href="/" className="hover:text-yellow-300 transition">Home</a>
//             <a href="/menu" className="hover:text-yellow-300 transition">Menu</a>
//             <a href="/offers" className="hover:text-yellow-300 transition">Offers</a>
//             <a href="/about" className="hover:text-yellow-300 transition">About</a>
//             <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
//             <a href="/cart" className="text-yellow-400 font-semibold">Cart</a>
//           </div>
//         </div>
//       </nav>

//       <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>
//       {cart.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item, index) => (
//             <div key={index} className="p-4 border rounded shadow flex items-center gap-4">
//               <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
//               <div className="flex-grow">
//                 <h2 className="font-semibold text-lg">{item.name}</h2>
//                 <p>Size: <span className="uppercase">{item.size === 'combo' || item.size === 'seasonal-combo' ? 'Combo Offer' : item.size}</span></p>
//                 <p className="text-red-600 font-bold">Rs.{item.price.toFixed(2)}</p>
//               </div>
//               <button
//                 onClick={() => handleRemoveItem(index)}
//                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-sm transition-colors duration-300"
//                 title="Remove item"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <hr className="my-6" />
//           <p className="text-xl font-bold text-right">Total: Rs.{getTotal()}</p>

//           <div className="flex justify-end mt-6 space-x-4">
//             <button
//               onClick={handleClearCart}
//               className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
//             >
//               Order Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from sessionStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('pizzaCart')) || [];
    setCart(savedCart);
  }, []);

  // MODIFIED: Calculate total based on quantity and price
  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  // NEW: Handle quantity change for an item in the cart
  const handleQuantityChange = (indexToUpdate, newQuantity) => {
    const updatedCart = cart.map((item, index) => {
      if (index === indexToUpdate) {
        // Ensure quantity is at least 1
        const quantity = newQuantity > 0 ? newQuantity : 1;
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCart(updatedCart);
    sessionStorage.setItem('pizzaCart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    sessionStorage.setItem('pizzaCart', JSON.stringify(updatedCart));
  };

  const handleClearCart = () => {
    setCart([]);
    sessionStorage.removeItem('pizzaCart');
  };

  // --- MODIFIED handlePlaceOrder ---
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some pizzas before ordering!");
      return;
    }

    // Instead of directly going to order-confirmation, navigate to the Order page
    // and pass the current cart items to it.
    navigate('/order', { state: { orderCart: cart } }); // Pass the whole cart
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <nav>
        <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-white">🍕 PizzaHub</h1>
          <div className="space-x-6 text-white font-medium">
            <a href="/" className="hover:text-yellow-300 transition">Home</a>
            <a href="/menu" className="hover:text-yellow-300 transition">Menu</a>
            <a href="/offers" className="hover:text-yellow-300 transition">Offers</a>
            <a href="/about" className="hover:text-yellow-300 transition">About</a>
            <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
            <a href="/cart" className="text-yellow-400 font-semibold">Cart</a>
          </div>
        </div>
      </nav>

      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-grow">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p>Size: <span className="uppercase">{item.size === 'combo' || item.size === 'seasonal-combo' ? 'Combo Offer' : item.size}</span></p>
                <p className="text-gray-700">Unit Price: Rs.{item.price.toFixed(2)}</p> {/* Display unit price */}
                
                {/* NEW: Quantity Input */}
                <div className="flex items-center mt-2">
                  <label htmlFor={`quantity-${index}`} className="block text-gray-700 text-sm font-bold mr-2">
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                    min="1"
                    className="w-20 border border-gray-300 rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  />
                </div>
                {/* NEW: Display Total for each item */}
                <p className="text-red-600 font-bold mt-2">
                  Subtotal: Rs.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-sm transition-colors duration-300"
                title="Remove item"
              >
                Remove
              </button>
            </div>
          ))}
          <hr className="my-6" />
          <p className="text-xl font-bold text-right">Total: Rs.{getTotal()}</p>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleClearCart}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePlaceOrder}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Cart;