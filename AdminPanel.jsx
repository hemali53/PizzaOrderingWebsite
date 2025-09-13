// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const AdminPanel = () => { 
// const [isLoggedIn, setIsLoggedIn] = useState(false);
// const [activeTab, setActiveTab] = useState('dashboard');
// const [showMenuItemModal, setShowMenuItemModal] = useState(false);
// const [currentMenuItem, setCurrentMenuItem] = useState(null);
// const [showMessageModal, setShowMessageModal] = useState(false);
// const [currentMessage, setCurrentMessage] = useState(null);
// const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7));
// const navigate = useNavigate();
// const [users, setUsers] = useState([]);
// const [messages, setMessages] = useState([]);
// const [loading, setLoading] = useState(false);
// const [messagesError, setMessagesError] = useState(null);

// const [orders, setOrders] = useState([]);
// const [ordersLoading, setOrdersLoading] = useState(true); // Initialize as true, as we'll fetch on mount
// const [ordersError, setOrdersError] = useState(null);

// //useEffect(() => {
//  const fetchOrders = useCallback(async () => {
//  setOrdersLoading(true); // Start loading
//  setOrdersError(null);   // Clear any previous errors
//  try {
//   const response = await fetch('http://localhost:5000/api/orders'); // Replace with your server URL
//  if (!response.ok) {
//  throw new Error(`HTTP error! status: ${response.status}`);
//  }
//  const data = await response.json();
//  setOrders(data);
//  //console.log("Fetched Orders:", data);
//  } catch (error) {
//  console.error('Error fetching orders:', error);
//  setOrdersError(error);
//  } finally {
//  setOrdersLoading(false);
//  }
 
// }, []);


//   // Form states
//   const [menuForm, setMenuForm] = useState({
//     name: '',
//     description: '',
//     image_url: '',
//     small_price: '',
//     medium_price: '',
//     large_price: '',
//     is_offer: false,
//     combo_price: '',
//     category: 'pizza',
//     is_active: true,
//   });

//   const [loginForm, setLoginForm] = useState({
//     username: '',
//     password: ''
//   });

//   const [messageForm, setMessageForm] = useState({
//     subject: '',
//     message: ''
//   });

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       navigate('/admin');
//     }
//   }, [navigate]);

