import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddService = ({ connected, userId }) => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        location: "",
        lat: "",
        lng: "",
        details: "",
        image: null,
        pin: null,
        identification: null,
        video: null,
        document: null,
        link: "",
    });
    const [messages, setMessages] = useState({ success: "", error: "" });
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpload = async (field) => {
        if (!formData[field]) return;
        const data = new FormData();
        data.append(field, formData[field]);

        try {
            await axios.post(`/upload/${field}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (error) {
            console.error(`Error uploading ${field}:`, error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log form data to the console
        console.log("Form Data:", formData);

        // Call individual upload handlers
        await Promise.all(
            ["image", "pin", "identification", "video", "document"].map(
                handleUpload
            )
        );

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (
                ![
                    "image",
                    "pin",
                    "identification",
                    "video",
                    "document",
                ].includes(key)
            ) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post("/create-service", data);
            setMessages({ success: response.data.success || "", error: "" });
            navigate("/some-page");
        } catch (error) {
            setMessages({
                success: "",
                error: error.response?.data?.error || "An error occurred",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Success Message */}
            {messages.success && (
                <div className="bg-blue-100 text-blue-700 border border-blue-300 rounded-lg px-4 py-3 mb-4 flex justify-between items-center">
                    <p className="font-semibold">{messages.success}</p>
                    <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() =>
                            setMessages({ ...messages, success: "" })
                        }
                    >
                        &times;
                    </button>
                </div>
            )}

            {/* Error Message */}
            {messages.error && (
                <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-4 flex justify-between items-center">
                    <p className="font-semibold">{messages.error}</p>
                    <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setMessages({ ...messages, error: "" })}
                    >
                        &times;
                    </button>
                </div>
            )}

            <h3 className="text-2xl font-bold mb-4 text-center">Add Service</h3>

            {connected === 0 ? (
                <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                    <p className="text-center text-gray-700 mb-4">
                        Before adding a service, you must onboard to Jitume
                        Stripe platform to receive service milestone payments.
                    </p>
                    <a
                        href={`/connect-stripe/${userId}`}
                        className="block text-center bg-gray-200 border border-gray-400 rounded py-2 px-4 hover:bg-gray-300"
                    >
                        Connect to Stripe
                    </a>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl mx-auto space-y-6"
                >
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Service Title*
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                placeholder="Service Title"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Price*
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                placeholder="Price"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Service Category*
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            >
                                <option value="" disabled hidden>
                                    Select a category
                                </option>
                                <option value="Business Planning">
                                    Business Planning
                                </option>
                                <option value="IT">IT</option>
                                <option value="Legal Project Management">
                                    Legal Project Management
                                </option>
                                <option value="Branding and Design">
                                    Branding and Design
                                </option>
                                <option value="Auto">Auto</option>
                                <option value="Finance, Accounting & Tax Marketing">
                                    Finance, Accounting & Tax Marketing
                                </option>
                                <option value="Tax Marketing">
                                    Tax Marketing
                                </option>
                                <option value="Public Relations">
                                    Public Relations
                                </option>
                                <option value="Project/Asset Management">
                                    Project/Asset Management
                                </option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Location*
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                placeholder="Enter a location..."
                            />
                            <input
                                type="hidden"
                                name="lat"
                                value={formData.lat}
                            />
                            <input
                                type="hidden"
                                name="lng"
                                value={formData.lng}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Details*
                        </label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Provide details about your service"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Service Image*
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Service Pin*
                            </label>
                            <input
                                type="file"
                                name="pin"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Identification Image*
                            </label>
                            <input
                                type="file"
                                name="identification"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-semibold">
                                Video (optional)
                            </label>
                            <input
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Service Document (optional)
                        </label>
                        <input
                            type="file"
                            name="document"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold">
                            Service Link (optional)
                        </label>
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            placeholder="Add a URL (optional)"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddService;
