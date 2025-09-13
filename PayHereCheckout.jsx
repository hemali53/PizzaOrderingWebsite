// PayHereCheckout.jsx
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import md5 from 'crypto-js/md5';

// const PayHereCheckout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const orderDetails = location.state?.orderDetails; // PaymentMethod වෙතින් ලැබෙන orderDetails

//     const [loadingSDK, setLoadingSDK] = useState(true);
//     const [payHereError, setPayHereError] = useState(null);

//     // IMPORTANT: Merchant ID and Secret should ideally come from environment variables
//     // and hash generation should be done on your backend for security.
//     // This is for client-side demonstration ONLY.
//     const merchantId = '1230611'; // ඔබේ PayHere Merchant ID එක මෙතනට දමන්න
//     const merchantSecret = 'MjI4MDUwNDIzMjM2MTMyODQ2NTMxMjg3NDY2OTUxNjA4Nzk='; // ඔබේ PayHere Merchant Secret එක මෙතනට දමන්න

//     useEffect(() => {
//         // orderDetails නොමැති නම් error පෙන්වා cart එකට redirect කරන්න
//         if (!orderDetails || !orderDetails.total || !orderDetails.orderId || !orderDetails.customerDetails?.phone) {
//             console.error("Missing critical order details for PayHere:", orderDetails);
//             setPayHereError("No valid order details found for payment. Redirecting to cart.");
//             setTimeout(() => navigate('/cart'), 3000);
//             return;
//         }

//         // PayHere SDK එක load කරන්න
//         const script = document.createElement('script');
//         script.src = 'https://www.payhere.lk/lib/payhere.js';
//         script.async = true;

//         script.onload = () => {
//             console.log('PayHere SDK loaded successfully!'); // SDK load වූ බවට log
//             setLoadingSDK(false); // loading state එක false කරන්න
//             // SDK එක load වී orderDetails තිබේ නම්, වහාම ගෙවීම ආරම්භ කරන්න
//             if (orderDetails && window.payhere) {
//                 console.log('Attempting to call handlePayNow...');
//                 handlePayNow();
//             } else {
//                 console.log('orderDetails or window.payhere not ready after SDK load.');
//                 setPayHereError('Payment gateway could not be initialized. Please try again.');
//             }
//         };

//         script.onerror = () => {
//             console.error('Failed to load PayHere SDK from source!'); // SDK load වීමේ error එක log කරන්න
//             setPayHereError('Failed to load payment gateway. Please try again. Check network and console.');
//             setLoadingSDK(false);
//         };

//         document.body.appendChild(script);

//         // Component එක unmount වන විට script එක remove කරන්න
//         return () => {
//             if (document.body.contains(script)) {
//                 document.body.removeChild(script);
//             }
//         };
//     }, [orderDetails, navigate]); // orderDetails හෝ navigate වෙනස් වූ විට useEffect නැවත ක්‍රියාත්මක කරන්න

//     // PayHere ගෙවීම ආරම්භ කරන function එක
//     const handlePayNow = () => {
//         console.log('handlePayNow function called.'); // function එක කැඳවූ බවට log

//         // orderDetails හෝ window.payhere නොමැති නම් නැවත පරීක්ෂා කරන්න (ආරක්ෂාව සඳහා)
//         if (!orderDetails) {
//             console.error("Order details are missing inside handlePayNow.");
//             setPayHereError("Order details are missing to initiate payment.");
//             return;
//         }
//         if (!window.payhere) {
//             console.error("PayHere SDK (window.payhere) is not available.");
//             setPayHereError("Payment gateway not fully initialized.");
//             return;
//         }

//         const { customerDetails, items, total, orderId } = orderDetails;

//         // මුදල PayHere ආකෘතියට සකස් කරන්න (දශම ස්ථාන 2ක් සහිතව, comma නොමැතිව)
//         const amountFormatted = parseFloat(total)
//             .toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: false });

