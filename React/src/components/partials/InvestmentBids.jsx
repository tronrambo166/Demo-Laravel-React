import { useState } from 'react';

function InvestmentBids() {
  const [bids, setBids] = useState([
    { id: 1, date: "2024-07-01", investor: "John Doe", business: "Spurs 17", type: "Monetery", amount: 45, representation: 0.02 },
    { id: 2, date: "2023-12-22", investor: "John Doe", business: "Woking Test", type: "Asset", amount: 200, representation: 15.00 },
    { id: 3, date: "2023-11-29", investor: "John Doe", business: "Arsenal", type: "Asset", amount: 10000, representation: 7.70 },
    { id: 4, date: "2023-11-17", investor: "John Doe", business: "Spurs 17", type: "Asset", amount: 7000, representation: 3.85 },
  ]);

  const [selectedBids, setSelectedBids] = useState(new Set());

  const handleCheckboxChange = (id) => {
    setSelectedBids((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return updatedSelected;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-lg font-semibold mb-6">Investment Bids</h3>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr className='text-gray-600 text-sm'>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Check</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Date</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Investor</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Business</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Type</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Amount</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-[12px]">Representation %</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.id} className="text-gray-500 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 border-b text-center">
                  <input
                    type="checkbox"
                    checked={selectedBids.has(bid.id)}
                    onChange={() => handleCheckboxChange(bid.id)}
                    className="form-checkbox h-4 w-4 text-green"
                  />
                </td>
                <td className="py-3 px-4 border-b">{bid.date}</td>
                <td className="py-3 px-4 border-b">{bid.investor}</td>
                <td className="py-3 px-4 border-b">{bid.business}</td>
                <td className="py-3 px-4 border-b">{bid.type}</td>
                <td className="py-3 px-4 border-b">${bid.amount}</td>
                <td className="py-3 px-4 border-b">{bid.representation}%</td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
      <div className='flex gap-2 pt-3 items-center justify-end'>
  <button className='bg-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors'>
    Accept Bids
  </button>
  <button className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors'>
    Reject Bids
  </button>
</div>

    </div>
  );
}

export default InvestmentBids;
