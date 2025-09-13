import React from 'react';
//import pizza_1 from '../assets/pizza_1.jpg';
import pizza_2 from '../assets/pizza_2.jpg';
//import pizza_2 from '../assets/pizza_2.jpg';
import image_2 from '../assets/image_2.jpg';
import pic1 from '../assets/pic1.jpeg';
import pic3 from '../assets/pic3.jpeg';
const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-extrabold text-red-600">🍕 PizzaHub</h1>
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="/" className="hover:text-red-500">Home</a>
            <a href="/menu" className="hover:text-red-500">Menu</a>
            <a href="/offers" className="hover:text-red-500">Offers</a>
            <a href="/about" className="hover:text-red-500">About</a>
            <a href="/contact" className="hover:text-red-500">Contact</a>
          </nav>
          <div className="space-x-4">
            <a href="/admin-login" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">Admin Login</a>
            <a href="/login" className="text-red-600 border border-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition">Login</a>
            <a href="/register" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">Register</a>
          </div>
        </div>
      </header>

 {/* Hero Section */}
      <section
        className="relative h-[500px] bg-center bg-cover flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${image_2})` }}
      >
        <div className="absolute inset-0 bg- bg-opacity-60"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl font-bold mb-4">Delicious Pizzas, Just a Click Away</h2>
          <p className="text-xl mb-6">Hot, fresh, and delivered fast—satisfy your cravings now.</p>
          <a href="/order" className="bg-yellow-400 text-black py-3 px-6 rounded-full text-lg font-semibold hover:bg-yellow-500 transition">Order Now</a>
        </div>
      </section>


      {/* Featured Pizzas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">Our Best Pizzas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[{
              img: pic1,
              title: "Margherita Pizza",
              desc: "Classic tomato sauce, fresh mozzarella, and basil.",
              price: "Rs.1700.00"
            }, {
              img: pizza_2,
              title: "Pepperoni Pizza",
              desc: "Loaded with pepperoni, cheese, and tomato sauce.",
              price: "Rs.2000.00"
            }, {
              img: pic3,
              title: "Veggie Supreme",
              desc: "A healthy mix of fresh veggies on a cheesy pizza base.",
              price: "Rs.2500.00"
            }].map((pizza, index) => (
              <div key={index} className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform">
                <img src={pizza.img} alt={pizza.title} className="w-full h-52 object-cover"/>
                <div className="p-6 text-left">
                  <h4 className="text-xl font-semibold text-gray-800">{pizza.title}</h4>
                  <p className="text-gray-600 mt-2">{pizza.desc}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-semibold text-red-600">{pizza.price}</span>
                    <a href="/order" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition">Order</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="container mx-auto text-center">
          <p className="mb-2">&copy; 2025 PizzaHub. All Rights Reserved.</p>
          <p className="text-sm text-gray-400">Made with ❤️ for pizza lovers everywhere.</p>
          <div className="mt-4 flex justify-center space-x-4 text-gray-400">
            <span>📘</span>
            <span>🐦</span>
            <span>📸</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
