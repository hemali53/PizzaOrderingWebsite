// //import React from 'react';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PizzaCard from '../components/PizzaCard';
// import pizza_1 from '../assets/pizza_1.jpg';
// import pizza_2 from '../assets/pizza_2.jpg';
// import pizza_3 from '../assets/pizza_3.jpg';
// import pizza_4 from '../assets/pizza_4.jpg';
// import pizza_5 from '../assets/pizza_5.jpg';
// import pizza_6 from '../assets/pizza_6.jpg';

// const pizzas = [
//   {
//     id: 1,
//     name: 'Margherita',
//     description: 'Classic delight with 100% real mozzarella cheese',
//     image: pizza_3,
//      prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
// },

//   {
//     id: 2,
//     name: 'Pepperoni',
//     description: 'Loaded with pepperoni & extra cheese',
//     image: pizza_2,
//       prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
//   },

//   {
//     id: 3,
//     name: 'Veggie Supreme',
//     description: 'Onions, capsicum, mushrooms, tomatoes, and olives',
//     image: pizza_1,
//       prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
//   },

// {
//     id: 4,
//     name: 'Margherita',
//     description: 'Classic delight with 100% real mozzarella cheese',
//     image: pizza_4,
//       prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
//   },
//   {
//     id: 5,
//     name: 'Pepperoni',
//     description: 'Loaded with pepperoni & extra cheese',
//     image: pizza_5,
//     prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
//   },

//   {
//     id: 6,
//     name: 'Veggie Supreme',
//     description: 'Onions, capsicum, mushrooms, tomatoes, and olives',
//     image: pizza_6,
//     prices: {
//       small: 5,
//       medium: 8,
//       large: 11,
//   },
//   },

// ];

// const Menu = () => {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   const handleAddToCart = (pizzaItem) => {
//     const newCart = [...cart, pizzaItem];
//     setCart(newCart);
//     // Navigate to cart page with state
//     navigate('/cart', { state: { cart: newCart } });
//   };

//   return (
//   <div className="container mx-auto px-4 py-1">
//         {/* Navigation Bar */}
//         <nav className="bg-white"> 
//           <div className="container mx-auto flex justify-between items-center px-6 py-4">
//             <h1 className="text-2xl font-bold text-red-600">🍕 PizzaHub</h1>
//             <div className="space-x-6 text-gray-700 font-medium">
//               <a href="/" className="hover:text-red-500 transition">Home</a>
//               <a href="/menu" className="hover:text-red-500 transition">Menu</a>
//               <a href="/offers" className="hover:text-red-500 transition">Offers</a>
//               <a href="/about" className="text-red-600 font-semibold">About</a>
//               <a href="/contact" className="hover:text-red-500 transition">Contact</a>
//               <a href="/cart" className="hover:text-red-500 transition">Cart</a>
//             </div>
//           </div>
//         </nav>
//       <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {pizzas.map((pizza) => (
//           <PizzaCard key={pizza.id} pizza={pizza} 
//           onAddToCart={handleAddToCart}/>
//         ))}
//       </div>
//     </div>
  
//   );

// };

// export default Menu;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PizzaCard from '../components/PizzaCard'; // Assuming this path is correct
import m1 from '../assets/m1.jpeg';
import m2 from '../assets/m2.jpeg';
import m3jpg from '../assets/m3jpg.jpg';
import m4 from '../assets/m4.png';
import m5 from '../assets/m5.jpg';
import m6 from '../assets/m6.jpg';

const pizzas = [
  {
    id: 1,
    name: 'Margherita',
    description: 'Classic delight with 100% real mozzarella cheese',
    image: m1,
    prices: {
      small: 600,
      medium: 800,
      large: 1000,
    },
  },
  {
    id: 2,
    name: 'Pepperoni',
    description: 'Loaded with pepperoni & extra cheese',
    image: m2,
    prices: {
      small: 600,
      medium: 800,
      large: 1100,
    },
  },
  {
    id: 3,
    name: 'Veggie Supreme',
    description: 'Onions, capsicum, mushrooms, tomatoes, and olives',
    image: m3jpg,
    prices: {
      small: 550,
      medium: 880,
      large: 1150,
    },
  },
  {
    id: 4,
    name: 'Chicken Fiesta', // Changed name for distinction
    description: 'Grilled chicken, onions, and capsicum',
    image: m4,
    prices: {
      small: 600,
      medium: 900,
      large: 1200,
    },
  },
  {
    id: 5,
    name: 'BBQ Chicken', // Changed name for distinction
    description: 'BBQ chicken, onions, and cilantro',
    image: m5,
    prices: {
      small: 800,
      medium: 1000,
      large: 1300,
    },
  },
  {
    id: 6,
    name: 'Four Cheese', // Changed name for distinction
    description: 'Mozzarella, cheddar, parmesan, and provolone',
    image: m6,
    prices: {
      small: 800,
      medium: 900,
      large: 1100,
    },
  },
];

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem('pizzaCart')) || [];
  //   setCart(savedCart);
  // }, []);
    const savedCart = JSON.parse(sessionStorage.getItem('pizzaCart')) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (pizzaItemWithDetails) => {
    // pizzaItemWithDetails should contain { id, name, image, price, size }
    const newCart = [...cart, pizzaItemWithDetails];
    setCart(newCart);
    // localStorage.setItem('pizzaCart', JSON.stringify(newCart)); // Save to localStorage
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
          Pizza added to cart!
        </div>
      )}

      {/* Navigation Bar */}
      <nav >
        <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-white">🍕 PizzaHub</h1>
          <div className="space-x-6 text-white font-medium">
            <a href="/" className="hover:text-yellow-300 transition">Home</a>
            <a href="/menu" className="text-yellow-400 font-semibold">Menu</a>{/* Highlight current page */}
            <a href="/offers" className="hover:text-yellow-300 transition">Offers</a> 
            <a href="/about" className="hover:text-yellow-300 transition">About</a>
            <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
            <a href="/cart" className="hover:text-yellow-300 transition">Cart</a>
          </div>
        </div>
      </nav>
      <h1 className="text-4xl font-bold mb-6 text-center">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
