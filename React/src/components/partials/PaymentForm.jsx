import { useState } from 'react';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaHome } from 'react-icons/fa';

const PaymentForm = () => {
  const { listing_id } = useParams();
  let { amount } = useParams();
  const amount_real = base64_decode(amount);
  const { percent } = useParams();

  const [showModal, setShowModal] = useState(false);
  const price = parseFloat(amount_real)+parseFloat(0.05*amount_real); // Fixed price value
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const popupClose = () => {
    setShowModal(false);
  };

  return (
    <div className="container flex mx-auto my-8 justify-center space-x-8">
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75"
          id="exampleModal"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h2 className="my-4 text-center text-xl font-bold">Failed</h2>
                <p className="text-center text-red-600">
                  Stripe failed message here.
                </p>
              </div>
              <div className="modal-footer flex justify-center">
                <button
                  onClick={popupClose}
                  type="button"
                  className="w-1/2 py-2 my-3 text-lg font-semibold text-white bg-red-600"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Section left */}
      <div className="card bg-white w-[500px] shadow-md text-[#343a40] p-6">
        <a href="/" className="text-black hover:text-green flex items-center">
          <FaHome className='ml-1'/> Home
        </a>

        <div className="card-body mt-4">
          <div className="pb-3 pt-2 text-center">
            <h6 className="text-xl font-bold text-green-800">
              A Secure and Easy Checkout Experience
            </h6>
            <h5 className="text-lg font-bold">
              Pay with your Credit/Debit Card via Stripe
            </h5>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold">Email</label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">Name on Card</label>
              <input
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                placeholder="Enter name on card"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Card Number</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <div className="flex items-center justify-center p-3 bg-green">
                  <FaCreditCard className='text-white font-semibold'/>
                </div>
                <input
                  className="flex-1 p-2 border-0 outline-none"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/3">
                <label className="block text-sm font-semibold">CVC</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="ex. 311"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-semibold">Exp. Month</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="MM"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-semibold">Exp. Year</label>
                <input
                  className="w-full p-2 border border-gray-300 rounded"
                  type="text"
                  placeholder="YYYY"
                />
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Form right */}
      <div className="mt-12 w-50 mb-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg  p-6 "
        >
          {/* Hidden input for listing */}
          <input hidden type="number" name="listing" value={123} />

          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Amount (USD) <small className="text-xs">5% + tax added</small>
            </label>
            <p className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-700">
              ${price}
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <label className="font-bold">Purpose</label>
            <p id="purpose">{purpose}</p>
          </div>

          <h2 className="py-2 text-2xl font-semibold">Total: ${price}</h2>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              required
              id="AND"
              className="mr-2"
            />
            <label
              htmlFor="AND"
              className="text-xs text-gray-600 flex items-center"
            >
              I HAVE READ AND AGREE TO THE 
              <a
                href="#"
                className="ml-1 text-black font-bold"
                style={{ textDecoration: 'none' }}
              >
                TERMS AND CONDITIONS
              </a>
            </label>
          </div>

          <div className="mt-6 text-center">
            <button
              id="pay"
              className="w-full py-2 text-lg font-semibold text-white btn-primary rounded-lg"
              type="submit"
            >
              Pay <span id="paynow"></span><span id="stripBtn"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
