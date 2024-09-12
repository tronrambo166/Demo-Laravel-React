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
        fname: "",
        mname: "",
        lname: "",
        email: "",
        password: "",
        pin: "",
        id_passport: "",
        investor: "",
        id_no: "",
        tax_pin: "",
        inv_range: "",
        interested_cats: "",
        past_investment: "",
        website: "",
        attached_id: null,
        terms: false,
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
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fname"
                                    value={registrationData.fname}
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
                                    name="mname"
                                    value={registrationData.mname}
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
                                    name="lname"
                                    value={registrationData.lname}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Email{" "}
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

                            <div className="relative">
                                <label className="block text-gray-700 text-sm">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={registrationData.password}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm pr-10"
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

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Pin <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="pin"
                                    value={registrationData.pin}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    ID/Passport No.{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="id_passport"
                                    value={registrationData.id_passport}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Investor Type{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="investor"
                                    value={registrationData.investor}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    ID No.{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="id_no"
                                    value={registrationData.id_no}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Tax Pin{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="tax_pin"
                                    value={registrationData.tax_pin}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Investment Range{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="inv_range"
                                    value={registrationData.inv_range}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                >
                                    <option value="">Select...</option>
                                    <option value="1-10K">1-10K</option>
                                    <option value="10-50K">10-50K</option>
                                    <option value="50-100K">50-100K</option>
                                    <option value="100K+">100K+</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Interested Categories{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="interested_cats"
                                    value={registrationData.interested_cats}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Past Investments
                                </label>
                                <input
                                    type="text"
                                    name="past_investment"
                                    value={registrationData.past_investment}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={registrationData.website}
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm">
                                    Attach ID Document{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="attached_id"
                                    onChange={handleRegistrationChange}
                                    className="border rounded-lg px-3 py-2 w-full text-sm"
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={registrationData.terms}
                                    onChange={handleRegistrationChange}
                                    className="mr-2"
                                    required
                                />
                                <label className="text-sm text-gray-600">
                                    I have read and agree to the{" "}
                                    <a
                                        href="#"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Terms of Use and Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary rounded-full"
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
