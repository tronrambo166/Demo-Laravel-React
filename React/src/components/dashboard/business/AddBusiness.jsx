import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../../axiosClient";

const AddBusiness = () => {
    const [formData, setFormData] = useState({
        title: "",
        contact: "", // Updated
        category: "",
        details: "",
        location: "",
        investment_needed: "",
        share: "",
        reason: "test",
        y_turnover: "",
        investors_fee: "",
        id_no: "",
        tax_pin: "",
        lat: "",
        lng: "",
        yeary_fin_statement: null,
        pin: null, // Updated
        identification: null,
        document: null, // Updated
        video: null,
        investors_fee: "",
        videoLink: "",
    });

    const [messages, setMessages] = useState({ success: "", error: "" });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAmountInput, setShowAmountInput] = useState(false);

    useEffect(() => {
        const allRequiredFilled = [
            formData.title,
            formData.contact, // Updated
            formData.category,
            formData.details,
            formData.location,
            //formData.reason,
            formData.y_turnover,
            formData.id_no,
            formData.tax_pin,
            formData.image,
            formData.pin,
            formData.document,
             formData.identification,
              formData.pin,
        ].every((field) => field !== null && field !== "");

        setIsFormValid(allRequiredFilled);
    }, [formData]);

    const handleFileChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.files[0] });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setShowAmountInput(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append form data
        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) {
                data.append(key, value);
            } else {
                data.append(key, value);
            }
        });

        // Log FormData content as an object
        const formDataObject = Object.fromEntries(data.entries());
        console.log("Submitted Form Data:", formDataObject);

        try {
            //toast.info("Saving...");
            const response = await axiosClient.post('business/create-listing', data);

           console.log(response.data);
           if(response.data.status == 200)
            setMessages({ success: response.data.message || "", error: "" });
           if(response.data.status == 404)
            setMessages({ error: response.data.message });

        
        } catch (error) {
            console.log(error);
            setMessages({
                success: "",
                error: error.response?.data?.error || "An error occurred",
            });
        }
    };



    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">
                    Add Business
                </h2>
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={handleSubmit}
                >
                    {/* Business Information Inputs */}
                    {[
                        {
                            label: "Business Title",
                            name: "title",
                            placeholder: "Business Title*",
                        },
                        {
                            label: "Contact",
                            name: "contact", // Updated
                            placeholder: "Contact*",
                        },
                        {
                            label: "Yearly Turnover",
                            name: "y_turnover",
                            placeholder: "Yearly Turnover*",
                        },
                        {
                            label: "Email",
                            name: "contact_mail", // This should stay as is if it's not being used
                            placeholder: "Email (Optional)",
                        },
                        {
                            label: "Location",
                            name: "location",
                            placeholder: "Location*",
                        },
                        {
                            label: "Director's Passport/ID No.",
                            name: "id_no",
                            placeholder: "Director's Passport/ID No.*",
                        },
                        { label: "Share", name: "share", placeholder: "Share" },
                        {
                            label: "Investment Needed",
                            name: "investment_needed",
                            placeholder: "Investment Needed",
                        },
                        {
                            label: "Individual/Company Tax PIN",
                            name: "tax_pin",
                            placeholder: "Individual/Company Tax PIN*",
                        },
                    ].map((input, idx) => (
                        <div className="flex flex-col" key={idx}>
                            <label className="text-xs font-medium dark:text-gray-200">
                                {input.label}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name={input.name}
                                placeholder={input.placeholder}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                                onChange={handleInputChange}
                                required={
                                    input.label !== "Email" &&
                                    input.label !== "Share" &&
                                    input.label !== "Investment Needed"
                                }
                            />
                        </div>
                    ))}

                    {/* Select Input */}
                    <div className="flex flex-col">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Select Category*
                        </label>
                        <select
                            name="category"
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled hidden>
                                Select Category*
                            </option>
                            <option value="Business Planning">
                                Business Planning
                            </option>
                            <option value="IT">IT</option>
                            <option value="Legal Project Management">
                                Legal Project Management
                            </option>
                            {/* Other categories... */}
                        </select>
                    </div>

                    {/* Textarea Input */}
                    <div className="flex flex-col">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Details*
                        </label>
                        <textarea
                            name="details"
                            placeholder="Details*"
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* File Uploads */}
                    {[
                        { label: "Cover", field: "image" },
                        { label: "PIN Certificate", field: "pin" }, // Updated
                        { label: "ID/Passport", field: "identification" },
                        {
                            label: "Financial Statements",
                            field: "yeary_fin_statement",
                        },
                        {
                            label: "Supporting Business Documents",
                            field: "document", // Updated
                        },
                        { label: "Video (if applicable)", field: "video" },
                    ].map((fileInput, idx) => (
                        <div className="flex flex-col" key={idx}>
                            <label className="text-xs font-medium dark:text-gray-200">
                                {fileInput.label}
                            </label>
                            <div className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg flex items-center justify-between mt-1 dark:bg-gray-900 transition-all duration-200">
                                <span className="dark:text-white text-sm">
                                    {formData[fileInput.field]
                                        ? formData[fileInput.field].name
                                        : fileInput.label}
                                </span>
                                <label
                                    htmlFor={`upload-${fileInput.field}`}
                                    className="flex items-center cursor-pointer"
                                >
                                    <FiUpload className="text-lg dark:text-gray-300" />
                                    <input
                                        id={`upload-${fileInput.field}`}
                                        type="file"
                                        className="hidden"
                                        onChange={(e) =>
                                            handleFileChange(e, fileInput.field)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    ))}

                    {/* Fee Input */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            <input
                                type="checkbox"
                                name="feeCheckbox"
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            Set fee for investor to view your full business
                            data?
                        </label>
                        {showAmountInput && (
                            <input
                                type="text"
                                name="investors_fee"
                                placeholder="Amount"
                                value={formData.investors_fee}
                                onChange={handleInputChange}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            />
                        )}
                    </div>

                    {/* Video Link */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Video Link (Optional)
                        </label>
                        <input
                            type="text"
                            name="videoLink"
                            placeholder="Video Link (Optional)"
                            value={formData.videoLink}
                            onChange={handleInputChange}
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                        />
                    </div>


                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Reason for funding (Optional)
                        </label>
                        <input
                            type="text"
                            name="reason"
                            placeholder="Business Reason "
                            value={formData.reason}
                            onChange={handleInputChange}
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                        />
                    </div>


                    {/* Submit Button */}
                    <div className="flex flex-col col-span-2">
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-lg text-white ${
                                isFormValid
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!isFormValid}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBusiness;
