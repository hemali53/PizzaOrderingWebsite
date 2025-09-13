// OrderConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-teal-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-lg text-gray-800 mb-2">Thank you for your order!</p>
        {orderId && <p className="text-md text-gray-700 mb-6">Your Order ID: <span className="font-semibold">{orderId}</span></p>}
        <p className="text-gray-600 mb-8">We're preparing your delicious pizza and it will be delivered soon.</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition"
        >
          Order More Pizza!
        </button>
        <a href="/" className="block mt-4 text-gray-600 hover:text-green-700">Back to Home</a>
      </div>
    </div>
  );
};

export default OrderConfirmation;