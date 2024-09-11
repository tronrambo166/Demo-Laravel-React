import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";

function InvestmentBids() {
  const [bids, setBids] = useState([]);
  const [selectedBids, setSelectedBids] = useState([]); 

  const AcceptBids = (reject) => {
      const payload = {
      bid_ids: selectedBids,
      reject: reject
    };
    alert(reject);

    //console.log(payload); return;
    axiosClient
      .post("bidsAccepted", payload)
      .then(({ data }) => {
        console.log(data);
        //alert(data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
        console.log(err);
      });
  };

  const handleCheckboxChange = (id) => {
    setSelectedBids((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((bidId) => bidId !== id); 
      } else {
        return [...prevSelected, id]; 
      }
    });
  };

  useEffect(() => {
    const getMilestones = (id = "all") => {
      axiosClient
        .get("/business/bBQhdsfE_WWe4Q-_f7ieh7Hdhf4E_")
        .then(({ data }) => {
          setBids(data.bids);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getMilestones();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-left text-lg font-semibold mb-6">Investment Bids</h3>
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
                  <a
                    data-target={`#detailsModal${bid.id}`}
                    data-toggle="modal"
                    className="bid_btns bg-light rounded"
                  >
                    {bid.investor}
                  </a>
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
  onClick={AcceptBids(0)}
  disabled={selectedBids.length === 0}  // Disable if no bids are selected
  className={`py-2 px-4 rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
    selectedBids.length === 0 
      ? 'bg-gray-300 cursor-not-allowed'  // Disabled styling
      : 'btn-primary hover:bg-green-600 focus:ring-green-300'  // Active styling
  }`}
>
  Accept Bids
</button>

        <button onClick={AcceptBids(1)} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors">
          Reject Bids
        </button>
      </div>

      {/* Details Modal */}
      {bids.map((bid) => (
        <div
          key={bid.id}
          className="detailsModal collapse modal fade"
          id={`#detailsModal${bid.id}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div className="card-header w-100"></div>
              </div>
              <div className="modal-body">
                {/* Modal content here */}
                <div className="px-3 card-header w-100">
                  <div className="row my-1 row form-group">
                    <div className="col-sm-12 my-1">
                      <div className="row">
                        <div className="col-sm-10">
                          <label className="h4" htmlFor="name">
                            <h5>
                              <b>Full Name:</b>
                            </h5>
                          </label>
                        </div>
                        <div className="col-sm-12">
                          <div className="upload-btn-wrapper">
                            <p>{bid.investor}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* More modal rows... */}
                </div>
              </div>
              <div className="modal-footer">
                <div className="card-header w-100 text-center">
                  <form action="stripe" method="get">
                    <input type="text" hidden id="price" name="price" value="form.investors_fee" />
                    <input type="number" hidden id="listing_id" name="listing_id" value="form.listing_id" />
                    <button
                      type="button"
                      className="btn border border-dark w-25 d-inline px-3 font-weight-bold m-0"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">Ok</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* End of Details Modal */}
    </div>
  );
}

export default InvestmentBids;