//         const currency = 'LKR';
//         // ඇණවුම් කළ භාණ්ඩ තනි string එකක් ලෙස සකස් කරන්න
//         const itemsString = items.map(item => item.name).join(', ');

//         // Hash calculation (මෙය ආරක්ෂාව සඳහා backend එකේදී සිදු කළ යුතුයි)
//         const hashedSecret = md5(merchantSecret).toString().toUpperCase();
//         const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
//             .toString()
//             .toUpperCase();

//         // PayHere callback functions සකස් කරන්න
//         window.payhere.onCompleted = function (completedOrderId) {
//             console.log("Payment completed. Order ID: " + completedOrderId);
//             alert("Payment successful! Your order has been placed. Order ID: " + completedOrderId);
//             sessionStorage.removeItem('pizzaCart'); // Cart එක clear කරන්න
//             navigate('/orderconfirmation', { state: { orderId: completedOrderId } }); // Order confirmation page එකට යන්න
//             // ගෙවීම සාර්ථක වූ බව backend එකට දැනුම් දෙන්න මෙතනදී ඔබට API call එකක් කරන්න පුළුවන්.
//         };

//         window.payhere.onDismissed = function () {
//             console.log("Payment dismissed by user.");
//             alert("Payment dismissed by user.");
//             navigate('/payment'); // Payment method selection page එකට යන්න
//         };

//         window.payhere.onError = function (error) {
//             console.error("Error occurred during payment: ", error);
//             alert("Error occurred during payment: " + error.message || "Unknown error");
//             navigate('/payment'); // Payment method selection page එකට යන්න
//         };

//         // PayHere payment object එක නිර්මාණය කරන්න
//         const payment = {
//             sandbox: true, // Sandbox environment එක සඳහා true, Live environment සඳහා false
//             merchant_id: merchantId,
//             return_url: `${window.location.origin}/orderconfirmation`, // සාර්ථක ගෙවීමකින් පසු යා යුතු URL
//             cancel_url: `${window.location.origin}/payment`, // ගෙවීම අවලංගු කළහොත් යා යුතු URL
//             notify_url: 'http://localhost:5000/api/payhere-notify', // PayHere notifications සඳහා ඔබේ backend URL

//             order_id: orderId,
//             items: itemsString,
//             amount: amountFormatted,
//             currency: currency,
//             hash: hash, // Hash එක client-side එකේදී ගණනය කිරීම ආරක්ෂිත නොවේ. Backend එකට යොමු කරන්න.
//             first_name: customerDetails.name.split(' ')[0] || '', // නමේ පළමු කොටස
//             last_name: customerDetails.name.split(' ').slice(1).join(' ') || 'Customer', // නමේ ඉතිරි කොටස
//             email: customerDetails.email || 'customer@example.com', // පාරිභෝගිකයාගේ email
//             phone: customerDetails.phone, // පාරිභෝගිකයාගේ දුරකථන අංකය
//             address: customerDetails.address, // පාරිභෝගිකයාගේ ලිපිනය
//             city: customerDetails.address.split(',').pop()?.trim() || 'Colombo', // ලිපිනයේ අවසාන කොටස නගරය ලෙස
//             country: 'Sri Lanka',
//         };

//         console.log('PayHere Payment Object:', payment); // PayHere වෙත යවන payment object එක log කරන්න

//         // PayHere ගෙවීම් modal එක ආරම්භ කරන්න
//         window.payhere.startPayment(payment);
//     };

//     // orderDetails නොමැති නම් loading හෝ error message පෙන්වන්න
//     if (!orderDetails) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
//                 <p className="text-xl text-gray-700 animate-pulse">{payHereError || "Preparing order details for payment..."}</p>
//             </div>
//         );
//     }

//     // SDK load වන විට loading message පෙන්වන්න
//     if (loadingSDK) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
//                 <p className="text-xl text-gray-700 animate-pulse">Loading payment gateway...</p>
//             </div>
//         );
//     }

