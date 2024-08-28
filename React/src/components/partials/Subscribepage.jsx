import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscribepage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [subscribed, setSubscribed] = useState(true); // Assuming user is subscribed
    const [plan, setPlan] = useState('silver'); // Placeholder for plan, could be 'silver', 'gold', 'platinum', etc.
    const [tokenLeft, setTokenLeft] = useState(5); // Placeholder for token count
    const [expire, setExpire] = useState(5); // Placeholder for expiration in days
    const navigate = useNavigate();

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleCheckout = () => {
        if (selectedPackage) {
            setShowConfirmation(true);
        } else {
            setShowAlert(true);
        }
    };

    const confirmCheckout = () => {
        setShowConfirmation(false);
        navigate('/checkout');
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    const makeSession = (listingId) => {
        // Your logic to handle session creation
    };

    const unlockBySubs = (listingId, subscriptionId, type) => {
        // Your logic to handle unlocking by subscription
    };

    return (
        <div>
            <div className="flex py-5 justify-center items-center">
                <div className="flex flex-col gap-3 items-center">
                    <h1 className="font-bold text-center">Let's get you started!</h1>
                    <h2 className="text-center">All plans start with a 7 days free trial.</h2>

                    <div>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="subscription"
                                    value="monthly"
                                    onChange={() => handlePackageSelect('Monthly')}
                                />
                                <span className="px-1">Monthly</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="subscription"
                                    value="annual"
                                    onChange={() => handlePackageSelect('Annually')}
                                />
                                <span className="px-1">Annually (save 20%)</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full max-w-4xl mb-12">
                        {/* Silver Plan */}
                        <div className="flex flex-col items-center w-full sm:w-1/3">
                            <h1 className="text-xl mb-4">Silver</h1>
                            <div
                                className={`border rounded-xl p-4 text-center shadow-sm w-full sm:w-[300px] cursor-pointer 
                                ${selectedPackage === 'Silver' ? 'bg-green-100 border-green' : ''}`}
                                onClick={() => handlePackageSelect('Silver')}
                            >
                                <h1>$9.99</h1>
                                <p className="whitespace-nowrap">
                                    10 free "Start conversations" per<br /> month from any range.
                                </p>
                                <button className="w-full sm:w-[250px] hover:bg-green hover:text-white border rounded-md py-2 border-black my-2">Try free for 7 days</button>
                            </div>
                        </div>

                        {/* Gold Plan */}
                        <div className="flex flex-col items-center w-full sm:w-1/3">
                            <h1 className="text-xl mb-4">Gold</h1>
                            <div
                                className={`border text-center p-4 rounded-md shadow-sm w-full sm:w-[300px] cursor-pointer 
                                ${selectedPackage === 'Gold' ? 'bg-green-100 border-green' : ''}`}
                                onClick={() => handlePackageSelect('Gold')}
                            >
                                <h1>$29.99</h1>
                                <p className="whitespace-nowrap">
                                    Silver + access to all data from one<br /> chosen range.
                                </p>
                                <button className="w-full sm:w-[250px] hover:bg-green hover:text-white border rounded-md py-2 border-black my-2">Try free for 7 days</button>
                            </div>
                        </div>

                        {/* Platinum Plan */}
                        <div className="flex flex-col items-center w-full sm:w-1/3">
                            <h1 className="text-xl mb-4">Platinum</h1>
                            <div
                                className={`border text-center p-4 rounded-md shadow-sm w-full sm:w-[300px] cursor-pointer 
                                ${selectedPackage === 'Platinum' ? 'bg-green-100 border-green' : ''}`}
                                onClick={() => handlePackageSelect('Platinum')}
                            >
                                <h1>$69.99</h1>
                                <p className="whitespace-nowrap">
                                    Silver access + Gold access to all data.
                                </p>
                                <button className="w-full sm:w-[250px] hover:bg-green hover:text-white border rounded-md py-2 mt-8 border-black my-2">Try free for 7 days</button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-[200px] justify-between items-center">
                            <div className="flex flex-col text-center lg:text-left">
                                <h1>Turnover ranges</h1>
                                <h2>$0-$10,000</h2>
                                <h2>$10,000-$100,000</h2>
                                <h2>$100,000-$250,000</h2>
                                <h2>$250,000-$500,000</h2>
                                <h2>$500,000+</h2>
                            </div>
                            <div className="mt-6 lg:mt-0">
                                <button
                                    className="btn-primary px-6 py-2 rounded-full text-white"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Your Selection</h2>
                        <p>
                            {plan === 'silver' || plan === 'silver-trial' ? (
                                <>
                                    <p>Your plan expires in <b>{expire}</b> days.</p>
                                    <p className="text-dark small d-block">Are you sure you want to use one of your {tokenLeft} business information tokens?</p>
                                </>
                            ) : (
                                <p>Please use <b>'Small fee'</b> option to unlock</p>
                            )}
                        </p>
                        <div className="flex flex-col">
                            {plan === 'silver' || plan === 'silver-trial' ? (
                                <div className="flex gap-6">
                                    {tokenLeft > 0 ? (
                                        <button
                                            onClick={() => {
                                                makeSession('listing_id'); // Replace with actual listing ID
                                                unlockBySubs('listing_id', 'subscription_id', 'token'); // Replace with actual IDs
                                            }}
                                            className="modal_ok_btn w-75 m-auto btn rounded mr-3 px-3"
                                        >
                                            Use token <small>({tokenLeft} left)</small>
                                        </button>
                                    ) : (
                                        <button className="modal_ok_btn w-75 m-auto d-inline btn rounded mr-3 px-3">
                                            <small><b>({tokenLeft} token left)</b></small>
                                        </button>
                                    )}
                                    <button
                                        className="close border border-dark w-100 d-inline btn rounded mr-3 px-3"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        <span className="text-dark">No</span>
                                    </button>
                                </div>
                            ) : null}

                            {plan === 'gold' || plan === 'gold-trial' ? (
                                <div className="flex gap-6">
                                    {tokenLeft > 0 ? (
                                        <button
                                            onClick={() => {
                                                makeSession('listing_id'); // Replace with actual listing ID
                                                unlockBySubs('listing_id', 'subscription_id', 'token'); // Replace with actual IDs
                                            }}
                                            className="modal_ok_btn w-75 m-auto btn rounded mr-3 px-3"
                                        >
                                            Use token <small>({tokenLeft} left)</small>
                                        </button>
                                    ) : (
                                        <button className="modal_ok_btn w-75 m-auto d-inline btn rounded mr-3 px-3">
                                            <small><b>({tokenLeft} token left)</b></small>
                                        </button>
                                    )}
                                    <button
                                        className="close border border-dark w-100 d-inline btn rounded mr-3 px-3"
                                        onClick={() => setShowConfirmation(false)}
                                    >
                                        <span className="text-dark">No</span>
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Alert */}
            {showAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
                        <p className="text-center text-lg mb-4">Please select a package before proceeding to checkout.</p>
                        <div className="flex justify-center">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={closeAlert}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscribepage;
