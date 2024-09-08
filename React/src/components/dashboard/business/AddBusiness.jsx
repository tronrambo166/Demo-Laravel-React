import React, { useState, useEffect } from "react";
import { FiUpload } from "react-icons/fi";
import axiosClient from "../../../axiosClient";

const AddBusiness = () => {
    const [formData, setFormData] = useState({
        title: "",
        contact: "", // Number
        contact_mail: "", // Email
        y_turnover: "", // Dropdown
        id_no: "", // Director's Passport/ID No.
        tax_pin: "", // Individual/Company Tax PIN
        category: "",
        details: "",
        location: "",
        investment_needed: "", // Number
        share: "", // Number (<=100)
        reason: "",
        lat: "",
        lng: "",
        yeary_fin_statement: null,
        pin: null, // File
        identification: null, // File
        document: null, // File
        video: null, // File
        videoLink: "",
        investors_fee: "", // Number
    });

    const [messages, setMessages] = useState({ success: "", error: "" });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAmountInput, setShowAmountInput] = useState(false);

    useEffect(() => {
        const allRequiredFilled = [
            formData.title,
            formData.contact,
            formData.category,
            formData.details,
            formData.location,
            formData.y_turnover,
            formData.id_no,
            formData.tax_pin,
            formData.pin,
            formData.document,
            formData.identification,
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
        
        //Setting loc, lat, lng
        formData.location = $('#searchbox').val();
        formData.lat = $('#lat').val();
        formData.lng = $('#lng').val();

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
            const response = await axiosClient.post(
                "business/create-listing",
                data
            );

            console.log(response.data);
            if (response.data.status === 200) {
                setMessages({
                    success: response.data.message || "",
                    error: "",
                });
            } else if (response.data.status === 404) {
                setMessages({ error: response.data.message });
            }
        } catch (error) {
            console.log(error);
            setMessages({
                success: "",
                error: error.response?.data?.error || "An error occurred",
            });
        }
    };


    const getPlaces = (e) => { 
    e.preventDefault();
    $("#result_list").html('');
    const searchText = formData.location;

        $.ajax({
                url: 'https://photon.komoot.io/api/?q=' + encodeURIComponent(searchText),
                method: 'get',
                dataType: 'json',
                success: function(response) {
                  var i;  console.log(response.features);
                
                    for (i = 0; i < 10; i++) { //console.log(response.features[i].name);
                        var name = response.features[i].properties.name;
                        var city = response.features[i].properties.city;
                        if(city == null || city == 'undefined')
                        city = '';
                        var country = response.features[i].properties.country;
                        var lng = response.features[i].geometry.coordinates[0];
                        var lat = response.features[i].geometry.coordinates[1];

                        $("#result_list").show();
                            if(i<10)

                            if(city == '')
                            $("#result_list").append(' <div onclick="address(\'' + name + ','  + country + '\', \'' + lat + '\', \'' + lng + '\');" style="" data-id="' + name + '" class="address  py-1 px-1 my-0 border-top bg-white single_comms">  <p class="h6 small text-dark d-inline" ><i class="fa fa-map-marker mr-1 text-dark" aria-hidden="true"></i> ' + name + '</p> <p  class="d-inline text-dark"><small>, ' + country + '</small> </p> </div>');
                            else
                            $("#result_list").append(' <div onclick="address(\'' + name + ','+ city + ','  + country + '\', \'' + lat + '\', \'' + lng + '\');" style="" data-id="' + name + '" class="address  py-1 px-1 my-0 border-top bg-white single_comms">  <p class="small h6 text-dark d-inline" ><i class="fa fa-map-marker mr-1 text-dark" aria-hidden="true"></i> ' + name + '</p> <p  class="d-inline text-dark"><small>, ' + city + ',' + country + '</small> </p> </div>');


                        }
                        //document.getElementById('result_list').style.overflowY="scroll";                      
                },
                error: function(error) {
                    console.log(error);
                }

            });
      }

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
                            type: "text",
                        },
                        {
                            label: "Contact",
                            name: "contact",
                            placeholder: "Contact*",
                            type: "number",
                        },
                        
                        {
                            label: "Email",
                            name: "contact_mail",
                            placeholder: "Email (Optional)",
                            type: "email",
                        },
                        
                        {
                            label: "Director's Passport/ID No.",
                            name: "id_no",
                            placeholder: "Director's Passport/ID No.*",
                            type: "number",
                        },
                        {
                            label: "Share",
                            name: "share",
                            placeholder: "Share (<= 100)*",
                            type: "number",
                            max: 100,
                        },
                        {
                            label: "Investment Needed",
                            name: "investment_needed",
                            placeholder: "Investment Needed",
                            type: "number",
                        },
                        {
                            label: "Individual/Company Tax PIN",
                            name: "tax_pin",
                            placeholder: "Individual/Company Tax PIN*",
                            type: "number",
                        },
                    ].map((input, idx) => (
                        <div className="flex flex-col" key={idx}>
                            <label className="text-xs font-medium dark:text-gray-200">
                                {input.label}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={input.type}
                                name={input.name}
                                placeholder={input.placeholder}
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                                onChange={handleInputChange}
                                required={
                                    input.label !== "Email" &&
                                    input.label !== "Share" &&
                                    input.label !== "Investment Needed"
                                }
                                max={input.max}
                            />
                        </div>
                    ))}

                    {/* Select Input */}
                            <div className="flex flex-col">
                            <label className="block mb-2 text-sm font-semibold">
                                Location*
                            </label>
                            <input
                                onKeyUp={getPlaces}
                                id="searchbox"
                                type="text"
                                name="location"
                                
                                onChange={handleInputChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                placeholder="Enter a location..."
                            />
                            
                            {/*suggestion-list box*/}
                      <ul id="suggestion-list" className="absolute w-[250px] bg-white  border-t-0 rounded-b-md shadow-lg z-10 top-full">
                      </ul>
                      <div id="result_list" style={{top:'727px', left:'809px'}} className="absolute w-[250px] bg-white  border-gray-300 border-t-0 rounded-b-md shadow-lg z-10 top-full">

                      </div>
                      {/*suggestion-list box*/}

                        </div>
                            

                    <div className="flex flex-col">

                        <div className="flex flex-col my-3">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Yearly Turnover*
                        </label>
                        <select
                            name="y_turnover"
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled hidden>
                                Select Yearly Turnover*
                            </option>
                            <option value="Less than $10,000">
                                Less than $10,000
                            </option>
                            <option value="$10,000 - $50,000">
                                $10,000 - $50,000
                            </option>
                            <option value="$50,000 - $100,000">
                                $50,000 - $100,000
                            </option>
                            <option value="$100,000 - $500,000">
                                $100,000 - $500,000
                            </option>
                            <option value="More than $500,000">
                                More than $500,000
                            </option>
                            {/* Add more ranges as needed */}
                        </select>
                    </div>

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
                            {/* Add more categories as needed */}
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
                        { label: "PIN Certificate", field: "pin" },
                        { label: "ID/Passport", field: "identification" },
                        {
                            label: "Financial Statements",
                            field: "yeary_fin_statement",
                        },
                        {
                            label: "Supporting Business Documents",
                            field: "document",
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
                                type="number"
                                name="investors_fee"
                                placeholder="Amount (Optional)"
                                className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                                onChange={handleInputChange}
                            />
                        )}
                    </div>

                    {/* Video Link */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Video Link (if applicable)
                        </label>
                        <input
                            type="text"
                            name="videoLink"
                            placeholder="Video Link (if applicable)"
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Reason Input */}
                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-medium dark:text-gray-200">
                            Reason for Requesting Investment
                        </label>
                        <textarea
                            name="reason"
                            placeholder="Reason for Requesting Investment (Optional)"
                            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-full mt-1 dark:bg-gray-900 dark:text-white text-sm focus:ring focus:ring-dark-green outline-none transition-all duration-200"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-2 mt-4 text-white rounded ${
                                isFormValid
                                    ? "bg-dark-green hover:bg-dark-green-hover"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <input
                                
                                name="lat"
                                id="lat"
                                value=""
                            />
                            <input
                                
                                name="lng"
                                id="lng"
                                value=""
                            />

                {/* Success/Error Messages */}
                {messages.success && (
                    <p className="mt-4 text-green-500">{messages.success}</p>
                )}
                {messages.error && (
                    <p className="mt-4 text-red-500">{messages.error}</p>
                )}
            </div>
        </div>
    );
};

export default AddBusiness;