//     // PayHere හා සම්බන්ධ error එකක් තිබේ නම් error message පෙන්වන්න
//     if (payHereError) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
//                 <p className="text-xl text-red-600 mb-4">{payHereError}</p>
//                 <button
//                     onClick={() => navigate('/payment')}
//                     className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
//                 >
//                     Go Back to Payment Options
//                 </button>
//             </div>
//         );
//     }

//     // සියල්ල සාර්ථක නම්, PayHere වෙත redirect වන බව පෙන්වන UI
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100 p-4">
//             <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
//                 <h2 className="text-3xl font-bold text-red-600 mb-6">Redirecting to PayHere...</h2>
//                 <p className="text-gray-700 mb-4">Please wait while we prepare your payment with PayHere. The payment window should appear shortly.</p>
//                 <p className="text-lg font-semibold text-gray-800">Order Total: Rs.{orderDetails.total.toFixed(2)}</p>
//                 <p className="text-sm text-gray-600 mt-2">If the payment window does not appear, please ensure pop-ups are enabled for this site.</p>
//                 {/* SDK එක load වී තිබේ නම්, නැවත ගෙවීම ආරම්භ කිරීමට බොත්තමක් පෙන්වයි */}
//                 <button
//                     onClick={handlePayNow}
//                     className="mt-6 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition"
//                 >
//                     Click here if not redirected
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PayHereCheckout;


import React, { useEffect, useState, useCallback } from 'react'; // useCallback added
import { useLocation, useNavigate } from 'react-router-dom';
import md5 from 'crypto-js/md5';

const PayHereCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.orderDetails; // PaymentMethod වෙතින් ලැබෙන orderDetails

    const [loadingSDK, setLoadingSDK] = useState(true);
    const [payHereError, setPayHereError] = useState(null);
    const [showInitiateButton, setShowInitiateButton] = useState(false); // New state to control button visibility

    // IMPORTANT: Merchant ID and Secret should ideally come from environment variables
    // and hash generation should be done on your backend for security.
    // This is for client-side demonstration ONLY.
    const merchantId = '1230611'; // ඔබේ PayHere Merchant ID එක මෙතනට දමන්න
    const merchantSecret = 'MjI4MDUwNDIzMjM2MTMyODQ2NTMxMjg3NDY2OTUxNjA4Nzk='; // ඔබේ PayHere Merchant Secret එක මෙතනට දමන්න

    // PayHere ගෙවීම ආරම්භ කරන function එක - Wrapped in useCallback for optimization
    const handlePayNow = useCallback(() => {
        console.log('handlePayNow function called.'); // function එක කැඳවූ බවට log

        if (!orderDetails) {
            console.error("Order details are missing inside handlePayNow.");
            setPayHereError("Order details are missing to initiate payment.");
            return;
        }
        if (!window.payhere) {
            console.error("PayHere SDK (window.payhere) is not available.");
            setPayHereError("Payment gateway not fully initialized.");
            return;
        }

        const { customerDetails, items, total, orderId } = orderDetails;

        const amountFormatted = parseFloat(total)
            .toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: false });

        const currency = 'LKR';
        const itemsString = items.map(item => item.name).join(', ');

        // Hash calculation (මෙය ආරක්ෂාව සඳහා backend එකේදී සිදු කළ යුතුයි)
        const hashedSecret = md5(merchantSecret).toString().toUpperCase();
        const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret)
            .toString()
            .toUpperCase();

        window.payhere.onCompleted = function (completedOrderId) {
            console.log("Payment completed. Order ID: " + completedOrderId);
            alert("Payment successful! Your order has been placed. Order ID: " + completedOrderId);
            sessionStorage.removeItem('pizzaCart'); // Cart එක clear කරන්න
            navigate('/orderconfirmation', { state: { orderId: completedOrderId } }); // Order confirmation page එකට යන්න
            // ගෙවීම සාර්ථක වූ බව backend එකට දැනුම් දෙන්න මෙතනදී ඔබට API call එකක් කරන්න පුළුවන්.
        };

        window.payhere.onDismissed = function () {
            console.log("Payment dismissed by user.");
            alert("Payment dismissed by user.");
            navigate('/payment'); // Payment method selection page එකට යන්න
        };

        window.payhere.onError = function (error) {
            console.error("Error occurred during payment: ", error);
            alert("Error occurred during payment: " + error.message || "Unknown error");
            navigate('/payment'); // Payment method selection page එකට යන්න
        };

        const payment = {
            sandbox: true, // Sandbox environment එක සඳහා true, Live environment සඳහා false
            merchant_id: merchantId,
            return_url: `${window.location.origin}/orderconfirmation`, // සාර්ථක ගෙවීමකින් පසු යා යුතු URL
            cancel_url: `${window.location.origin}/payment`, // ගෙවීම අවලංගු කළහොත් යා යුතු URL
            notify_url: 'http://localhost:5000/api/payhere-notify', // PayHere notifications සඳහා ඔබේ backend URL

            order_id: orderId,
            items: itemsString,
            amount: amountFormatted,
            currency: currency,
            hash: hash,
            first_name: customerDetails.name.split(' ')[0] || '',
            last_name: customerDetails.name.split(' ').slice(1).join(' ') || 'Customer',
            email: customerDetails.email || 'customer@example.com',
            phone: customerDetails.phone,
            address: customerDetails.address,
            city: customerDetails.address.split(',').pop()?.trim() || 'Colombo',
            country: 'Sri Lanka',
        };

        console.log('PayHere Payment Object:', payment);

        // PayHere ගෙවීම් modal එක ආරම්භ කරන්න
        window.payhere.startPayment(payment);
    }, [orderDetails, navigate, merchantId, merchantSecret]); // Add merchantId and merchantSecret to dependencies

    useEffect(() => {
        if (!orderDetails || !orderDetails.total || !orderDetails.orderId || !orderDetails.customerDetails?.phone) {
            console.error("Missing critical order details for PayHere:", orderDetails);
            setPayHereError("No valid order details found for payment. Redirecting to cart.");
            setTimeout(() => navigate('/cart'), 3000);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.payhere.lk/lib/payhere.js';
        script.async = true;

        script.onload = () => {
            console.log('PayHere SDK loaded successfully!');
            setLoadingSDK(false);
            // After SDK loads, allow a brief moment for it to initialize fully
            // Then show the button to initiate payment by user click
            setShowInitiateButton(true);
        };

        script.onerror = () => {
            console.error('Failed to load PayHere SDK from source!');
            setPayHereError('Failed to load payment gateway. Please try again. Check network and console.');
            setLoadingSDK(false);
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
            // Clean up PayHere global event handlers to prevent unintended calls
            if (window.payhere) {
                window.payhere.onCompleted = null;
                window.payhere.onDismissed = null;
                window.payhere.onError = null;
            }
        };
    }, [orderDetails, navigate]);

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
                <p className="text-xl text-gray-700 animate-pulse">{payHereError || "Preparing order details for payment..."}</p>
            </div>
        );
    }

    if (loadingSDK) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
                <p className="text-xl text-gray-700 animate-pulse">Loading payment gateway...</p>
            </div>
        );
    }

    if (payHereError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100">
                <p className="text-xl text-red-600 mb-4">{payHereError}</p>
                <button
                    onClick={() => navigate('/payment')}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                    Go Back to Payment Options
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-red-100 p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-6">Proceed to PayHere Payment</h2>
                <p className="text-gray-700 mb-4">Click the button below to open the secure PayHere payment window.</p>
                <p className="text-lg font-semibold text-gray-800">Order Total: Rs.{orderDetails.total.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">
                    Please ensure pop-ups are enabled for this site if the payment window doesn't appear.
                </p>
                {showInitiateButton && ( // Only show the button after SDK is loaded
                    <button
                        onClick={handlePayNow}
                        className="mt-6 bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition"
                    >
                        Click here to proceed with payment
                    </button>
                )}
            </div>
        </div>
    );
};

export default PayHereCheckout;