import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch, faPhone } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import PriceRangeFilter from "./PriceRangeFilter";
import Navbar from "./Navbar";
import axiosClient from "../../axiosClient";
import { Link } from 'react-router-dom';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

// Dummy data
const ListingResults = () => {
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

  const { resIds }  = useParams();
  //const  resIds  = base64_decode(Ids);
  const { loc } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState('');
  const locationInputRef = useRef(null);

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };
  const count = results.length;

//CORE METHODS
  useEffect(()=> {
    const getResults = () => { 
        axiosClient.get('/searchResults/'+base64_decode(resIds))
          .then(({ data }) => {
           setResults(data.data);
           console.log(data);              
          })
          .catch(err => {
            console.log(err); 
          })
      };
      getResults();

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

    // begin set range amount
    //this is from the rangeAmount () in listingDetails.vue
    const setRangeAmount = () =>{
      axiosClient.get('/priceFilter_amount/'+ '/' + '/'+ 'test_id')
      .then(({ data }) => {
        setRangeAmountResults(data.data);
         //console.log(amount_required)
       })
       .catch(err => {
         console.log(err); 
       })
    };
    setRangeAmount();    

    //end rangeAmount

    //begin setRes
  // const setRes= () => { 
  //       axiosClient.get('/searchResults/'+'test_id')
  //         .then(({ data }) => {
  //          setResults(data.data);
  //           //console.log(amount_required)
  //         })
  //         .catch(err => {
  //           console.log(err); 
  //         })
  //   };
  //     setRes();
    }, [] )

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
          
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="flex">
        <PriceRangeFilter />
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
              <Link to={`/listing/${btoa(btoa(row.id))}`} key={row.id} > <div
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
                    src={'../../' + row.image}
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
              </div> </Link>

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

export default ListingResults;
