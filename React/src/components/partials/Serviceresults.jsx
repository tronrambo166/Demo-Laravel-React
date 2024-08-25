import { useState, useRef } from "react";
import { useEffect } from 'react';
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import PriceRangeFilter from "./PriceRangeFilter";
import Navbar from "./Navbar";

// Dummy data
const dummyResults = [
  {
    id: 1,
    listing_name: "Sample Listing 1",
    location: "Location 1",
    category: "Agriculture",
    average_price: 100,
    rating: 4.5,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    listing_name: "Sample Listing 2",
    location: "Location 2",
    category: "Technology/Communications",
    average_price: 150,
    rating: 4.0,
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video URL
  },
  {
    id: 3,
    listing_name: "Sample Listing 3",
    location: "Location 3",
    category: "Arts/Culture",
    average_price: 200,
    rating: 5.0,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    listing_name: "Sample Listing 4",
    location: "Location 4",
    category: "Finance/Accounting",
    average_price: 300,
    rating: 3.5,
    image: "https://via.placeholder.com/300",
  },
];

const categories = [
  { value: "Agriculture", label: "Agriculture" },
  { value: "Arts/Culture", label: "Arts/Culture" },
  { value: "Auto", label: "Auto" },
  { value: "Domestic (Home Help etc)", label: "Domestic (Home Help etc)" },
  { value: "Fashion", label: "Fashion" },
  { value: "Finance/Accounting", label: "Finance/Accounting" },
  { value: "Food", label: "Food" },
  { value: "Legal", label: "Legal" },
  { value: "Media/Internet", label: "Media/Internet" },
  { value: "Other", label: "Other" },
  { value: "Pets", label: "Pets" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Retail", label: "Retail" },
  { value: "Security", label: "Security" },
  { value: "Sports/Gaming", label: "Sports/Gaming" },
  { value: "Technology/Communications", label: "Technology/Communications" },
];

const ServiceResults = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState(dummyResults);
  const locationInputRef = useRef(null);

  const [cartRes, setCartRes] = useState('');


  const search = () => {
    let filteredResults = dummyResults;

    if (selectedCategory) {
      filteredResults = filteredResults.filter(
        (result) => result.category === selectedCategory.value
      );
    }

    setResults(filteredResults);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const count = results.length;

  //KEVIN

  useEffect(()=> {

    // begin setRes
    // this is from the setRes () in serviceResults.vue
    const setRes = () =>{
      axiosClient.get('/ServiceResults/'+ 'test_id')
      .then(({ data }) => {
        setResults(data.data);        
       })
       .catch(err => {
         console.log(err); 
       })
    };
    setRes();    

    //end setRes

    // begin setRange
    // this is from the range () in serviceResults.vue

    const setRange = () =>{
      axiosClient.get('/priceFilter/'+ '/' + '/'+ 'test_id')
      .then(({ data }) => {
        setRangeResults(data.data);
         //console.log(amount_required)
       })
       .catch(err => {
         console.log(err); 
       })
    };
    setRange();    
    //end set Range

    // begin cart
    // this is from the cart () in serviceResults.vue

    const cart = () =>{
      axiosClient.get('/cart/')
      .then(({ data }) => {
        setCartRes(data.data);
         //console.log(amount_required)
       })
       .catch(err => {
         console.log(err); 
       })
    };
    cart();    
    //end cart





  },[])

    

  //KEVIN

  return (
    <div className="container mx-auto px-4">
      <div className="flex mb-6 flex-col md:flex-row gap-4 justify-center pt-8 px-2 sm:px-6 md:px-4 items-center w-full max-w-3xl mx-auto">
        <input
          type="text"
          className="border py-2 text-md px-4 border-[#666666]/30 rounded-xl focus:outline-none w-full md:flex-1"
          placeholder="What are you looking for?"
          style={{ textAlign: "center" }}
        />
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Location"
            className="border border-[#666666]/30 w-full text-md rounded-xl py-2 px-10 focus:outline-none"
            style={{ textAlign: "center" }}
            ref={locationInputRef}
          />
          <FontAwesomeIcon
            icon={faLocationDot}
            className="absolute right-3 ml-2 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
          />
        </div>
        <Select
          className="w-full md:flex-1"
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select a category"
          isClearable
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: "12px",
              padding: "2px 0", // Adjust this value as needed
            }),
          }}
        />
        <button
          className="btn-primary w-full md:w-auto py-3 rounded-full px-4 focus:outline-none mt-4 md:mt-0"
          onClick={search}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="flex">
        <PriceRangeFilter />
      </div>

      <h5 className="py-3 text-gray-700 font-semibold mt-6">
        <b>{count} Results Found</b>
      </h5>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            results.map((row, index) => (
              <div
                className="border h-48 border-gray-300 rounded-lg shadow-md flex"
                key={index}
              >
                {row.video ? (
                  <video
                    src={row.video}
                    className="w-1/3 h-48 object-cover rounded-l-lg"
                    controls
                  />
                ) : (
                  <img
                    src={row.image}
                    alt={row.listing_name}
                    className="w-1/3 h-48 object-cover rounded-l-lg"
                  />
                )}
                <div className="p-4 flex flex-col">
                  <p className="mb-1 text-lg whitespace-nowrap font-semibold">
                    {row.listing_name}
                  </p>
                  <div className="inline-block py-2">
                    <p className="mb-1 rounded-full bg-black py-1 px-2 text-sm text-white inline-block">
                      {row.category}
                    </p>
                  </div>
                  <div className="pt-[30px]">
                    <div className="flex justify-evenly gap-6 items-end">
                      <div className="flex flex-col text-[15px] text-[#0A0A0A]/70 gap-2">
                        <p className="whitespace-nowrap">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-2"
                          />
                          Location: {row.location}
                        </p>
                        <p className="float">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="mr-2"
                          />
                          +1791205437
                        </p>
                      </div>
                      <div>
                        <p className="pl-[70px] text-[15px] font-bold">
                          ${row.average_price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="h-[500px] border border-gray-300 rounded-lg flex items-center justify-center">
          {/* Placeholder for the map */}
          <p className="text-center text-gray-500">Map goes here</p>
        </div>
      </div>

    </div>
  );
};

export default ServiceResults;
