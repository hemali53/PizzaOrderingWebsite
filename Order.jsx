// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Order = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // --- START CHANGES ---

//   // Check if orderDetails are passed from PaymentMethod (when clicking 'Back')
//   const passedOrderDetails = location.state?.orderDetails;

//   // Initialize formData. If orderDetails are passed, use them to pre-fill the form.
//   // Otherwise, start with empty strings.
//   const [formData, setFormData] = useState({
//     name: passedOrderDetails?.customerDetails?.name || '',
//     address: passedOrderDetails?.customerDetails?.address || '',
//     phone: passedOrderDetails?.customerDetails?.phone || '',
//     email: passedOrderDetails?.customerDetails?.email || '', // Pre-fill email as well
//   });

//   // Initialize orderCart. If orderDetails are passed, use their items.
//   // Otherwise, load from sessionStorage (if coming from cart directly) or default to empty.
//   // This ensures the order summary displays correctly whether coming from cart or back from payment.
//   const [orderCart, setOrderCart] = useState(() => {
//     if (passedOrderDetails && passedOrderDetails.items.length > 0) {
//       return passedOrderDetails.items;
//     }
//     const savedCart = sessionStorage.getItem('pizzaCart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // --- END CHANGES ---


//   const getOrderTotal = () => {
//     return orderCart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
//   };

//   useEffect(() => {
//     // This effect should primarily handle the initial load or direct access scenarios.
//     // If orderCart is empty AND there were no passed order details, then redirect to cart.
//     // If order details were passed and they were empty, the PaymentMethod component should have already handled redirecting to cart.
//     if (orderCart.length === 0 && !passedOrderDetails) {
//       alert("No items in the order. Please go back to the cart to select items.");
//       navigate('/cart');
//     }
//     // Also, if coming from cart, ensure the current cart items are reflected.
//     // This part might need further refinement depending on your exact cart state management.
//     // For now, orderCart state is initialized to prioritize passed details, then sessionStorage.
//   }, [orderCart, navigate, passedOrderDetails]); // Added passedOrderDetails to dependencies

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure cart has items before proceeding
//     if (orderCart.length === 0) {
//       alert("Your cart is empty. Please add items before proceeding.");
//       navigate('/cart'); // Redirect to cart if somehow empty at submission
//       return;
//     }

//     const orderDetailsToSend = {
//       customerDetails: formData,
//       items: orderCart, // Use the current orderCart state
//       total: parseFloat(getOrderTotal()), // Send as a number
//     };

//     // --- START REQUIRED CHANGE: REMOVE THE API CALL HERE ---
//     // The order should ONLY be placed when a payment method is selected on the /payment page.
//     // Remove the entire try...catch block that makes a fetch request to /api/orders.
//     // Instead, directly navigate to the payment page.
//     // --- END REQUIRED CHANGE ---

//     // Directly navigate to the payment page with order details
//     navigate('/payment', { state: { orderDetails: orderDetailsToSend } });
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 py-1 px-4">
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
//             <a href="/cart" className="hover:text-yellow-300 transition">Cart</a>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center text-red-600 mb-6">📝 Confirm Your Order</h1>