//   // Fetch users function
// const fetchUsers = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch('http://localhost:5000/api/users', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//       }
//     });
//     const data = await response.json();
//     if (response.ok) {
//       setUsers(data);
//     } else {
//       throw new Error(data.message || 'Failed to fetch users');
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     alert('Error fetching users: ' + error.message);
//   } finally {
//     setLoading(false);
//   }
// };
// const handleUpdateUserStatus = async (userId, newStatus) => {
//   if (!window.confirm(`Are you sure you want to change this user's status to ${newStatus}?`)) {
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:5000/api/users/${userId}/status`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//       },
//       body: JSON.stringify({ status: newStatus })
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//       alert(`User status updated to ${newStatus}`);
//       fetchUsers(); // Refresh the user list
//     } else {
//       throw new Error(data.message || 'Failed to update user status');
//     }
//   } catch (error) {
//     console.error('Error updating user status:', error);
//     alert('Error updating user status: ' + error.message);
//   }
// };
// // Call fetchUsers when users tab is active
// useEffect(() => {
//   if (activeTab === 'users') {
//     fetchUsers();
//   }
// }, [activeTab]);

//  useEffect(() => {
//  const fetchMessages = async () => {
// setLoading(true);
//  setMessagesError(null);
//  try {
//  const response = await fetch('http://localhost:5000/api/messages'); // Replace with your server URL
//  if (!response.ok) {
// throw new Error('Failed to fetch messages');
//  }
//  const data = await response.json();

//   const formattedMessages = data.map(msg => ({
//           id: msg.id,
//           name: msg.name,
//           email: msg.email,
//           phone: msg.phone, // Assuming you might want to display phone
//           subject: 'Contact Inquiry', // Default subject, as it's not in DB table
//           message: msg.message,
//           status: 'unread', // Default status, you might want to add a 'status' column in DB
//           received_at: msg.submitted_at // Use 'submitted_at' from DB as 'received_at'
//         }));
        
//  setMessages(formattedMessages);
// } catch (err) {
//  console.error('Error fetching messages:', err);
//  setMessagesError(err.message || 'Could not load messages.');
//  } finally {
//  setLoading(false);
//  }
//  };

//  if (activeTab === 'messages') {
//  fetchMessages();
//  }
//  }, [activeTab]);

//   const dummyMenuItems = [
//     { id: 1, name: 'Margherita', category: 'pizza', small_price: 5.00, medium_price: 8.00, large_price: 11.00, is_active: true, is_offer: false, description: 'Classic delight with 100% real mozzarella cheese', image_url: 'https://placehold.co/100x100/FF5733/FFFFFF?text=Pizza' },
//     { id: 2, name: 'Pepperoni Feast', category: 'pizza', small_price: 6.50, medium_price: 10.00, large_price: 13.50, is_active: true, is_offer: false, description: 'Loaded with pepperoni & extra cheese', image_url: 'https://placehold.co/100x100/FF5733/FFFFFF?text=Pizza' },
//     { id: 101, name: 'Family Combo', category: 'offer', combo_price: 25.00, is_active: true, is_offer: true, description: '1 Large Pizza, 2 Sides, 1.5L Drink', image_url: 'https://placehold.co/100x100/FFC300/000000?text=Combo' },
//   ];

//   // Monthly report data
//   const monthlyReportData = {
//     totalOrders: 125,
//     completedOrders: 110,
//     revenue: 2850.75,
//     popularItems: [
//       { name: 'Pepperoni Feast', count: 45 },
//       { name: 'Margherita', count: 38 },
//       { name: 'Family Combo', count: 22 }
//     ],
//     customerGrowth: 15,
//     paymentMethods: {
//       card: 78,
//       cash: 42,
//       online: 5
//     }
//   };

//   // Form handlers
//   const handleMenuFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setMenuForm(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleLoginFormChange = (e) => {
//     const { name, value } = e.target;
//     setLoginForm(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleMessageFormChange = (e) => {
//     const { name, value } = e.target;
//     setMessageForm(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Action handlers
//   const handleLogin = (e) => {
//     e.preventDefault();
//     // In a real app, you would verify credentials with backend
//     console.log('Login attempt with:', loginForm);
//     localStorage.setItem('adminToken', 'dummy-token-123');
//     setIsLoggedIn(true);
//     navigate('/admin');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     setIsLoggedIn(false);
//     navigate('/admin');
//   };

//   const handleAddMenuItem = () => {
//     setCurrentMenuItem(null);
//     setMenuForm({
//       name: '', description: '', image_url: '',
//       small_price: '', medium_price: '', large_price: '',
//       is_offer: false, combo_price: '', category: 'pizza', is_active: true,
//     });
//     setShowMenuItemModal(true);
//   };

//   const handleEditMenuItem = (item) => {
//     setCurrentMenuItem(item);
//     setMenuForm({
//       name: item.name,
//       description: item.description,
//       image_url: item.image_url || '',
//       small_price: item.small_price || '',
//       medium_price: item.medium_price || '',
//       large_price: item.large_price || '',
//       is_offer: item.is_offer,
//       combo_price: item.is_offer ? item.combo_price : '',
//       category: item.category,
//       is_active: item.is_active,
//     });
//     setShowMenuItemModal(true);
//   };

//   const handleViewMessage = (message) => {
//     setCurrentMessage(message);
//     setMessageForm({
//       subject: `Re: ${message.subject}`,
//       message: `\n\n---- Original Message ----\nFrom: ${message.name} <${message.email}>\nSubject: ${message.subject}\n\n${message.message}`
//     });
//     setShowMessageModal(true);
//     // Mark as read
//     //message.status = 'read';
//     setMessages(prevMessages => 
//         prevMessages.map(msg => 
//             msg.id === message.id ? { ...msg, status: 'read' } : msg
//         )
//     );
//   };

//   const handleSubmitMenuItem = (e) => {
//     e.preventDefault();
//     console.log('Submitting Menu Item:', menuForm, 'Mode:', currentMenuItem ? 'Edit' : 'Add');
//     setShowMenuItemModal(false);
//     alert('Item saved (UI Demo)');
//   };

//   const handleSubmitMessage = (e) => {
//     e.preventDefault();
//     console.log('Sending reply:', messageForm);
//     setShowMessageModal(false);
//     alert('Reply sent (UI Demo)');
//   };

//   const handleDeleteMenuItem = (id) => {
//     if (window.confirm(`UI Demo: Delete item with ID ${id}?`)) {
//       console.log('Deleting Menu Item ID:', id);
//       alert('Item deleted (UI Demo)');
//     }
//   };

// //   const handleUpdateOrderStatus = (orderId, newStatus) => {
// //     console.log(`UI Demo: Updating Order ${orderId} to status: ${newStatus}`);
// //     alert(`Order ${orderId} status updated to ${newStatus} (UI Demo)`);
// // };

//       // Effect hook to fetch orders when 'orders' tab is active
//     useEffect(() => {
//         if (activeTab === 'orders') {
//             fetchOrders();
//         }
//     }, [activeTab, fetchOrders]);

//     // Function to handle updating order status
//     const handleUpdateOrderStatus = async (orderId, newStatus) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             // If update is successful, re-fetch orders to reflect the change
//             fetchOrders();
//             alert(`Order ${orderId} status updated to ${newStatus}!`);
//         } catch (error) {
//             console.error('Failed to update order status:', error);
//             alert(`Error updating order status for order ${orderId}: ${error.message}`);
//         }
//     };

 

//   // Login Page
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
//           <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Admin Login</h1>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
//               <input 
//                 type="text" 
//                 name="username" 
//                 value={loginForm.username} 
//                 onChange={handleLoginFormChange} 
//                 className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" 
//                 required 
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//               <input 
//                 type="password" 
//                 name="password" 
//                 value={loginForm.password} 
//                 onChange={handleLoginFormChange} 
//                 className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" 
//                 required 
//               />
//             </div>
//             <button 
//               type="submit" 
//               className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // Main Admin Panel
//   return (
//     <div className="flex min-h-screen bg-gray-100 font-inter text-gray-800">
//       {/* Sidebar Navigation */}
//       <aside className="w-64 bg-red-800 text-white flex flex-col shadow-lg">
//         <div className="p-6 text-3xl font-extrabold text-red-200 border-b border-red-700">
//           🍕 Admin Dashboard
//         </div>
//         <nav className="flex-1 px-4 py-6 space-y-2">
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'dashboard' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('dashboard')}
//           >
//             Dashboard
//           </button>
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'users' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('users')}
//           >
//             Users
//           </button>
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'menu' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('menu')}
//           >
//             Menu & Offers
//           </button>
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'orders' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('orders')}
//           >
//             Orders
//           </button>
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'messages' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('messages')}
//           >
//             Messages
//           </button>
//           <button
//             className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
//               ${activeTab === 'reports' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
//             onClick={() => setActiveTab('reports')}
//           >
//             Reports
//           </button>
//         </nav>
//         <div className="p-4 border-t border-red-700 space-y-3">
//           <Link to="/" className="block text-center py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-lg font-semibold transition-colors duration-200">
//             Go to Store
//           </Link>
//           <button 
//             onClick={handleLogout}
//             className="w-full text-center py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg text-lg font-semibold transition-colors duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <h1 className="text-4xl font-extrabold text-red-700 mb-8">
//             {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Management
//           </h1> 
//           </div>

//           {loading && <div className="text-center text-lg text-gray-600">Loading messages...</div>}
//           {messagesError && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//             <strong className="font-bold">Error!</strong>
//             <span className="block sm:inline"> {messagesError}</span>
//           </div>
//         )}

//         {/* Dashboard Tab Content */}
//         {activeTab === 'dashboard' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Unread Messages Card */}
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-purple-800">Unread Messages</h3>
//                 <p className="text-4xl font-bold text-purple-900 mt-2">{messages.filter(msg => msg.status === 'unread').length}</p>
//               </div>
//               <div className="text-purple-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.9 5.3C11.5 13.9 12.5 13.9 13.1 13.7l7.9-5.3M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 6-9-6M3 16l4-4m14 4l-4-4" />
//                 </svg>
//               </div>
//             </div>

//             {/* Other dashboard cards (Users, Orders, Revenue) */}
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//               <h3 className="text-xl font-semibold text-blue-800">Total Users</h3>
//               <p className="text-4xl font-bold text-blue-900 mt-2">{users.length}</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//               <h3 className="text-xl font-semibold text-green-800">Total Orders (This Month)</h3>
//               <p className="text-4xl font-bold text-green-900 mt-2">120</p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//               <h3 className="text-xl font-semibold text-orange-800">Total Revenue (This Month)</h3>
//               <p className="text-4xl font-bold text-orange-900 mt-2">$2500</p>
//             </div>

//             {/* Recent Messages Card */}
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 col-span-full md:col-span-1"> {/* Adjusted colspan */}
//               <h3 className="text-2xl font-semibold mb-4 text-gray-700">Recent Messages</h3>
//               <div className="space-y-4">
//                 {messages.length === 0 ? (
//                   <p className="text-gray-500">No recent messages.</p>
//                 ) : (
//                   messages.slice(0, 3).map(message => (
//                     <div
//                       key={message.id}
//                       className={`border-b border-gray-100 pb-4 last:border-0 last:pb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
//                       onClick={() => handleViewMessage(message)}
//                     >
//                       <div className="flex justify-between items-start">
//                         <p className="font-medium">{message.subject}</p>
//                         {message.status === 'unread' && (
//                           <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600 truncate">{message.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{message.name} • {new Date(message.received_at).toLocaleDateString()}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
          
