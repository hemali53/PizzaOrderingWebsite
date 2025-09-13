// import React, { useState } from 'react';

// const PizzaCard = ({ pizza, onAddToCart, isOffer }) => {
//   const initialSize = isOffer ? 'combo' : 'medium'; // Default to 'combo' for offers
//   const [selectedSize, setSelectedSize] = useState(initialSize);

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//   const handleAddClick = () => {
//     const price = isOffer ? pizza.prices.combo : pizza.prices[selectedSize];
//     onAddToCart({
//       id: pizza.id,
//       name: pizza.name,
//       image: pizza.image,
//       price: price,
//       size: selectedSize, // Will be 'combo' for offers, 'small/medium/large' for pizzas
//       isOffer: isOffer, // Pass this flag to cart for potential future use
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
//       <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h2 className="text-xl font-bold mb-2">{pizza.name}</h2>
//         <p className="text-gray-700 text-sm mb-4">{pizza.description}</p>
//         <div className="mb-4">
//           {/* Conditional rendering for size selection: only show if NOT an offer */}
//           {!isOffer && (
//             <>
//               <label htmlFor={`size-${pizza.id}`} className="block text-gray-700 text-sm font-bold mb-2">
//                 Select Size:
//               </label>
//               <select
//                 id={`size-${pizza.id}`}
//                 value={selectedSize}
//                 onChange={handleSizeChange}
//                 className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
//               >
//                 {Object.keys(pizza.prices).map((size) => (
//                   <option key={size} value={size}>
//                     {size.charAt(0).toUpperCase() + size.slice(1)} - Rs.{pizza.prices[size]}
//                   </option>
//                 ))}
//               </select>
//             </>
//           )}
//         </div>
//         <div className="flex justify-between items-center">
//           <span className="text-2xl font-bold text-red-600">
//             Rs.{isOffer ? pizza.prices.combo.toFixed(2) : pizza.prices[selectedSize].toFixed(2)}
//           </span>
//           <button
//             onClick={handleAddClick}
//             className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PizzaCard;



import React, { useState } from 'react';

const PizzaCard = ({ pizza, onAddToCart, isOffer }) => {
  // Determine initial size: 'combo' for offers, 'medium' for others (you can change this default)
  const initialSize = isOffer ? 'combo' : 'medium';
  const [selectedSize, setSelectedSize] = useState(initialSize);

  // NEW: Add state for quantity, initialized to 1
  const [quantity, setQuantity] = useState(1); 

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  // NEW: Handle quantity change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10); // Convert input to integer
    // Ensure quantity is at least 1, or 1 if input is empty/invalid
    setQuantity(value > 0 ? value : 1); 
  };

  const handleAddClick = () => {
    const price = isOffer ? pizza.prices.combo : pizza.prices[selectedSize];
    
    // Construct the item object to be added to the cart
    onAddToCart({
      id: pizza.id,
      name: pizza.name,
      image: pizza.image,
      price: price,
      size: selectedSize, // Will be 'combo' for offers, 'small/medium/large' for pizzas
      quantity: quantity, // IMPORTANT: Include the current quantity here
      isOffer: isOffer, // Pass this flag to cart for potential future use
      // If you have a product_uuid in your pizza object, you can add it here:
      // product_uuid: pizza.product_uuid || null, 
    });

    // Optionally, reset quantity to 1 after adding to cart
    setQuantity(1); 
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pizza.name}</h2>
        <p className="text-gray-700 text-sm mb-4">{pizza.description}</p>
        <div className="mb-4">
          {/* Conditional rendering for size selection: only show if NOT an offer */}
          {!isOffer && (
            <>
              <label htmlFor={`size-${pizza.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                Select Size:
              </label>
              <select
                id={`size-${pizza.id}`}
                value={selectedSize}
                onChange={handleSizeChange}
                className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
              >
                {Object.keys(pizza.prices).map((size) => (
                  <option key={size} value={size}>
                    {size.charAt(0).toUpperCase() + size.slice(1)} - Rs.{pizza.prices[size].toFixed(2)}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* NEW: Quantity Input Field */}
        <div className="mb-4">
            <label htmlFor={`quantity-${pizza.id}`} className="block text-gray-700 text-sm font-bold mb-2">
                Quantity:
            </label>
            <input
                type="number"
                id={`quantity-${pizza.id}`}
                value={quantity}
                onChange={handleQuantityChange}
                min="1" // Ensure quantity is at least 1
                className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
            />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-red-600">
            Rs.{isOffer ? pizza.prices.combo.toFixed(2) : pizza.prices[selectedSize].toFixed(2)}
          </span>
          <button
            onClick={handleAddClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;