//         {orderCart.length > 0 ? ( // Display order summary only if orderCart has items
//           <>
//             <div className="space-y-4 mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
//               {orderCart.map((item, index) => (
//                 <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
//                   <div className="flex items-center gap-3">
//                     {/* Ensure item.image is a valid path, otherwise use a placeholder */}
//                     <img src={item.image || 'https://via.placeholder.com/64'} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                     <div>
//                       <h3 className="font-semibold text-lg">{item.name}</h3>
//                       <p className="text-sm text-gray-600">Size: <span className="uppercase">{item.size === 'combo' || item.size === 'seasonal-combo' ? 'Combo Offer' : item.size}</span></p>
//                     </div>
//                   </div>
//                   <span className="text-lg font-bold text-red-600">Rs.{item.price.toFixed(2)}</span>
//                 </div>
//               ))}
//               <div className="text-right text-xl font-bold mt-4">
//                 Total: Rs.{getOrderTotal()}
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Delivery Details</h2>
//               <div>
//                 <label className="block font-semibold text-gray-700 mb-1" htmlFor="name">Name</label>
//                 <input
//                   id="name"
//                   type="text"
//                   name="name"
//                   placeholder="Enter your name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold text-gray-700 mb-1" htmlFor="address">Delivery Address</label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   rows="3"
//                   placeholder="Enter your full address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   required
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="block font-semibold text-gray-700 mb-1" htmlFor="phone">Telephone Number</label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   name="phone"
//                   placeholder="your phone number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:'ring-yellow-500"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold text-gray-700 mb-1" htmlFor="email">Email (Optional)</label>
//                 <input
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
//               >
//                 Proceed to Payment
//               </button>
//             </form>
//           </>
//         ) : (
//           <p className="text-gray-600 text-center">Your order is empty. Please add items to your cart first.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Order;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if orderDetails are passed from PaymentMethod (when clicking 'Back')
  const passedOrderDetails = location.state?.orderDetails;

  // Initialize formData. If orderDetails are passed, use them to pre-fill the form.
  // Otherwise, start with empty strings.
  const [formData, setFormData] = useState({
    name: passedOrderDetails?.customerDetails?.name || '',
    address: passedOrderDetails?.customerDetails?.address || '',
    phone: passedOrderDetails?.customerDetails?.phone || '',
    email: passedOrderDetails?.customerDetails?.email || '', // Pre-fill email as well
  });

  // Initialize orderCart. If orderDetails are passed, use their items.
  // Otherwise, load from sessionStorage (if coming from cart directly) or default to empty.
  // This ensures the order summary displays correctly whether coming from cart or back from payment.
  const [orderCart, setOrderCart] = useState(() => {
    if (passedOrderDetails && passedOrderDetails.items.length > 0) {
      return passedOrderDetails.items;
    }
    const savedCart = sessionStorage.getItem('pizzaCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // MODIFIED: Calculate total based on quantity and price
  const getOrderTotal = () => {
    return orderCart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  useEffect(() => {
    if (orderCart.length === 0 && !passedOrderDetails) {
      alert("No items in the order. Please go back to the cart to select items.");
      navigate('/cart');
    }
  }, [orderCart, navigate, passedOrderDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderCart.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      navigate('/cart');
      return;
    }

    const orderDetailsToSend = {
      customerDetails: formData,
      items: orderCart,
      total: parseFloat(getOrderTotal()), // Send as a number, which now correctly includes quantity
    };

    // Directly navigate to the payment page with order details
    navigate('/payment', { state: { orderDetails: orderDetailsToSend } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-red-100 py-1 px-4">
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
            <a href="/cart" className="hover:text-yellow-300 transition">Cart</a>
          </div>
        </div>
      </nav>

      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">📝 Confirm Your Order</h1>

        {orderCart.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
              {orderCart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image || 'https://via.placeholder.com/64'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600">Size: <span className="uppercase">{item.size === 'combo' || item.size === 'seasonal-combo' ? 'Combo Offer' : item.size}</span></p>
                      {/* NEW: Display quantity for each item */}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  {/* MODIFIED: Display total price for each item (quantity * unit price) */}
                  <span className="text-lg font-bold text-red-600">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="text-right text-xl font-bold mt-4">
                Total: Rs.{getOrderTotal()}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Delivery Details</h2>
              <div>
                <label className="block font-semibold text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1" htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1" htmlFor="phone">Telephone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:'ring-yellow-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1" htmlFor="email">Email (Optional)</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
              >
                Proceed to Payment
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-600 text-center">Your order is empty. Please add items to your cart first.</p>
        )}
      </div>
    </div>
  );
};

export default Order;