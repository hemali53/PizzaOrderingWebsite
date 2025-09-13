// src/pages/AdminLoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Your specific admin credentials
        const ADMIN_USERNAME = 'admin';
        const ADMIN_PASSWORD = 'password@123';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            console.log('Admin Login Successful!');
            // In a real app, you'd get a token from your backend and store it.
            // For this demo, we'll store a simple flag or dummy token.
            localStorage.setItem('isAdminLoggedIn', 'true'); // Store a flag
            // Or a dummy token: localStorage.setItem('adminToken', 'dummy_admin_jwt_token');

            navigate('/admin'); // Navigate to the main Admin Panel dashboard
        } else {
            setError('Invalid Admin Username or Password.');
            console.log('Admin Login Failed!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Admin Login</h1>
                <form onSubmit={handleAdminLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="admin-username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="admin-username"
                            type="text" // Assuming username, not email
                            placeholder="Admin Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="admin-password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="admin-password"
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Login as Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;