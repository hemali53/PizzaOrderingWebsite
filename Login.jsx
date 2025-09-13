// import React, { useState } from 'react';
// import log_image from '../assets/log_image.jpg';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Logged in with:', email, password);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       {/* Image Section */}
//       <div className="lg:w-1/2 hidden lg:block">
//         <img
//           src={log_image}
//           alt="Pizza"
//           className="object-cover w-full h-full"
//         />
//       </div>

//       {/* Login Form Section */}
      
//       <div className="flex items-center justify-center  lg:w-1/2 bg-gray-300 bg-opacity-90 ">
//         <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md">
//       <header className="py-5 px-1 sm:px-2 lg:px-2">
//         <div className="flex justify-center">
//           <Link to="/" className="flex items-center">
//             <span className="ml-3 text-2xl font-bold text-red-500 font-serif underline"> Pizza Hub</span>
//           </Link>
//         </div>
//       </header>
//           <h2 className="text-3xl font-bold font-serif  text-red-700 text-center mb-2">Login</h2>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label htmlFor="email" className="block text-gray-800 font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-gray-800 font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-yellow-500 text-white font-bold py-3 rounded-md hover:bg-yellow-600 transition"
//             >
//               <a href="/">Login</a>
              
//             </button>

//             <p className="text-center text-gray-700 mt-4">
//               Don’t have an account?
//               <a href="/register" className="text-red-600 hover:underline ml-1">Sign Up</a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import log_image from '../assets/log_image.jpg'; 
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate(); 

  const handleLogin = async (e) => { 
    e.preventDefault();
    setErrorMessage(''); 

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      // Backend API 
      const response = await fetch('http://localhost:5000/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login 
        console.log('Login successful:', data.message);
  
        navigate('/'); 
      } else {
        // Login 
        console.error('Login failed:', data.message);
        setErrorMessage(data.message || 'Invalid email or password.'); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An unexpected error occurred. Please try again.'); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src={log_image} 
          alt="Pizza"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center lg:w-1/2 bg-gray-300 bg-opacity-90 ">
        <div className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md">
          <header className="py-5 px-1 sm:px-2 lg:px-2">
            <div className="flex justify-center">
              <Link to="/" className="flex items-center">
                <span className="ml-3 text-2xl font-bold text-red-500 font-serif underline"> Pizza Hub</span>
              </Link>
            </div>
          </header>
          <h2 className="text-3xl font-bold font-serif text-red-700 text-center mb-2">Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-800 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required // HTML validation 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-800 font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required 
              />
            </div>

            {errorMessage && ( // errorMessage 
              <p className="text-red-500 text-center text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-bold py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Login 
            </button>

            <p className="text-center text-gray-700 mt-4">
              Don’t have an account?
              <Link to="/register" className="text-red-600 hover:underline ml-1">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
