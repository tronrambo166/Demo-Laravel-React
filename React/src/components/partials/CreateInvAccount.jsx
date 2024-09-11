import React, { useState } from "react";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons from react-icons
import logo2 from "../../images/logo2.png";

function CreateInvestorAccount({ isOpen, onClose }) {
    const [isSignIn, setIsSignIn] = useState(true); // Set default state to true
    const [showPassword, setShowPassword] = useState(false); // State for showing password

    // Form state for login
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // Form state for registration
    const [registrationData, setRegistrationData] = useState({
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        passportId: "",
        taxPin: "",
        fileId: null,
        fileTaxPin: null,
        investmentIndustry: "",
        investmentRange: "",
        termsAgreed: false,
        contact: "",
        contactMail: "",
        yearlyTurnover: "",
        title: "",
        amount: "",
    });

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegistrationChange = (e) => {
        const { name, value, type, files, checked } = e.target;
        setRegistrationData((prev) => ({
            ...prev,
            [name]:
                type === "file"
                    ? files[0]
                    : type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login Data:", loginData);
        onClose(); // Close the modal after submission
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        const submitData = new FormData();
        for (const key in registrationData) {
            submitData.append(key, registrationData[key]);
        }

        // Handle registration logic here
        console.log("Registration Data:", registrationData);
        onClose(); // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-25 flex justify-center items-center z-50">
            <div
                className={`bg-white p-6 shadow-lg ${
                    isSignIn ? "max-w-md min-h-[500px]" : "max-w-2xl"
                } w-full h-[550px] no-scrollbar overflow-y-auto relative rounded-xl`}
            >
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl bg-white border-none p-1 rounded-full"
                >
                    &times;
                </button>

                {/* Logo Section */}
                <div className="flex justify-center mb-4 mt-2">
                    <img src={logo2} alt="Logo" className="w-10 h-10" />
                </div>

                {/* Toggle Buttons */}
                <div className="flex justify-center mb-6 border-b border-gray-300 space-x-4">
                    <button
                        className={`px-3 py-1 text-sm ${
                            isSignIn
                                ? "font-semibold border-b-2 border-green-500"
                                : ""
                        }`}
                        onClick={() => setIsSignIn(true)}
                    >
                        Investor Sign In
                    </button>
                    <button
                        className={`px-3 py-1 text-sm ${
                            !isSignIn
                                ? "font-semibold border-b-2 border-green-500"
                                : ""
                        }`}
                        onClick={() => setIsSignIn(false)}
                    >
                        Create Investor Account
                    </button>
                </div>

                {/* Form */}
                {isSignIn ? (
                    <form
                        onSubmit={handleLoginSubmit}
                        className="flex flex-col items-center space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            Sign In
                        </h2>
                        <p className="text-sm text-gray-600">
                            Enter details to log in
                        </p>

                        {/* Input Fields */}
                        <div className="flex flex-col w-full max-w-sm space-y-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 text-sm">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    className="border rounded-lg px-3 py-2 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex flex-col relative">
                                <label className="text-gray-700 text-sm">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="border rounded-lg px-3 py-2 text-sm pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <a
                                href="#"
                                className="text-black hover:underline text-sm text-center"
                            >
                                Forgot Password?
                            </a>

                            <button
                                type="submit"
                                className="btn btn-primary rounded-full"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                ) : (
                    <form
                        onSubmit={handleRegistrationSubmit}
                        className="flex flex-col items-center space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">
                            Create Account
                        </h2>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={registrationData.title}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={registrationData.firstName}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={registrationData.middleName}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Last Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={registrationData.lastName}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    E-Mail{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={registrationData.email}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Director's Passport/ID No.{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="passportId"
                                    value={registrationData.passportId}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Individual/Company Tax PIN{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="taxPin"
                                    value={registrationData.taxPin}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 text-sm">
                                    Upload Director's Passport/ID
                                </label>
                                <input
                                    type="file"
                                    name="fileId"
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full pr-8 text-sm"
                                />
                                <FaUpload className="absolute right-3 top-8 text-gray-500" />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 text-sm">
                                    Upload Tax PIN
                                </label>
                                <input
                                    type="file"
                                    name="fileTaxPin"
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full pr-8 text-sm"
                                />
                                <FaUpload className="absolute right-3 top-8 text-gray-500" />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Industry of Investment
                                </label>
                                <input
                                    type="text"
                                    name="investmentIndustry"
                                    value={registrationData.investmentIndustry}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Investment Range
                                </label>
                                <select
                                    name="investmentRange"
                                    value={registrationData.investmentRange}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                >
                                    <option value="">Select range</option>
                                    <option value="1000-5000">1000-5000</option>
                                    <option value="5000-10000">
                                        5000-10000
                                    </option>
                                    <option value="10000-50000">
                                        10000-50000
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Yearly Turnover
                                </label>
                                <select
                                    name="yearlyTurnover"
                                    value={registrationData.yearlyTurnover}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                >
                                    <option value="">Select turnover</option>
                                    <option value="Under 1M">Under 1M</option>
                                    <option value="1M-5M">1M-5M</option>
                                    <option value="5M-10M">5M-10M</option>
                                    <option value="Over 10M">Over 10M</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Contact Number
                                </label>
                                <input
                                    type="tel"
                                    name="contact"
                                    value={registrationData.contact}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactMail"
                                    value={registrationData.contactMail}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={registrationData.amount}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="termsAgreed"
                                    checked={registrationData.termsAgreed}
                                    onChange={handleRegistrationChange}
                                    className="text-blue-500"
                                    required
                                />
                                <label className="text-gray-700 text-sm">
                                    I have read and agree to the Terms of Use
                                    and Privacy Policy
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary rounded-full mt-4"
                        >
                            Create Account
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CreateInvestorAccount;
