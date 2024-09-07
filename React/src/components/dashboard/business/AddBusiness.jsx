import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";

const AddBusiness = () => {
    const [formData, setFormData] = useState({
        title: "",
        contact: "",
        category: "",
        details: "",
        location: "",
        investment_needed: "",
        share: "",
        contact_mail: "",
        reason: "",
        y_turnover: "",
        investors_fee: "",
        id_no: "",
        tax_pin: "",
        lat: "",
        lng: "",
        yeary_fin_statement: null,
        pin: null,
        identification: null,
        document: null,
        video: null,
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const allRequiredFilled = [
            // formData.title,
            // formData.contact,
            // formData.category,
            // formData.details,
            // formData.location,
            // formData.investment_needed,
            // formData.share,
            // formData.contact_mail,
            // formData.reason,
            // formData.y_turnover,
            // formData.investors_fee,
            // formData.id_no,
            // formData.tax_pin,
            // formData.lat,
            // formData.lng,
            // formData.yeary_fin_statement,
            // formData.pin,
            // formData.identification,
            // formData.document,
            // formData.video,
        ].every((field) => field !== null && field !== "");

        setIsFormValid(allRequiredFilled);
    }, [formData]);

    const handleFileChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.files[0] });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        
        console.log("Form data submitted:", formData);
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
                            name: "businessTitle",
                            placeholder: "Business Title*",
                        },
                        {
                            label: "Contact",
                            name: "contact",
                            placeholder: "Contact*",
                        },
                        {
                            label: "Yearly Turnover",
                            name: "yearlyTurnover",
                            placeholder: "Yearly Turnover*",
                        },
                        {
                            label: "Email",
                            name: "email",
                            placeholder: "Email (Optional)",
                        },
                        {
                            label: "Location",
                            name: "location",
                            placeholder: "Location*",
                        },
                        {
                            label: "Director's Passport/ID No.",
                            name: "directorsPassport",
                            placeholder: "Director's Passport/ID No.*",
                        },
                        { label: "Share", name: "share", placeholder: "Share" },
                        {
                            label: "Individual/Company Tax PIN",
                            name: "taxPin",
                            placeholder: "Individual/Company Tax PIN*",
                        },
                    ].map((input, idx) => (
                        <div className="flex flex-col" key={idx}>
                            <label className="text-xs font-medium dark:text-gray-200">
                                {input.label}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name={input.name}
                                placeholder={input.placeholder}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                                onChange={handleInputChange}
                                required={
                                    input.label !== "Email" &&
                                    input.label !== "Share"
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
                        { label: "Cover", field: "coverFile" },
                        { label: "PIN Certificate", field: "pinFile" },
                        { label: "ID/Passport", field: "idFile" },
                        {
                            label: "Financial Statements",
                            field: "financialFile",
                        },
                        { label: "Documents", field: "documentsFile" },
                        { label: "Video (if applicable)", field: "videoFile" },
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

                    {/* Reason for Funding */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Reason for Funding*
                        </label>
                        <textarea
                            name="reasonForFunding"
                            placeholder="Reason for Funding*"
                            value={formData.reasonForFunding}
                            onChange={handleInputChange}
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-4 flex justify-center">
                        <button
                            type="submit"
                            className={`btn btn-primary py-2 px-10 max-w-xs rounded-full ${
                                isFormValid ? "" : "cursor-not-allowed"
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
