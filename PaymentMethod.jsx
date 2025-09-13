// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PaymentMethod = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderDetails = location.state?.orderDetails;

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // If orderDetails are missing, redirect back (e.g., if user directly accesses /payment)
//     if (!orderDetails || orderDetails.items.length === 0) {
//       alert("No order details found. Redirecting to cart.");
//       navigate('/cart');
//     }
//   }, [orderDetails, navigate]);

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     if (selectedPaymentMethod === 'cash_on_delivery') {
//       await processCashOnDelivery();
//     } else if (selectedPaymentMethod === 'online_payment') {
//       // online_payment තේරූ විට PayHereCheckout page එකට navigate කරන්න
//       if (orderDetails) {
//         console.log("Navigating to PayHere checkout with order details:", orderDetails);
//         navigate('/payhere-checkout', { state: { orderDetails: orderDetails } });
//       } else {
//         setError('Order details are missing to proceed with online payment.');
//         setLoading(false);
//       }
//     } else {
//       setError('Please select a payment method.');
//       setLoading(false);
//       return;
//     }
//   };

//   const processCashOnDelivery = async () => {
//     console.log('Processing Cash on Delivery for:', orderDetails);

//     try {
//       const response = await fetch('http://localhost:5000/api/update-order-status', { // Assuming a new endpoint to update order
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderId: orderDetails.orderId, // Use the orderId received from Order.jsx
//           paymentMethod: 'Cash on Delivery',
//           paymentStatus: 'Pending',
//           total: orderDetails.total,
//           customerDetails: orderDetails.customerDetails,
//           items: orderDetails.items
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Order placed via Cash on Delivery:', data);
//         sessionStorage.removeItem('pizzaCart'); // Clear cart after successful order
//         navigate('/orderconfirmation', { state: { orderId: orderDetails.orderId || 'COD_SUCCESS' } }); // Pass order ID for confirmation page
//       } else {
//         console.error('Failed to place Cash on Delivery order:', data.message);
//         setError(data.message || 'Failed to place order.');
//       }
//     } catch (err) {
//       console.error('Network error during COD order:', err);
//       setError('Network error placing order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!orderDetails) {
//     return <p className="text-center mt-10">Loading order details...</p>;
//   }

//   // Function to handle back button click
//   // const handleBack = () => {
//   //   navigate('/order', { state: { orderDetails: orderDetails } }); // Pass orderDetails back if needed
//   // };

//   // if (!orderDetails) {
//   //   return <p className="text-center mt-10">Loading order details...</p>;
//   // }

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
//         <h1 className="text-3xl font-bold text-center text-red-600 mb-6">💰 Select Payment Method</h1>

//         <div className="space-y-4 mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
//           <p className="text-xl font-bold text-right text-red-600">Total: Rs.{orderDetails.total.toFixed(2)}</p>
//           <p className="text-gray-700">Name: {orderDetails.customerDetails.name}</p>
//           <p className="text-gray-700">Delivery Address: {orderDetails.customerDetails.address}</p>
//           <p className="text-gray-700">Phone: {orderDetails.customerDetails.phone}</p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Choose your method</h2>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="cash_on_delivery"
//               name="paymentMethod"
//               value="cash_on_delivery"
//               checked={selectedPaymentMethod === 'cash_on_delivery'}
//               onChange={() => setSelectedPaymentMethod('cash_on_delivery')}
//               className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
//             />
//             <label htmlFor="cash_on_delivery" className="text-lg font-medium text-gray-800">Cash on Delivery</label>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="online_payment"
//               name="paymentMethod"
//               value="online_payment"
//               checked={selectedPaymentMethod === 'online_payment'}
//               onChange={() => setSelectedPaymentMethod('online_payment')}
//               className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
//             />
//             <label htmlFor="online_payment" className="text-lg font-medium text-gray-800">
//               Online Payment (Credit/Debit Card)
//             </label>
//           </div>

//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//           <button
//             onClick={handlePayment}
//             className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition mt-6"
//             disabled={loading || !selectedPaymentMethod}
//           >
//             {loading ? 'Processing...' : 'Complete Order'}
//           </button>
//           {/* Back Button */}
//           <button
            
//             className="w-full bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400 transition mt-4"
//           >
//            <a a href="/order"> Back to Order Details</a>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PaymentMethod = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const orderDetails = location.state?.orderDetails;

//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // If orderDetails are missing, redirect back (e.g., if user directly accesses /payment)
//     // This part remains to handle direct access or refresh scenarios where state might be lost
//     if (!orderDetails || orderDetails.items.length === 0) {
//       alert("No order details found. Redirecting to cart.");
//       navigate('/cart');
//     }
//   }, [orderDetails, navigate]);

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     if (selectedPaymentMethod === 'cash_on_delivery') {
//       await processCashOnDelivery();
//     } else if (selectedPaymentMethod === 'online_payment') {
//       if (orderDetails) {
//         console.log("Navigating to PayHere checkout with order details:", orderDetails);
//         navigate('/payhere-checkout', { state: { orderDetails: orderDetails } });
//       } else {
//         setError('Order details are missing to proceed with online payment.');
//         setLoading(false);
//       }
//     } else {
//       setError('Please select a payment method.');
//       setLoading(false);
//       return;
//     }
//   };

//   const processCashOnDelivery = async () => {
//     console.log('Processing Cash on Delivery for:', orderDetails);

//     try {
//       const response = await fetch('http://localhost:5000/api/update-order-status', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderId: orderDetails.orderId,
//           paymentMethod: 'Cash on Delivery',
//           paymentStatus: 'Pending',
//           total: orderDetails.total,
//           customerDetails: orderDetails.customerDetails,
//           items: orderDetails.items
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Order placed via Cash on Delivery:', data);
//         sessionStorage.removeItem('pizzaCart');
//         navigate('/orderconfirmation', { state: { orderId: orderDetails.orderId || 'COD_SUCCESS' } });
//       } else {
//         console.error('Failed to place Cash on Delivery order:', data.message);
//         setError(data.message || 'Failed to place order.');
//       }
//     } catch (err) {
//       console.error('Network error during COD order:', err);
//       setError('Network error placing order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Back button functionality: Navigate to /order and pass current orderDetails
//   const handleBack = () => {
//     navigate('/order', { state: { orderDetails: orderDetails } });
//   };

//   if (!orderDetails) {
//     // This return statement is important to prevent rendering the rest of the component
//     // if orderDetails are not available, as the useEffect will handle the redirection.
//     return <p className="text-center mt-10">Loading order details or redirecting...</p>;
//   }

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
//         <h1 className="text-3xl font-bold text-center text-red-600 mb-6">💰 Select Payment Method</h1>

//         <div className="space-y-4 mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
//           <p className="text-xl font-bold text-right text-red-600">Total: Rs.{orderDetails.total.toFixed(2)}</p>
//           <p className="text-gray-700">Name: {orderDetails.customerDetails.name}</p>
//           <p className="text-gray-700">Delivery Address: {orderDetails.customerDetails.address}</p>
//           <p className="text-gray-700">Phone: {orderDetails.customerDetails.phone}</p>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Choose your method</h2>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="cash_on_delivery"
//               name="paymentMethod"
//               value="cash_on_delivery"
//               checked={selectedPaymentMethod === 'cash_on_delivery'}
//               onChange={() => setSelectedPaymentMethod('cash_on_delivery')}
//               className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
//             />
//             <label htmlFor="cash_on_delivery" className="text-lg font-medium text-gray-800">Cash on Delivery</label>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="online_payment"
//               name="paymentMethod"
//               value="online_payment"
//               checked={selectedPaymentMethod === 'online_payment'}
//               onChange={() => setSelectedPaymentMethod('online_payment')}
//               className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
//             />
//             <label htmlFor="online_payment" className="text-lg font-medium text-gray-800">
//               Online Payment (Credit/Debit Card)
//             </label>
//           </div>

//           {error && <p className="text-red-500 text-center mt-4">{error}</p>}

//           <button
//             onClick={handlePayment}
//             className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition mt-6"
//             disabled={loading || !selectedPaymentMethod}
//           >
//             {loading ? 'Processing...' : 'Complete Order'}
//           </button>

//           {/* Back Button - This is the crucial part */}
//           <button
//             onClick={handleBack} // This calls the handleBack function
//             className="w-full bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400 transition mt-4"
//           >
//             Back to Order Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;




// PaymentMethod.js - REQUIRED CHANGES
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderDetails || orderDetails.items.length === 0) {
      alert("No order details found. Redirecting to cart.");
      navigate('/cart');
    }
  }, [orderDetails, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    if (selectedPaymentMethod === 'cash_on_delivery') {
      await processCashOnDelivery();
    } else if (selectedPaymentMethod === 'online_payment') {
      await processOnlinePayment(); // Call the new online payment processing function
    } else {
      setError('Please select a payment method.');
      setLoading(false);
      return;
    }
  };

  const processCashOnDelivery = async () => {
    console.log('Processing Cash on Delivery for:', orderDetails);

    try {
      const response = await fetch('http://localhost:5000/api/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderDetails.orderId,
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'Pending',
          total: orderDetails.total,
          customerDetails: orderDetails.customerDetails,
          items: orderDetails.items
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Order placed via Cash on Delivery:', data);
        sessionStorage.removeItem('pizzaCart');
        navigate('/orderconfirmation', { state: { orderId: data.orderId || 'COD_SUCCESS' } }); // Use data.orderId from backend
      } else {
        console.error('Failed to place Cash on Delivery order:', data.message);
        setError(data.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error('Network error during COD order:', err);
      setError('Network error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // >>>>>>>> NEW: processOnlinePayment function <<<<<<<<<<
  const processOnlinePayment = async () => {
    if (!orderDetails) {
      setError('Order details are missing to proceed with online payment.');
      setLoading(false);
      return;
    }

    console.log('Initiating online payment with order details:', orderDetails);

    try {
      // Step 1: Send order details to backend to get PayHere data
      const response = await fetch('http://localhost:5000/api/payhere-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderDetails }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Received PayHere data from backend:', result.payhere_data);
        // Step 2: Submit data to PayHere gateway to redirect the user
        // This requires dynamically creating a form and submitting it
        const payhereData = result.payhere_data;
        const form = document.createElement('form');
        form.method = 'POST';
        // Use PayHere Sandbox URL for testing
        form.action = 'https://sandbox.payhere.lk/pay/checkout'; // Use Live URL for production: 'https://payhere.lk/pay/checkout'
        form.target = '_self'; // Open in the same window/tab

        for (const key in payhereData) {
          if (Object.prototype.hasOwnProperty.call(payhereData, key)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = payhereData[key];
            form.appendChild(input);
          }
        }
        document.body.appendChild(form);
        form.submit();
        console.log('Redirecting to PayHere gateway...');
      } else {
        console.error('Failed to get PayHere data from backend:', result.message || 'Unknown error');
        setError(result.message || 'Failed to initiate online payment.');
      }
    } catch (err) {
      console.error('Network error during online payment initiation:', err);
      setError('Network error initiating online payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Back button functionality: Navigate to /order and pass current orderDetails
  const handleBack = () => {
    navigate('/order', { state: { orderDetails: orderDetails } });
  };

  if (!orderDetails) {
    return <p className="text-center mt-10">Loading order details or redirecting...</p>;
  }

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
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">💰 Select Payment Method</h1>

        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Order Summary</h2>
          <p className="text-xl font-bold text-right text-red-600">Total: Rs.{orderDetails.total.toFixed(2)}</p>
          <p className="text-gray-700">Name: {orderDetails.customerDetails.name}</p>
          <p className="text-gray-700">Delivery Address: {orderDetails.customerDetails.address}</p>
          <p className="text-gray-700">Phone: {orderDetails.customerDetails.phone}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Choose your method</h2>

          <div className="flex items-center">
            <input
              type="radio"
              id="cash_on_delivery"
              name="paymentMethod"
              value="cash_on_delivery"
              checked={selectedPaymentMethod === 'cash_on_delivery'}
              onChange={() => setSelectedPaymentMethod('cash_on_delivery')}
              className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <label htmlFor="cash_on_delivery" className="text-lg font-medium text-gray-800">Cash on Delivery</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="online_payment"
              name="paymentMethod"
              value="online_payment"
              checked={selectedPaymentMethod === 'online_payment'}
              onChange={() => setSelectedPaymentMethod('online_payment')}
              className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <label htmlFor="online_payment" className="text-lg font-medium text-gray-800">
              Online Payment (Credit/Debit Card)
            </label>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <button
            onClick={handlePayment}
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition mt-6"
            disabled={loading || !selectedPaymentMethod}
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>

          {/* Back Button - This is the crucial part */}
          <button
            onClick={handleBack} // This calls the handleBack function
            className="w-full bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400 transition mt-4"
          >
            Back to Order Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;