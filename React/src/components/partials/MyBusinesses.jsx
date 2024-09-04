import React, { useState,useEffect } from 'react';
import axiosClient from "../../axiosClient";

const MyBusinesses = () => {
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    const getBusinessAndServices = () => {
      setTimeout(() => {
        axiosClient.get('/business/bBQhdsfE_WWe4Q-_f7ieh7Hdhf3E_')
          .then(({ data }) => {
            setBusiness(data.business);
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    };
    getBusinessAndServices();
  }, []);
console.log(business)
  // Example data for the table
  const [data, setData] = useState([
    { id: 1, name: 'Woking Test', category: 'Real State', required: 1000, details: 'Test details', contact: '016364747773', amount: '75' },
    { id: 2, name: 'Cleaning Service', category: 'Maintenance', required: 200, details: 'Details about cleaning service', contact: '0123456789', amount: '50' },
    { id: 3, name: 'Web Development', category: 'Technology', required: 5000, details: 'Custom web development services', contact: '9876543210', amount: '500' },
    { id: 4, name: 'Consulting', category: 'Business', required: 1500, details: 'Business consulting services', contact: '5555555555', amount: '200' },
    { id: 5, name: 'Graphic Design', category: 'Design', required: 800, details: 'Creative graphic design services', contact: '1112223333', amount: '100' }
  ]);

  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axiosClient.get('/business/delete_listing/'+id)
          .then(({ data }) => {
            setData(data.filter(item => item.id !== id));

          })
          .catch(err => {
            console.log(err);
          });
  };

  const handleSave = () => {
    setData(data.map(item => (item.id === editItem.id ? editItem : item)));
    setShowModal(false);
  };

  return (
    <div className="bg-white shadow-md mt-20 rounded-xl w-full max-w-4xl mx-auto p-4">
      <h1 className="text-[#2D3748] font-semibold text-2xl mb-4">My Businesses</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600 text-black">
          <thead className="bg-gray-100">
            <tr className="text-gray-500">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Required</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {business.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-4 flex items-center">
                  <img
                    className="w-12 h-12 rounded-lg object-cover"
                    src="https://plus.unsplash.com/premium_photo-1680859126164-ac4fd8f56625?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Business"
                  />
                  <div className="ml-4 text-sm font-medium">{item.name}</div>
                </td>
                <td className="px-4 py-4 text-sm">{item.category}</td>
                <td className="px-4 py-4 text-sm">{item.required}</td>
                <td className="px-4 py-4 text-sm">{item.details}</td>
                <td className="px-4 py-4 text-sm">{item.contact}</td>
                <td className="px-4 py-4 text-sm">{item.amount}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-black py-1 px-2 border rounded-xl hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 py-2 px-3 border rounded-xl hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-4">
            <h2 className="text-xl font-semibold mb-4">Edit Business</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Required</label>
                <input
                  type="number"
                  value={editItem.required}
                  onChange={(e) => setEditItem({ ...editItem, required: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Details</label>
                <textarea
                  value={editItem.details}
                  onChange={(e) => setEditItem({ ...editItem, details: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Contact</label>
                <input
                  type="text"
                  value={editItem.contact}
                  onChange={(e) => setEditItem({ ...editItem, contact: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="text"
                  value={editItem.amount}
                  onChange={(e) => setEditItem({ ...editItem, amount: e.target.value })}
                  className="border rounded-lg p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-600 py-2 px-4 mr-2 border rounded-xl hover:underline">Cancel</button>
                <button type="submit" className="text-blue-600 py-2 px-4 border rounded-xl hover:underline">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;