//           {/* Update your users table to use real data: */}
//           {activeTab === 'users' && (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-semibold text-gray-700">User Management</h3>
//                 <button 
//                   onClick={fetchUsers}
//                   className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
//                 >
//                   Refresh
//                 </button>
//               </div>
              
//               {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto rounded-lg border border-gray-200">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     {/* Table headers remain the same */}
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {users.length === 0 ? (
//                         <tr>
//                           <td colSpan="7" className="py-4 px-6 text-center text-gray-500">
//                             {loading ? 'Loading users...' : 'No users found.'}
//                           </td>
//                         </tr>
//                       ) : (
//                         users.map((user) => (
//                           <tr key={user.id} className="hover:bg-gray-50">
//                             <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
//                             <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
//                             <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
//                             <td className="py-4 px-6 whitespace-nowrap text-sm">
//                               <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
//                                 {user.role}
//                               </span>
//                             </td>
//                             <td className="py-4 px-6 whitespace-nowrap text-sm">
//                               <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                 {user.status}
//                               </span>
//                             </td>
//                             <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
//                               {new Date(user.registered_at).toLocaleDateString()}
//                             </td>
//                             <td className="py-4 px-6">
//                               <div className="flex items-center justify-center space-x-2">
//                                 <select
//                                   value={user.status}
//                                   onChange={(e) => handleUpdateUserStatus(user.id, e.target.value)}
//                                   className="border border-gray-300 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//                                 >
//                                   <option value="active">Active</option>
//                                   <option value="suspended">Suspend</option>
//                                   <option value="banned">Ban</option>
//                                 </select>
                                
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Menu Items Tab Content */}
//           {activeTab === 'menu' && (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-semibold text-gray-700">Manage Menu Items</h3>
//                 <button
//                   onClick={handleAddMenuItem}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full transition-colors duration-300 shadow-md flex items-center space-x-2"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                   </svg>
//                   <span>Add New Item</span>
//                 </button>
//               </div>
//               <div className="overflow-x-auto rounded-lg border border-gray-200">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prices ($)</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
//                       <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {dummyMenuItems.length === 0 ? (
//                       <tr><td colSpan="7" className="py-4 px-6 text-center text-gray-500">No menu items found.</td></tr>
//                     ) : (
//                       dummyMenuItems.map((item) => (
//                         <tr key={item.id} className="hover:bg-gray-50">
//                           <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
//                           <td className="py-4 px-6">
//                             <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-md" onError={(e) => e.target.src = 'https://placehold.co/48x48/CCCCCC/000000?text=N/A'} />
//                           </td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
//                             {item.is_offer ? (
//                               `Combo: $${item.combo_price.toFixed(2)}`
//                             ) : (
//                               `S:$${item.small_price.toFixed(2)} M:$${item.medium_price.toFixed(2)} L:$${item.large_price.toFixed(2)}`
//                             )}
//                           </td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm">
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                               {item.is_active ? 'Yes' : 'No'}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6">
//                             <div className="flex items-center justify-center space-x-2">
//                               <button
//                                 onClick={() => handleEditMenuItem(item)}
//                                 className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteMenuItem(item.id)}
//                                 className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Add/Edit Menu Item Modal */}
//               {showMenuItemModal && (
//                 <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//                   <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 transform scale-95 animate-fade-in-up">
//                     <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//                       {currentMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
//                     </h3>
//                     <form onSubmit={handleSubmitMenuItem} className="space-y-5">
//                       <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//                         <input type="text" name="name" value={menuForm.name} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" required />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
//                         <textarea name="description" value={menuForm.description} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" rows="3" required></textarea>
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
//                         <input type="text" name="image_url" value={menuForm.image_url} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" placeholder="e.g., https://example.com/pizza.jpg" />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
//                         <select name="category" value={menuForm.category} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400">
//                           <option value="pizza">Pizza</option>
//                           <option value="offer">Offer</option>
//                           <option value="side">Side</option>
//                           <option value="drink">Drink</option>
//                         </select>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <input type="checkbox" id="is_offer" name="is_offer" checked={menuForm.is_offer} onChange={handleMenuFormChange} className="form-checkbox h-5 w-5 text-red-600 rounded" />
//                         <label htmlFor="is_offer" className="text-gray-700 text-base font-medium">Is Offer?</label>
//                       </div>
//                       {menuForm.is_offer ? (
//                         <div>
//                           <label className="block text-gray-700 text-sm font-bold mb-2">Combo Price ($):</label>
//                           <input type="number" name="combo_price" value={menuForm.combo_price} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" step="0.01" required />
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                           <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Small Price ($):</label>
//                             <input type="number" name="small_price" value={menuForm.small_price} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" step="0.01" />
//                           </div>
//                           <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Medium Price ($):</label>
//                             <input type="number" name="medium_price" value={menuForm.medium_price} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" step="0.01" />
//                           </div>
//                           <div>
//                             <label className="block text-gray-700 text-sm font-bold mb-2">Large Price ($):</label>
//                             <input type="number" name="large_price" value={menuForm.large_price} onChange={handleMenuFormChange} className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400" step="0.01" />
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex items-center space-x-3">
//                         <input type="checkbox" id="is_active" name="is_active" checked={menuForm.is_active} onChange={handleMenuFormChange} className="form-checkbox h-5 w-5 text-red-600 rounded" />
//                         <label htmlFor="is_active" className="text-gray-700 text-base font-medium">Is Active?</label>
//                       </div>
//                       <div className="flex justify-end space-x-4 mt-6">
//                         <button type="button" onClick={() => setShowMenuItemModal(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow">
//                           Cancel
//                         </button>
//                         <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow">
//                           {currentMenuItem ? 'Update Item' : 'Add Item'}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Orders Tab Content */}
//           {activeTab === 'orders' && (
//             <div>
//               <h3 className="text-2xl font-semibold mb-4 text-gray-700">Customer Orders</h3>
//               <div className="overflow-x-auto rounded-lg border border-gray-200">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total ($)</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                       <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered At</th>
//                       <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {/* {dummyOrders.length === 0 ? (
//                       <tr><td colSpan="10" className="py-4 px-6 text-center text-gray-500">No orders found.</td></tr>
//                     ) : (
//                       dummyOrders.map((order) => ( */}
//                                   {ordersLoading ? (
//                         <tr><td colSpan="10" className="py-4 px-6 text-center text-gray-500">Loading orders...</td></tr>
//                         ) : ordersError ? (
//                         <tr><td colSpan="10" className="py-4 px-6 text-center text-red-500">Error: {ordersError.message}</td></tr>
//                         ) : orders.length === 0 ? (
//                         <tr><td colSpan="10" className="py-4 px-6 text-center text-gray-500">No orders found.</td></tr>
//                         ) : (
//                         orders.map((order) => (
//                         <tr key={order.id} className="hover:bg-gray-50">
//                           <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{order.customer_name}</td>
//                           <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{order.delivery_address}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{order.phone_number}</td>
//                           <td className="py-4 px-6 text-sm text-gray-700">
//                             {order.items_json && JSON.parse(order.items_json).map((item, i) => (
//                               <div key={i} className="text-xs">
//                                 {item.name} ({item.size}) - ${item.price ? item.price.toFixed(2) : '0.00'}
//                               </div>
//                             ))}
//                           </td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm font-bold text-red-600">${order.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm">
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                               ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
//                             `}>
//                               {order.payment_method} ({order.payment_status})
//                             </span>
//                           </td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm">
//                             <span className={`px-2 py-1 rounded-full text-xs font-semibold
//                               ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
//                               ${order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' : ''}
//                               ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
//                               ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
//                             `}>
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{new Date(order.ordered_at).toLocaleString()}</td>
//                           <td className="py-4 px-6">
//                             <select
//                               value={order.status}
//                               onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
//                               className="border border-gray-300 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
//                             >
//                               <option value="Pending">Pending</option>
//                               <option value="Preparing">Preparing</option>
//                               <option value="Delivered">Delivered</option>
//                               <option value="Cancelled">Cancelled</option>
//                             </select>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
          
//           {/* Messages Tab Content */}
//         {activeTab === 'messages' && (
//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-700">Customer Messages</h3>
//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
//                     <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
//                     <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {messages.length === 0 ? (
//                     <tr><td colSpan="6" className="py-4 px-6 text-center text-gray-500">No messages found.</td></tr>
//                   ) : (
//                     messages.map((message) => (
//                       <tr
//                         key={message.id}
//                         className={`hover:bg-gray-50 cursor-pointer ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
//                         onClick={() => handleViewMessage(message)}
//                       >
//                         <td className="py-4 px-6 whitespace-nowrap text-sm">
//                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${message.status === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                             {message.status}
//                           </span>
//                         </td>
//                         <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
//                           <div className="font-medium">{message.name}</div>
//                           <div className="text-xs text-gray-500">{message.email}</div>
//                         </td>
//                         <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-700">{message.subject}</td>
//                         <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{message.message}</td>
//                         <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{new Date(message.received_at).toLocaleString()}</td>
//                         <td className="py-4 px-6 whitespace-nowrap text-sm">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleViewMessage(message);
//                             }}
//                             className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-md text-sm font-medium transition-colors duration-200"
//                           >
//                             Reply
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Message Reply Modal */}
//             {showMessageModal && currentMessage && (
//               <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 transform scale-95 animate-fade-in-up">
//                   <div className="flex justify-between items-start mb-6">
//                     <h3 className="text-2xl font-bold text-gray-800">Reply to Message</h3>
//                     <button
//                       onClick={() => setShowMessageModal(false)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>

