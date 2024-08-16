const MyBusinesses = () => {
    // Example data for the table
    const data = [
      { name: 'Woking Test', category: 'Real State', required: 1000, details: 'Test details', contact: '016364747773', amount: '75', action: 'Edit Delete' },
      { name: 'Cleaning Service', category: 'Maintenance', required: 200, details: 'Details about cleaning service', contact: '0123456789', amount: '50', action: 'Edit Delete' },
      { name: 'Web Development', category: 'Technology', required: 5000, details: 'Custom web development services', contact: '9876543210', amount: '500', action: 'Edit Delete' },
      { name: 'Consulting', category: 'Business', required: 1500, details: 'Business consulting services', contact: '5555555555', amount: '200', action: 'Edit Delete' },
      { name: 'Graphic Design', category: 'Design', required: 800, details: 'Creative graphic design services', contact: '1112223333', amount: '100', action: 'Edit Delete' }
    ];
  
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Shares</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
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
                      <button className="text-black py-1 px-2 border rounded-xl hover:underline">Edit</button>
                      <button className="text-red-600 py-2 px-3 border rounded-xl hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default MyBusinesses;
