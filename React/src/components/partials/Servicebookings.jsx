import { useState, useEffect } from 'react';
import axiosClient from "../../axiosClient";

function InvestmentBids() {
  const [bids, setBids] = useState([]);
  const [selectedBids, setSelectedBids] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedBids((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(bidId => bidId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const AcceptBids = () => {
    const payload = {
      bid_ids: selectedBids,
      reject: 0,
    };
    console.log(payload)
    axiosClient.post("bookingAccepted", payload)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        } 
        console.log(err);
      });
  };

  useEffect(() => {
    const getMilestones = (id = 'all') => {
      axiosClient.get('/business/bBQhdsfE_WWe4Q-_f7ieh7Hdhf4E_')
        .then(({ data }) => {
          setBids(data.bids);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getMilestones();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-lg font-semibold mb-6">Service Booking</h3>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-600 text-sm">
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
                    checked={selectedBids.includes(bid.id)}
                    onChange={() => handleCheckboxChange(bid.id)}
                    className="form-checkbox h-4 w-4 text-green"
                  />
                </td>
                <td className="py-3 px-4 border-b">{bid.date}</td>
                <td className="py-3 px-4 border-b">
                  <a className="bid_btns bg-light rounded">{bid.investor}</a>
                </td>
                <td className="py-3 px-4 border-b">{bid.business}</td>
                <td className="py-3 px-4 border-b">{bid.type}</td>
                <td className="py-3 px-4 border-b">${bid.amount}</td>
                <td className="py-3 px-4 border-b">{bid.representation}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 pt-3 items-center justify-end">
        <button
          onClick={AcceptBids}
          className="bg-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors"
        >
          Accept Bids
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors">
          Reject Bids
        </button>
      </div>
    </div>
  );
}

export default InvestmentBids;