//                   <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-bold">{currentMessage.name} &lt;{currentMessage.email}&gt;</h4>
//                         <p className="text-sm text-gray-600">{new Date(currentMessage.received_at).toLocaleString()}</p>
//                       </div>
//                       <span className={`px-2 py-1 rounded-full text-xs font-semibold ${currentMessage.status === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//                         {currentMessage.status}
//                       </span>
//                     </div>
//                     <h5 className="mt-2 font-medium">{currentMessage.subject}</h5>
//                     <p className="mt-2 text-gray-700 whitespace-pre-line">{currentMessage.message}</p>
//                   </div>

//                   <form onSubmit={handleSubmitMessage} className="space-y-5">
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
//                       <input
//                         type="text"
//                         name="subject"
//                         value={messageForm.subject}
//                         onChange={handleMessageFormChange}
//                         className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
//                       <textarea
//                         name="message"
//                         value={messageForm.message}
//                         onChange={handleMessageFormChange}
//                         className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400"
//                         rows="6"
//                         required
//                       ></textarea>
//                     </div>
//                     <div className="flex justify-end space-x-4 mt-6">
//                       <button
//                         type="button"
//                         onClick={() => setShowMessageModal(false)}
//                         className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow"
//                       >
//                         Send Reply
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//           {/* Reports Tab Content */}
//           {activeTab === 'reports' && (
//             <div className="space-y-8">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-2xl font-semibold text-gray-700">Monthly Sales Report</h3>
//                 <div className="flex items-center space-x-4">
//                   <input 
//                     type="month" 
//                     value={reportMonth} 
//                     onChange={(e) => setReportMonth(e.target.value)}
//                     className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-400"
//                   />
//                   <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full transition-colors duration-300 shadow">
//                     Generate PDF
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                   <h4 className="text-xl font-semibold mb-4 text-gray-700">Summary</h4>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Total Orders:</span>
//                       <span className="font-bold">{monthlyReportData.totalOrders}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Completed Orders:</span>
//                       <span className="font-bold text-green-600">{monthlyReportData.completedOrders}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Total Revenue:</span>
//                       <span className="font-bold text-red-600">${monthlyReportData.revenue.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">New Customers:</span>
//                       <span className="font-bold text-blue-600">+{monthlyReportData.customerGrowth}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                   <h4 className="text-xl font-semibold mb-4 text-gray-700">Payment Methods</h4>
//                   <div className="space-y-3">
//                     {Object.entries(monthlyReportData.paymentMethods).map(([method, count]) => (
//                       <div key={method}>
//                         <div className="flex justify-between items-center mb-1">
//                           <span className="capitalize">{method}:</span>
//                           <span className="font-medium">{count} orders</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2.5">
//                           <div 
//                             className="bg-red-600 h-2.5 rounded-full" 
//                             style={{ width: `${(count / monthlyReportData.totalOrders) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                 <h4 className="text-xl font-semibold mb-4 text-gray-700">Popular Items</h4>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
//                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
//                         <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {monthlyReportData.popularItems.map((item, index) => (
//                         <tr key={index}>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.count}</td>
//                           <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
//                             <div className="flex items-center">
//                               <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
//                                 <div 
//                                   className="bg-red-600 h-2.5 rounded-full" 
//                                   style={{ width: `${(item.count / monthlyReportData.totalOrders) * 100}%` }}
//                                 ></div>
//                               </div>
//                               <span>{Math.round((item.count / monthlyReportData.totalOrders) * 100)}%</span>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//                 <h4 className="text-xl font-semibold mb-4 text-gray-700">Daily Sales Trend</h4>
//                 <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
//                   {/* In a real app, this would be a chart component */}
//                   <p className="py-12">[Chart showing daily sales for the selected month would appear here]</p>
//                   <p>Sample data for {new Date(reportMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//       </main>  
        
