import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faChevronDown,faSearch } from '@fortawesome/free-solid-svg-icons';

const Homesearch = () => {
  const locationInputRef = useRef(null);

  return (
    <div className='flex flex-col pt-6 justify-center'>
      <h1 className='text-center text-black text-xl font-semibold'>
        Your platform to invest in local businesses
      </h1>

      {/* search section starts */}
      <div className='flex flex-col md:flex-row gap-4 justify-center pt-8 px-2 sm:px-6 md:px-4 items-center w-full max-w-3xl mx-auto'>
        <input 
          type="text"
          className='border py-2 text-md px-4 font-regular border-[#666666]/30 rounded-xl focus:outline-none w-full md:flex-1' 
          placeholder="What are you looking for?" 
        />
        <div className="relative w-full md:flex-1">
          <input 
            type="text" 
            placeholder="Location"
            className="border border-[#666666]/30 w-full text-md rounded-xl py-2 px-4 focus:outline-none" 
            ref={locationInputRef} 
          />
          <FontAwesomeIcon
            icon={faLocationDot}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
          />
        </div>
        <div className="relative w-full md:flex-1">
          <select className='border border-[#666666]/30 w-full text-md rounded-xl py-2 px-4 focus:outline-none appearance-none'>
            <option className='text-slate-400' value="" disabled selected>Select a category</option>
            <option value="food">Food</option>
            <option value="retail">Retail</option>
            <option value="services">Services</option>
            <option value="technology">Technology</option>
          </select>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black cursor-pointer pointer-events-none"
          />
        </div>
        <button className='btn-primary w-full md:w-auto py-3  rounded-full px-4 focus:outline-none mt-4 md:mt-0'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {/* search section ends */}

      <div className='flex font-semibold flex-wrap gap-4 py-6 justify-center items-center w-full mx-auto'>
        <button className='btn-primary w-50 rounded-lg py-2 text-sm px-4 text-white'>
          Agriculture
        </button>
        <button className='bg-black hover:bg-gray-800 py-2 rounded-lg text-sm px-4 text-white'>
          Renewable Energy
        </button>
      </div>
    </div>
  );
}

export default Homesearch;
