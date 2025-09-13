import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const [error, setError] = useState(null);     // New state for error messages
  const [success, setSuccess] = useState(null); // New state for success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null);   // Clear previous errors
    setSuccess(null); // Clear previous success messages

    try {
      // *** CRITICAL FIX: Use the full URL for your backend API ***
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // If the response is not OK (e.g., 400, 500), parse the error from the backend
        const errorData = await response.json();
        console.error('Contact form submission error from server:', errorData);
        setError(errorData.message || 'Failed to send message. Please try again.');
        return; // Stop execution
      }

      // If response is OK (e.g., 200, 201), parse the success data
      const data = await response.json();
      console.log('Contact message sent successfully!', data);
      setSuccess(data.message || 'Your message has been sent successfully!');

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

    } catch (networkError) {
      // This catches true network errors (e.g., server not running, CORS issues)
      console.error('Network error during contact form submission:', networkError);
      setError('A network error occurred. Please ensure the server is running and try again.');
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-red-100 min-h-screen">
      {/* Header */}
      <header>
        <div className="bg-red-700 container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-extrabold text-white">🍕 PizzaHub</h1>
          <nav className="hidden md:flex space-x-6 text-white font-medium">
            <a href="/" className="hover:text-yellow-300 ">Home</a>
            <a href="/menu" className="hover:text-yellow-300 ">Menu</a>
            <a href="/offers" className="hover:text-yellow-300 ">Offers</a>
            <a href="/about" className="hover:text-yellow-300 ">About</a>
            <a href="/contact" className="text-yellow-400 font-semibold">Contact</a>
          </nav>
          <div className="space-x-4">
            <a href="/login" className="bg-white text-black px-4 py-2 rounded-full hover:bg-red-700 transition">Login</a>
            <a href="/register" className="bg-white text-black px-4 py-2 rounded-full hover:bg-red-700 transition">Register</a>
          </div>
        </div>
      </header>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 mb-10"> {/* Added mt-10 mb-10 for spacing */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">📞 Contact Us</h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or want to order by phone? Fill out the form below or call us directly!
        </p>

        {/* Success and Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {success}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="enter your email"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="your phone number"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
            disabled={loading} // Disable button while sending
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;