//     </div>
//   );
// };

// export default AdminPanel;



import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    // Authentication state (for a real app, this would be managed with actual login logic)
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming admin is logged in for demo purposes
    const navigate = useNavigate();

    // Tab management state
    const [activeTab, setActiveTab] = useState('dashboard');

    // State for Menu Item Management
    const [menuItems, setMenuItems] = useState([]);
    const [menuItemsLoading, setMenuItemsLoading] = useState(false);
    const [menuItemsError, setMenuItemsError] = useState(null);
    const [showMenuItemModal, setShowMenuItemModal] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(null); // For editing: holds item data, null for new
    const [menuForm, setMenuForm] = useState({ // Form state for adding/editing menu items
        name: '',
        description: '',
        image_url: '',
        small_price: '',
        medium_price: '',
        large_price: '',
        is_offer: false,
        combo_price: '',
        category: 'pizza', // Default category
        is_active: true,
    });

    // State for Messages (assuming you have message management features)
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    // State for Reports (assuming you have reporting features)
    const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7));
// Dummy monthly report data (replace with actual API fetch later)
    const [monthlyReportData, setMonthlyReportData] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        topSellingItems: []
    });
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState(null);

    // State for Users (assuming you have user management features)
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [usersError, setUsersError] = useState(null);

    // State for Orders
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false); // Changed to false as it's fetched conditionally
    const [ordersError, setOrdersError] = useState(null);

    // --- Data Fetching Functions ---

    // Memoized function to fetch orders
    const fetchOrders = useCallback(async () => {
        setOrdersLoading(true);
        setOrdersError(null);
        try {
            const response = await fetch('http://localhost:5000/api/orders'); // Replace with your server URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrdersError(error);
        } finally {
            setOrdersLoading(false);
        }
    }, []); // Dependencies: if setOrders, setOrdersLoading, setOrdersError are stable from useState, they don't need to be in deps.

    // Memoized function to fetch users (placeholder)
    const fetchUsers = useCallback(async () => {
        setUsersLoading(true);
        try {
            // Replace with your actual API call to fetch users
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsersError(error);
        } finally {
            setUsersLoading(false);
        }
    }, []);

    // Memoized function to fetch messages (placeholder)
    const fetchMessages = useCallback(async () => {
        setMessagesLoading(true);
        setMessagesError(null);
        try {
            // Replace with your actual API call to fetch messages
            const response = await fetch('http://localhost:5000/api/messages');
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessagesError(error);
        } finally {
            setMessagesLoading(false);
        }
    }, []);

        // NEW: Memoized function to fetch menu items
    const fetchMenuItems = useCallback(async () => {
        setMenuItemsLoading(true);
        setMenuItemsError(null);
        try {
            const response = await fetch('http://localhost:5000/api/menu-items'); // API endpoint from server.js
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setMenuItemsError(error);
        } finally {
            setMenuItemsLoading(false);
        }
    }, []);

    // Memoized function to fetch monthly report data
    const fetchMonthlyReport = useCallback(async (month) => {
        setReportLoading(true);
        setReportError(null);
        try {
            const response = await fetch(`http://localhost:5000/api/reports/monthly?month=${month}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMonthlyReportData(data);
        } catch (error) {
            console.error('Error fetching monthly report:', error);
            setReportError(error);
        } finally {
            setReportLoading(false);
        }
    }, []); // No external dependencies, so empty array is fine for useCallback

    // --- Effect Hooks for Data Fetching based on Active Tab ---

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        } else if (activeTab === 'users') {
            fetchUsers();
        } else if (activeTab === 'messages') {
            fetchMessages();
        } else if (activeTab === 'menu') { 
            fetchMenuItems();
        } else if (activeTab === 'reports') {
            fetchMonthlyReport(reportMonth);
        }
        // Add more conditions for other tabs that need data on activation
    }, [activeTab, fetchOrders, fetchUsers, fetchMessages,fetchMonthlyReport, reportMonth]); // Include all memoized fetch functions as dependencies

    // --- Action Handlers ---

    // Function to handle updating order status
    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            // If update is successful, re-fetch orders to reflect the change
            fetchOrders();
            alert(`Order ${orderId} status updated to ${newStatus}!`);
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert(`Error updating order status for order ${orderId}: ${error.message}`);
        }
    };

    // Handler to open message modal and set current message
    const openMessageModal = (message) => {
        setCurrentMessage(message);
        setReplyMessage(''); // Clear previous reply message
        setShowMessageModal(true);
    };

    // Handler to close message modal
    const closeMessageModal = () => {
        setShowMessageModal(false);
        setCurrentMessage(null);
        setReplyMessage('');
    };

    // Handler for sending a reply (THIS NEEDS BACKEND IMPLEMENTATION)
    const handleSendReply = async () => {
        if (!currentMessage || !replyMessage.trim()) {
            alert('Please type a reply message.');
            return;
        }

        try {
            // Replace with your actual backend API endpoint for sending replies
            const response = await fetch('http://localhost:5000/api/messages/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messageId: currentMessage.id, // ID of the original message
                    recipientEmail: currentMessage.email, // Email of the user who sent the message
                    replyContent: replyMessage,
                    originalMessageContent: currentMessage.message
                    // You might include admin ID/name here for tracking
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to send reply: ${errorData.message || 'Unknown error'}`);
            }

            alert('Reply sent successfully!');
            closeMessageModal(); // Close modal after sending
            // Optionally, refresh messages to show a "replied" status if you add it to your schema
            fetchMessages();

        } catch (error) {
            console.error('Error sending reply:', error);
            alert(`Error sending reply: ${error.message}`);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${messageId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Message deleted successfully!');
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error('Error deleting message:', error);
            alert(`Error deleting message: ${error.message}`);
        }
    };

    
    // NEW: Menu Item Form and CRUD Handlers

    // Handles changes in the menu item form inputs
    const handleMenuFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMenuForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Opens the menu item modal for adding or editing
    const openMenuItemModal = (item = null) => {
        setCurrentMenuItem(item);
        if (item) {
            // Populate form with existing item data for editing
            setMenuForm({
                name: item.name || '',
                description: item.description || '',
                image_url: item.image_url || '',
                // Convert prices to string for input fields, handle null
                small_price: item.small_price !== null ? String(item.small_price) : '',
                medium_price: item.medium_price !== null ? String(item.medium_price) : '',
                large_price: item.large_price !== null ? String(item.large_price) : '',
                is_offer: item.is_offer || false,
                combo_price: item.combo_price !== null ? String(item.combo_price) : '',
                category: item.category || 'pizza',
                is_active: item.is_active || true,
            });
        } else {
            // Reset form for new item
            setMenuForm({
                name: '', description: '', image_url: '',
                small_price: '', medium_price: '', large_price: '',
                is_offer: false, combo_price: '', category: 'pizza', is_active: true,
            });
        }
        setShowMenuItemModal(true);
    };

    // Closes the menu item modal
    const closeMenuItemModal = () => {
        setShowMenuItemModal(false);
        setCurrentMenuItem(null);
        setMenuForm({ // Reset form to initial state
            name: '', description: '', image_url: '',
            small_price: '', medium_price: '', large_price: '',
            is_offer: false, combo_price: '', category: 'pizza', is_active: true,
        });
    };

    // Handles submitting the menu item form (Add or Edit)
    const handleMenuItemSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!menuForm.name.trim() || !menuForm.category.trim()) {
            alert('Menu Item Name and Category are required!');
            return;
        }

        const method = currentMenuItem ? 'PUT' : 'POST';
        const url = currentMenuItem ? `http://localhost:5000/api/menu-items/${currentMenuItem.id}` : 'http://localhost:5000/api/menu-items';

        try {
            const payload = {
                ...menuForm,
                // Ensure prices are numbers or null before sending to backend
                small_price: menuForm.small_price !== '' ? parseFloat(menuForm.small_price) : null,
                medium_price: menuForm.medium_price !== '' ? parseFloat(menuForm.medium_price) : null,
                large_price: menuForm.large_price !== '' ? parseFloat(menuForm.large_price) : null,
                combo_price: menuForm.combo_price !== '' ? parseFloat(menuForm.combo_price) : null,
                // Ensure booleans are correctly sent
                is_offer: Boolean(menuForm.is_offer),
                is_active: Boolean(menuForm.is_active),
            };

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
            }

            alert(`Menu item ${currentMenuItem ? 'updated' : 'added'} successfully!`);
            closeMenuItemModal();
            fetchMenuItems(); // Refresh the list of menu items
        } catch (error) {
            console.error(`Error ${currentMenuItem ? 'updating' : 'adding'} menu item:`, error);
            alert(`Error ${currentMenuItem ? 'updating' : 'adding'} menu item: ${error.message}`);
        }
    };

    // Handles deleting a menu item
    const handleDeleteMenuItem = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this menu item?')) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/menu-items/${itemId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            alert('Menu item deleted successfully!');
            fetchMenuItems(); // Refresh the list
        } catch (error) {
            console.error('Error deleting menu item:', error);
            alert(`Error deleting menu item: ${error.message}`);
        }
    };


    // Placeholder for other handlers (e.g., handle user deletion, menu item actions)
    const handleAddMenuItem = () => {/* ... */};
    const handleEditMenuItem = (item) => {/* ... */};
   


    // If not logged in, you could return a login component here
    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-bold text-red-700 mb-8 text-center">Admin Login</h1>
                    {/* Your login form would go here */}
                    <p className="text-center text-gray-500">Login functionality not implemented in this snippet.</p>
                    <button
                        onClick={() => setIsLoggedIn(true)} // Dummy login
                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Proceed as Logged In (Demo)
                    </button>
                </div>
            </div>
        );
    }

    // Main Admin Panel Render
    return (
        <div className="flex min-h-screen bg-gray-100 font-inter text-gray-800">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-red-800 text-white flex flex-col shadow-lg">
                <div className="p-6 text-3xl font-extrabold text-red-200 border-b border-red-700">
                    🍕 Admin Dashboard
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'dashboard' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'users' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'menu' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('menu')}
                    >
                        Menu & Offers
                    </button>
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'orders' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'messages' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        Messages
                    </button>
                    <button
                        className={`w-full text-left py-3 px-4 rounded-lg text-lg font-medium transition-colors duration-200
                            ${activeTab === 'reports' ? 'bg-red-700 text-white shadow-inner' : 'hover:bg-red-700 hover:text-red-100'}`}
                        onClick={() => setActiveTab('reports')}
                    >
                        Reports
                    </button>
                    {/* Add more sidebar buttons here as needed */}
                </nav>
                <div className="p-4 border-t border-red-700 space-y-3">
                  <Link to="/" className="block text-center py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg text-lg font-semibold transition-colors duration-200">
                    Go to Store
                  </Link>
                <div className="p-4 border-t border-red-700 mt-auto">
                    <button
                        onClick={() => { setIsLoggedIn(false); navigate('/admin-login'); }} // Example logout
                        className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Dynamic Title for the active tab */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h1 className="text-4xl font-extrabold text-red-700">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Management
                    </h1>
                </div>

                {/* Dashboard Tab Content */}
                {activeTab === 'dashboard' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard Overview</h3>
                        <p className="text-gray-600">Welcome to your admin dashboard. Use the sidebar to navigate.</p>
                        {/* Placeholder for dashboard widgets/stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                <h4 className="text-lg font-semibold text-blue-800">Total Orders</h4>
                                <p className="text-3xl font-bold text-blue-600 mt-2">{orders.length}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                <h4 className="text-lg font-semibold text-green-800">Revenue</h4>
                                <p className="text-3xl font-bold text-green-600 mt-2">Rs.12,345.67</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                                <h4 className="text-lg font-semibold text-yellow-800">Total Users</h4>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{users.length}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                <h4 className="text-lg font-semibold text-yellow-800">Unread Messages</h4>
                                 <p className="text-4xl font-bold text-purple-900 mt-2">{messages.filter(msg => msg.status === 'unread').length}</p>
                              </div>
                              </div>
                            </div>
                )}
                            
                {/* Users Tab Content */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">User List</h3>
                        {usersLoading ? (
                            <p className="text-center text-gray-500">Loading users...</p>
                        ) : usersError ? (
                            <p className="text-center text-red-500">Error: {usersError.message}</p>
                        ) : users.length === 0 ? (
                            <p className="text-center text-gray-500">No users found.</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered At</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                  {user.registered_at ? new Date(user.registered_at).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="py-4 px-6 text-center whitespace-nowrap text-sm font-medium">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Menu & Offers Tab Content - UPDATED
                {activeTab === 'menu' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Menu & Offers Management</h3>
                        <button
                            onClick={() => openMenuItemModal()} // Call with no arguments for adding new
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-colors duration-200"
                        >
                            Add New Menu Item
                        </button>

                        {menuItemsLoading ? (
                            <p className="text-center text-gray-500">Loading menu items...</p>
                        ) : menuItemsError ? (
                            <p className="text-center text-red-500">Error: {menuItemsError.message}</p>
                        ) : menuItems.length === 0 ? (
                            <p className="text-center text-gray-500">No menu items found. Add one!</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prices (S/M/L/Combo)</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {menuItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                                                <td className="py-4 px-6 text-sm text-gray-700">
                                                    {item.small_price ? `S: $${parseFloat(item.small_price).toFixed(2)} ` : ''}
                                                    {item.medium_price ? `M: $${parseFloat(item.medium_price).toFixed(2)} ` : ''}
                                                    {item.large_price ? `L: $${parseFloat(item.large_price).toFixed(2)} ` : ''}
                                                    {item.combo_price ? `Combo: $${parseFloat(item.combo_price).toFixed(2)}` : ''}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_offer ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                                                        {item.is_offer ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {item.is_active ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => openMenuItemModal(item)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteMenuItem(item.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )} */}
                                {/* Menu & Offers Tab Content - UPDATED */}
                {activeTab === 'menu' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Menu & Offers Management</h3>
                        <button
                            onClick={() => openMenuItemModal()} // Call with no arguments for adding new
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-colors duration-200"
                        >
                            Add New Menu Item
                        </button>

                        {menuItemsLoading ? (
                            <p className="text-center text-gray-500">Loading menu items...</p>
                        ) : menuItemsError ? (
                            <p className="text-center text-red-500">Error: {menuItemsError.message}</p>
                        ) : menuItems.length === 0 ? (
                            <p className="text-center text-gray-500">No menu items found. Add one!</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prices (S/M/L/Combo)</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {menuItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.name}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                                                <td className="py-4 px-6 text-sm text-gray-700">
                                                    {item.small_price ? `S: $${parseFloat(item.small_price).toFixed(2)} ` : ''}
                                                    {item.medium_price ? `M: $${parseFloat(item.medium_price).toFixed(2)} ` : ''}
                                                    {item.large_price ? `L: $${parseFloat(item.large_price).toFixed(2)} ` : ''}
                                                    {item.combo_price ? `Combo: $${parseFloat(item.combo_price).toFixed(2)}` : ''}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_offer ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                                                        {item.is_offer ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {item.is_active ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => openMenuItemModal(item)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteMenuItem(item.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Orders Tab Content */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Customer Orders</h3>
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (Rs.)</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered At</th>
                                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {ordersLoading ? (
                                        <tr><td colSpan="10" className="py-4 px-6 text-center text-gray-500">Loading orders...</td></tr>
                                    ) : ordersError ? (
                                        <tr><td colSpan="10" className="py-4 px-6 text-center text-red-500">Error: {ordersError.message}</td></tr>
                                    ) : orders.length === 0 ? (
                                        <tr><td colSpan="10" className="py-4 px-6 text-center text-gray-500">No orders found.</td></tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{order.customer_name}</td>
                                                <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{order.delivery_address}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{order.phone_number}</td>
                                                <td className="py-4 px-6 text-sm text-gray-700">
                                                    {order.items_json && JSON.parse(order.items_json).map((item, i) => (
                                                        <div key={i} className="text-xs">
                                                            {item.name} ({item.size}) - Rs.{item.price ? parseFloat(item.price).toFixed(2) : '0.00'}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-bold text-red-600">Rs.{order.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                        ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                                    `}>
                                                        {order.payment_method} ({order.payment_status})
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                        ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                        ${order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' : ''}
                                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                                                        ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                                                    `}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                  {order.ordered_at ? new Date(order.ordered_at).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                        className="border border-gray-300 rounded-md py-1.5 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Preparing">Preparing</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Messages Tab Content */}
                {activeTab === 'messages' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Customer Messages</h3>
                        {messagesLoading ? (
                            <p className="text-center text-gray-500">Loading messages...</p>
                        ) : messagesError ? (
                            <p className="text-center text-red-500">Error: {messagesError.message}</p>
                        ) : messages.length === 0 ? (
                            <p className="text-center text-gray-500">No messages found.</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received At</th>
                                            <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {messages.map((message) => (
                                            <tr key={message.id} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{message.id}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{message.name}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{message.email}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{message.subject}</td>
                                                <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">{message.message}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                                                  {/* Added check for valid date */}
                                                    {message.submitted_at ? new Date(message.submitted_at).toLocaleString() : 'N/A'}
                                                </td>
                                                <td className="py-4 px-6 text-center whitespace-nowrap text-sm font-medium">
                                                    <button onClick={() => openMessageModal(message)} className="text-blue-600 hover:text-blue-900 mr-4">View/Reply</button>
                                                    <button onClick={() => handleDeleteMessage(message.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {/* Message View/reply Modal (if you implement it) */}
                        {showMessageModal && currentMessage && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                                    <h4 className="text-xl font-bold mb-4">Message from {currentMessage.name}</h4>
                                    <p><strong>Email:</strong> <a href={`mailto:${currentMessage.email}`} className="text-blue-600 hover:underline">{currentMessage.email}</a></p>
                                    <p><strong>Subject:</strong> {currentMessage.subject}</p>
                             <div className="bg-gray-100 p-4 rounded-md border border-gray-200 mb-6 max-h-40 overflow-y-auto">
                                        <p className="text-gray-700 whitespace-pre-wrap">{currentMessage.message}</p>
                                </div>
                                <h5 className="text-xl font-semibold mb-3 text-gray-800">Send Reply</h5>
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-y"
                                        rows="4"
                                        placeholder={`Replying to ${currentMessage.name}...`}
                                        value={replyMessage}
                                        onChange={(e) => setReplyMessage(e.target.value)}
                                    ></textarea>

                                    <div className="flex justify-end space-x-4 mt-6">
                                        <button
                                            onClick={closeMessageModal}
                                            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition-colors duration-200"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={handleSendReply}
                                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200"
                                        >
                                            Send Reply
                                        </button>
                                        </div>
                                        </div>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Reports Tab Content */}
                {activeTab === 'reports' && (
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Sales Reports</h3>
                        <div className="mb-6">
                            <label htmlFor="reportMonth" className="block text-gray-700 text-sm font-bold mb-2">Select Month:</label>
                            <input
                                type="month"
                                id="reportMonth"
                                value={reportMonth}
                                onChange={(e) => setReportMonth(e.target.value)}
                                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {reportLoading ? (
                            <p className="text-center text-gray-500">Loading report data...</p>
                        ) : reportError ? (
                            <p className="text-center text-red-500">Error: {reportError.message}</p>
                        ) : monthlyReportData.totalOrders === 0 ? (
                            <p className="text-center text-gray-500">No report data for selected month.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h4 className="text-xl font-semibold mb-4 text-gray-700">Monthly Summary ({new Date(reportMonth).toLocaleString('default', { month: 'long', year: 'numeric' })})</h4>
                                    <p className="text-lg mb-2"><strong>Total Orders:</strong> <span className="text-red-600 font-bold">{monthlyReportData.totalOrders}</span></p>
                                    <p className="text-lg mb-2"><strong>Total Revenue:</strong> <span className="text-green-600 font-bold">${monthlyReportData.totalRevenue ? monthlyReportData.totalRevenue.toFixed(2) : '0.00'}</span></p>
                                    <p className="text-lg"><strong>Average Order Value:</strong> <span className="text-blue-600 font-bold">${monthlyReportData.averageOrderValue ? monthlyReportData.averageOrderValue.toFixed(2) : '0.00'}</span></p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h4 className="text-xl font-semibold mb-4 text-gray-700">Top Selling Items</h4>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contribution</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {monthlyReportData.topSellingItems.length === 0 ? (
                                                <tr><td colSpan="3" className="py-3 px-4 text-center text-gray-500">No top selling items for this month.</td></tr>
                                            ) : (
                                                monthlyReportData.topSellingItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="py-2 px-4 text-sm text-gray-700">{item.name} ({item.size})</td>
                                                        <td className="py-2 px-4 text-sm text-gray-700">{item.count}</td>
                                                        <td className="py-2 px-4 text-sm text-gray-700">
                                                            <div className="flex items-center">
                                                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                                    <div
                                                                        className="bg-red-600 h-2.5 rounded-full"
                                                                        style={{ width: `${(item.count / monthlyReportData.totalOrders) * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span>{Math.round((item.count / monthlyReportData.totalOrders) * 100)}%</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 col-span-1 md:col-span-2">
                                    <h4 className="text-xl font-semibold mb-4 text-gray-700">Daily Sales Trend</h4>
                                    <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
                                        {/* In a real app, this would be a chart component */}
                                        <p className="py-12">[Chart showing daily sales for the selected month would appear here]</p>
                                        <p>Sample data for {new Date(reportMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;