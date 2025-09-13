import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PizzaCard from '../components/PizzaCard'; // Reusing PizzaCard for offers

import o1 from '../assets/o1.jpeg'; 
import o2 from '../assets/o2.jpeg'; 
import o3 from '../assets/o3.jpeg';
import o4 from '../assets/o4.jpg';

// Define your seasonal offers here
const seasonalOffers = [
  {
    id: 201,
    name: 'Winter Warm-up Deal',
    description: '1 Large Spicy Pepperoni, Garlic Bread, and Hot Chocolate (serves 2-3)',
    image: o1 ,
    prices: {
      combo: 1000, // Price for the entire combo
    },
    isCombo: true,
    season: 'Winter',
  },
  {
    id: 202,
    name: 'Summer Breeze Combo',
    description: '1 Medium Veggie Delight, 2 Cold Drinks, and a Fresh Salad (serves 1-2)',
    image: o2,
    prices: {
      combo: 1500,
    },
    isCombo: true,
    season: 'Summer',
  },
  {
    id: 203,
    name: 'Holiday Feast Package',
    description: '2 Large Pizzas (any kind), 4 Sides, and a Dessert Platter (serves 4-6)',
    image: o3,
    prices: {
      combo: 2000,
    },
    isCombo: true,
    season: 'Holiday',
  },
  {
    id: 204,
    name: 'Spring Refresh Combo',
    description: '1 Small Chicken BBQ Pizza, 1 Side Salad, and a Fresh Juice (serves 1)',
    image:o4,
    prices: {
      combo: 1200,
    },
    isCombo: true,
    season: 'Spring',
  },
];

const Offers = () => {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate(); // Not directly used for navigation on add, but good to keep

  // Load cart from localStorage on component mount
  useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
//     setCart(savedCart);
//   }, []);
    const savedCart = JSON.parse(sessionStorage.getItem('pizzaCart')) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (itemToAdd) => {
    // itemToAdd should contain { id, name, image, price, size (e.g., 'combo'), isCombo }
    const newCart = [...cart, itemToAdd];
    setCart(newCart);
    //localStorage.setItem('pizzaCart', JSON.stringify(newCart)); // Save to localStorage
  sessionStorage.setItem('pizzaCart', JSON.stringify(newCart)); // Save to sessionStorage


    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000); // Hide notification after 2 seconds
  };

  return (
    <div className="container mx-auto px-4 py-1">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down">
          Offer added to cart!
        </div>
      )}

      {/* Navigation Bar - Consistent with other pages */}
      <nav>
        <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-white">🍕 PizzaHub</h1>
          <div className="space-x-6 text-white font-medium">
            <a href="/" className="hover:text-yellow-300  transition">Home</a>
            <a href="/menu" className="hover:text-yellow-300  transition">Menu</a>
            <a href="/offers" className="text-yellow-400 font-semibold">Offers</a> {/* Highlight current page */}
            <a href="/about" className="hover:text-yellow-300 transition">About</a>
            <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
            <a href="/cart" className="hover:text-yellow-300  transition">Cart</a>
          </div>
        </div>
      </nav>

      <h1 className="text-5xl font-bold mb-6 text-center">Special Seasonal Offers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {seasonalOffers.map((offer) => (
          <PizzaCard
            key={offer.id}
            pizza={offer} // Pass the offer object as 'pizza' prop
            onAddToCart={handleAddToCart}
            isOffer={true} // Indicate that this is an offer, not a regular pizza
          />
        ))}
      </div>
    </div>
  );
};

export default Offers;