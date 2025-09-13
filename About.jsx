import React from 'react';
import about_page from '../assets/about_page.jpg';

const About = () => {
  return (
    <div className="relative min-h-screen font-sans">
   
      {/* Overlay Content */}
      <div className="relative z-10 bg-gradient-to-br from-red-100 via-white to-yellow-50 min-h-screen">

        {/* Navigation Bar */}
        <nav>
          <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-white">🍕 PizzaHub</h1>
          <div className="space-x-6 text-white font-medium">
            <a href="/" className="hover:text-yellow-300  transition">Home</a>
            <a href="/menu" className="hover:text-yellow-300  transition">Menu</a>
              <a href="/offers" className="hover:text-yellow-300 transition">Offers</a>
              <a href="/about" className="text-yellow-400 font-semibold">About</a>
              <a href="/contact" className="hover:text-yellow-300 transition">Contact</a>
            </div>
          </div>
        </nav>

        {/* About Section */}
        <section className="max-w-5xl mx-auto mt-12 px-6">
          <div className="bg-white border-l-8 border-red-600 shadow-xl rounded-lg p-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center italic">
              "Crafting happiness one slice at a time!"
            </p>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image */}
        <img 
          src={ about_page }
          alt="Delicious Pizza" 
          className="rounded-lg shadow-lg w-200"
        />
        </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to <span className="font-semibold text-red-600">PizzaHub</span>! We are passionate about bringing
              you the ultimate pizza experience right to your doorstep. Whether you’re into timeless classics like the
              Margherita or craving something bold and cheesy, we’ve got it all—hot, fresh, and just a click away.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">🍕 Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our mission is simple: deliver delicious, high-quality pizzas quickly and conveniently. We aim to create
              a user-friendly platform where ordering your favorite pizza is fast, seamless, and satisfying.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">🌟 Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We envision becoming every pizza lover’s go-to destination. With constant innovation, tech upgrades, and
              customer feedback, we strive to make your pizza journey smoother, tastier, and more exciting each time.
            </p>

            {/* Contact Information */}
            <div className="mt-10 bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-600 mb-4">📞 Contact Us</h3>
              <p className="text-gray-700"><span className="font-medium">Phone:</span> +94 123 456 789</p>
              <p className="text-gray-700"><span className="font-medium">Email:</span> contact@pizzadelight.com</p>
              <p className="text-gray-700"><span className="font-medium">Address:</span> 123 Pizza Street, Moragolla, Sri Lanka</p>
            </div>
            <div className="text-center mt-10">
              <p className="text-xl font-semibold text-gray-800">Thank you for choosing PizzaHub!</p>
              <p className="text-gray-500">We can’t wait to serve you a slice of happiness 🍕</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;


