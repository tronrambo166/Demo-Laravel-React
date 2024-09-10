import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../../axiosClient";

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

        // try {
        //     await axios.post(`/upload/${field}`, data, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });
        // } catch (error) {
        //     console.error(`Error uploading ${field}:`, error);
        // }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call individual upload handlers
        await Promise.all(
            ["image", "pin", "identification", "video", "document"].map(
                handleUpload
            )
        );

        formData.location = $('#searchbox').val();
        formData.lat = $('#lat').val();
        formData.lng = $('#lng').val();

        const data = new FormData();
        console.log(formData);
        //return;

        Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);     
        });

        try {
            //const response = await axiosClient.post('business/create-service', data);
            const response = await axiosClient.post(`/business/create-service`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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
                    <h3 className="text-2xl font-bold mb-4 py-4">Add Service</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div>
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
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
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
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
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
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
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
                                Location*
                            </label>
                            <input
                                onKeyUp={getPlaces}
                                id="searchbox"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                                placeholder="Enter a location..."
                            />
                            <input
                                hidden
                                name="lat"
                                id="lat"
                                value=""
                            />
                            <input
                                hidden
                                name="lng"
                                id="lng"
                                value=""
                            />
                            {/*suggestion-list box*/}
                      <ul id="suggestion-list" className="absolute w-[250px] bg-white  border-t-0 rounded-b-md shadow-lg z-10 top-full">
                      </ul>
                      <div id="result_list" style={{top:'582px', left:'809px'}} className="absolute w-[250px] bg-white  border-gray-300 border-t-0 rounded-b-md shadow-lg z-10 top-full">

                      </div>
                      {/*suggestion-list box*/}

                        </div>


                    </div>

                    <div>
                        <label className="block mb-2 text-gray-500 text-sm font-semibold">
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
                            <label className="block  text-gray-500 mb-2 text-sm font-semibold">
                                Service Image*
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-xl px-3 py-2 w-full"
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
                                className="border border-gray-300 rounded-xl px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
                                Identification Image*
                            </label>
                            <input
                                type="file"
                                name="identification"
                                onChange={handleFileChange}
                                className="border border-gray-300 text-gray-500 rounded-xl px-3 py-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-gray-500 text-sm font-semibold">
                                Video (optional)
                            </label>
                            <input
                                type="file"
                                name="video"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-xl px-3 py-2 w-full"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2text-gray-500 text-sm font-semibold">
                            Service Document (optional)
                        </label>
                        <input
                            type="file"
                            name="document"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded-xl px-3 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-500 text-sm font-semibold">
                            Service Link (optional)
                        </label>
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl px-3 py-2 w-full"
                            placeholder="Add a URL (optional)"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="block btn-primary text-white font-bold py-2 px-8 w-full mx-auto rounded "
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
