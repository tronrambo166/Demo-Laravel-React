import  { useState,useEffect } from 'react';
import axiosClient from "../../axiosClient";

function ServiceBookings() {
  const [bookings, setBookings] = useState([]);

  const [selectedBookings, setSelectedBookings] = useState(new Set());
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCheckboxChange = (id) => {
    setSelectedBookings((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  const handleCustomerClick = (customer) => {
    // Logic to fetch and show user details can be implemented here
    setSelectedCustomer(customer);
  };

  const handleConfirm = () => {
    // Implement the confirm logic here
    console.log("Confirming bookings:", Array.from(selectedBookings));
  };

  useEffect(() => {
    const getMilestones = (id) => {
      id = 'all'
        axiosClient.get('/business/service_booking')
          .then(({ data }) => {
            setBookings(data.results)
            console.log(bookings)
          })
          .catch(err => {
            console.log(err);
          });
    };
    getMilestones();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-2xl font-semibold mb-6">Service Bookings</h3>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr className='text-gray-700'>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Check</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Service Name</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Customer</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Notes</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Start Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Location</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-gray-700 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedBookings.has(booking.id)}
                    onChange={() => handleCheckboxChange(booking.id)}
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </td>
                <td className="py-3 px-4 border-b">{booking.service}</td>
                <td
                  onClick={() => handleCustomerClick(booking.customer_name)}
                  className="py-3 px-4 border-b text-blue-600 cursor-pointer hover:underline"
                >
                  {booking.customer_name}
                </td>
                <td className="py-3 px-4 border-b">{booking.note}</td>
                <td className="py-3 px-4 border-b">{booking.created_at}</td>
                <td className="py-3 px-4 border-b">{booking.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for showing customer details */}
      {selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h4 className="text-2xl font-semibold mb-6">Customer Details</h4>
            <p className="mb-4"><strong>Customer Name:</strong> {selectedCustomer}</p>
            {/* Add more customer details here */}
            <div className='flex justify-end'>
              <button
                onClick={() => setSelectedCustomer(null)}
                className='btn-primary py-2 px-6 rounded-lg   transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex gap-2 pt-4 items-center justify-end'>
        <button
          onClick={handleConfirm}
          className='btn-primary py-2 px-6 rounded-lg  transition-colors'
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ServiceBookings;
