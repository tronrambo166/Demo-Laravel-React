import React, { useState } from "react";
import  { useEffect } from 'react';
import axiosClient from "../../axiosClient";
// import 'bootstrap/dist/css/bootstrap.css';
//import '~bootstrap/scss/bootstrap.scss';



function InvestmentBids() {

  const AcceptBids = () => { 
  //alert('hello')
  const payload = {
      bid_ids:selectedBids ,
      reject:0,
  } 
  console.log(payload)
  axiosClient.post("bidsAccepted", payload).then(({data})=>{
  console.log(data);
      
}).catch(err => {
    const response = err.response;
    if(response && response.status === 422){
        console.log(response.data.errors);
    } 
    console.log(err)

    });
  }

  const [bids, setBids] = useState([]);

  const [selectedBids, setSelectedBids] = useState(new Set());
  //const [selectedBids, setSelectedBids] = useState(new Set());

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

  useEffect(() => {
    const getMilestones = (id) => {
      id = 'all'
        axiosClient.get('/business/bBQhdsfE_WWe4Q-_f7ieh7Hdhf4E_')
          .then(({ data }) => {
            setBids(data.bids)
          })
          .catch(err => {
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

                <td className="py-3 px-4 border-b">
                <a  data-target={`#detailsModal${bid.id}`} data-toggle="modal" class="bid_btns bg-light rounded ">{bid.investor}</a>
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
      <div className='flex gap-2 pt-3 items-center justify-end'>
  <button onClick={AcceptBids} className='bg-green text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors'>
    Accept Bids
  </button>
  <button className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors'>
    Reject Bids
  </button>
</div>

  {/* Details MODAL */}

{bids.map((bid) => (
  <div  class="detailsModal collapse modal fade" id={`#detailsModal${bid.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">

         <div class="card-header w-100">
           
        </div>

        </div>
    
    
      <div class="modal-body">
                <div class="px-3 card-header w-100">             
                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Full Name: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Investment Range: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Industries Interested In Investing: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Details of Past Investment And Track Record: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Current Website or Web Presence: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


                <div class="row my-1 row form-group">
                    <div class="col-sm-12 my-1"> 
                    <div class="row">
                           <div class="col-sm-10"><label class="h4" for="name">
                                <h5 class=""> <b> Email: </b> </h5></label>
                               </div>
                    
                    <div class="col-sm-12"> 
                        <div class="upload-btn-wrapper">
                        <p>{bid.investor}</p>
                        </div>
                    </div>

                    </div>
                    </div> 
                </div>


         </div>

        </div>

        <div class="modal-footer">

        <div class="card-header w-100 text-center">
            <form action="stripe" method="get">
       
                 <input type="text" hidden id="price" name="price" value="form.investors_fee" />
                  <input type="number" hidden id="listing_id" name="listing_id" value="form.listing_id" />


        <button type="button" class=" btn border border-dark w-25 d-inline px-3 font-weight-bold m-0 " data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">Ok</span>
        </button>

            </form>
        
         </div>

      </div>

        </div>
        </div>
        </div>
        ))}


{/* Details MODAL */}

    </div>
  );
}

export default InvestmentBids;
