import React, { useState } from "react";
import { FaUpload, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons from react-icons
import logo2 from "../../images/logo2.png";

function CreateInvestorAccount({ isOpen, onClose }) {
    const [isSignIn, setIsSignIn] = useState(true); // Set default state to true
    const [showPassword, setShowPassword] = useState(false); // State for showing password

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-25 flex justify-center items-center z-50">
            <div
                className={`bg-white p-6 shadow-lg ${
                    isSignIn ? "max-w-md min-h-[550px]" : "max-w-2xl"
                } w-full h-auto overflow-y-auto relative rounded-lg`}
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

                {/* Sign In Form */}
                {isSignIn ? (
                    <form className="flex flex-col items-center space-y-4">
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
                                onClick={onClose}
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Form Fields */}
                        <div>
                            <label className="block text-gray-700 text-sm">
                                First Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
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
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm">
                                E-Mail <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm">
                                Passport/ID No{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm">
                                Tax Pin <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 text-sm">
                                Upload ID/Passport{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                className="border rounded-lg px-3 py-2 w-full pr-8 text-sm"
                                required
                            />
                            <FaUpload className="absolute right-3 top-8 text-gray-500" />
                        </div>

                        <div className="relative">
                            <label className="block text-gray-700 text-sm">
                                Upload Tax Pin{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                className="border rounded-lg px-3 py-2 w-full pr-8 text-sm"
                                required
                            />
                            <FaUpload className="absolute right-3 top-8 text-gray-500" />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm">
                                Confirm Password{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 w-full text-sm"
                                required
                            />
                        </div>

                        <div className="col-span-2 grid grid-cols-2 gap-2 items-start">
                            <div className="flex flex-col space-y-2">
                                <label className="block text-gray-700 text-sm">
                                    Investment Industries
                                </label>
                                <label className="block text-gray-700 text-sm">
                                    Investment Range
                                </label>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <select className="border rounded-lg px-3 py-2 w-full text-sm">
                                    <option>Select Industry</option>
                                    {/* Add options */}
                                </select>
                                <select className="border rounded-lg px-3 py-2 w-full text-sm">
                                    <option>Select Range</option>
                                    {/* Add options */}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-2 flex items-center space-x-2 mt-2">
                            <input
                                type="checkbox"
                                className="text-green-500"
                                required
                            />
                            <label className="text-gray-700 text-sm">
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="text-blue-500 hover:underline"
                                >
                                    Terms of Use
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="text-blue-500 hover:underline"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4 rounded-full"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default CreateInvestorAccount;
