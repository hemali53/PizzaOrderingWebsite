// import React, { useState } from "react";
// import pizza_5 from "../assets/pizza_5.jpg"; 
// import { Link } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     console.log("Form submitted with data:", { name, address, phone, email, password });
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Image Section */}
//       <div className="w-1/2 hidden lg:block">
//         <img
//           src={pizza_5}
//           alt="Pizza Delight"
//           className="object-cover w-full h-full"
//         />
//       </div>

//       {/* Form Section */}
//       <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-red-50 to-yellow-100 p-10">
//         <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
//         <header className="py-5 px-1 sm:px-2 lg:px-2">
//         <div className="flex justify-center">
//           <Link to="/" className="flex items-center">
//             <span className="ml-3 text-2xl font-bold text-red-500 font-serif underline"> Pizza Hub</span>
//           </Link>
//         </div>
//       </header>
//           <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Create Your Account</h2>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//                 Phone Number
//               </label>
//               <input
//                 type="text"
//                 id="phone number"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-yellow-500 text-white font-bold py-3 rounded-md hover:bg-yellow-600 transition"
//             >
//               Register
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account? <a href="/login" className="text-red-500 hover:underline">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // <<< 1. useNavigate එකතු කරන්න
import pizza_image from "../assets/pizza_image.jpg";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // <<< 2. useNavigate hook එක භාවිතා කරන්න

  // Changed the function to be async to handle the API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // <<< 3. API එකට දත්ත යවන කොටස මෙතනින් පටන් ගන්නවා
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // සාර්ථක නම්
        alert(data.message); // "Successfully registered!"
        navigate('/login'); // Login පිටුවට redirect කරන්න
      } else {
        // දෝෂයක් ඇත්නම්
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please check the console and try again.');
    }
    // <<< API එකට දත්ත යවන කොටස මෙතනින් අවසන් වෙනවා
  };

  return (
    <div className="flex min-h-screen">
      {/* Image Section */}
      <div className="w-1/2 hidden lg:block">
        <img
          src={pizza_image}
          alt="Pizza Delight"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-gradient-to-br from-red-50 to-yellow-100 p-10">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <header className="py-5 px-1 sm:px-2 lg:px-2">
            <div className="flex justify-center">
              <Link to="/" className="flex items-center">
                <span className="ml-3 text-2xl font-bold text-red-500 font-serif underline"> Pizza Hub</span>
              </Link>
            </div>
          </header>
          <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* --- No changes needed in the input fields --- */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-red-500 hover:underline">Login</Link> {/* Changed <a> to <Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;