import React from 'react';
import { Link } from 'react-router-dom';

const UnlockPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className='flex gap-6 justify-center'>
        <button className=" btn-primary rounded-md py-2 px-6 text-lg font-semibold mb-4">Unlock Fee</button>
        <Link to="/subscribe">
        <button className="text-lg border rounded-md border-black py-2 px-6 font-semibold mb-4">Subscribe</button>
        
        </Link>

        </div>
        <p className="text-gray-700 mb-6">
          This business requests a small unlock fee of $99 to view their full business information.
        </p>
        <p className="text-gray-700 mb-6">Do you want to pay now?</p>
        <div className="flex justify-center space-x-4">
            <Link to="/checkout/:amount/:listing_id/:percen">
          <button
            onClick={() => {
              // Handle the payment action here
              console.log('Payment initiated');
              onClose();
            }}
            className="btn-primary text-white py-2 px-6 rounded hover:bg-blue-600 transition"
          >
            Ok
          </button>
          </Link>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnlockPopup;
