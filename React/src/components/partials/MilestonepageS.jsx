import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosClient from "../../axiosClient";
import React from 'react';
import { useStateContext } from '../../contexts/contextProvider';

const MilestonePage = () => {
  const { id } = useParams();
  const listing_id = atob(atob(id));
  const [miles, setMiles] = useState([]); // Initialize as an array
  const [no_mile, setNo_mile] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [booked, setbooked] = useState(false);
  const [allow, setallow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { token } = useStateContext();

  useEffect(() => {
    const getMilestones = () => {
      axiosClient.get('/getMilestonesS/' + listing_id)
        .then(({ data }) => {
          if (Array.isArray(data.data)) {
            setMiles(data.data);
            if (data.data.length > 0) {
              setNo_mile(false);
            }
          } else {
            console.error('API did not return an array:', data);
            setMiles([]);
          }
          setIsDone(data.done_msg)
          setbooked(data.booked)
          setallow(data.allow)
          //setReviews(data.reviews)

        })
        .catch(err => {
          console.log(err);
          setMiles([]);
          setHasmile(true);
        });
    };
    getMilestones();
  }, [listing_id]);

  const handleStatusChange = (milestoneName, status) => {
    //console.log(Milestone ${milestoneName} status changed to: ${status});
    // Update milestone status logic here
  };

  return (
    <div className="container mx-auto p-5">
      <h3 className="text-left my-5 text-2xl font-bold">Milestones</h3>

        { !token &&
            <div class="w-75 h-100 py-5 my-5 my-auto justify-content-center my-2 text-center mx-auto">
                <a style="cursor:pointer; width:40%;" 
                    class="searchListing mx-auto text-center py-1 text-light font-weight-bold" data-target="#loginModal"
                    data-toggle="modal">Login to pay</a>
            </div>
          }

            { no_mile && <div  class="w-75 h-100 py-5 my-5 my-auto justify-content-center my-2 text-center mx-auto">
                <h5 class="w-75 mx-auto bg-light py-3 my-3 text-secondary">No Milestones Yet!</h5>
            </div> }

            { isDone &&
              <div  class="w-75 my-5 h-100 text-center mx-auto">
                <h5 class="w-75 mx-auto bg-light py-3 my-3 text-secondary">Milestones completed, Service delivered!</h5>
              </div>
            }

      {/* Steps 1-4 */}
      <div className="flex justify-center items-center mb-8">
        {['Step 1', 'Step 2', 'Step 3', 'Step 4'].map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index === 2
                    ? 'bg-green text-white' // Highlight Step 3 as active
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm">{step}</span>
            </div>
            {index < 3 && (
              <div className="w-12 border-t-2 border-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Milestone Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Document</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Time left</th>
          </tr>
        </thead>
        <tbody>
          {miles.filter(milestone => milestone.status === 'In Progress' ||
           milestone.status === 'To Do').map((milestone, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{milestone.title}</td>
              <td className="border border-gray-300 px-4 py-2">{milestone.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={milestone.document} className="text-black hover:underline">Download Milestone Documentation</a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  {booked && milestone.status === 'To Do' &&  
                    <button
                    onClick={() => handleStatusChange(milestone.title, 'To Pay')}
                    className={`px-3 py-1 rounded ${
                      milestone.status === 'To Do'
                        ? 'bg-green text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    To PAY (PAY)
                  </button> 
                }

                {booked && milestone.status === 'In Progress' &&  
                    <button
                    onClick={() => handleStatusChange(milestone.title, 'Paid')}
                    className={`px-3 py-1 rounded ${
                      milestone.status === 'In Progress'
                        ? 'bg-green text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    In Progress -
                  </button> 
                }

                {!booked  &&  
                    <button
                    onClick={() => handleStatusChange(milestone.title, 'Paid')}
                    className={`px-3 py-1 rounded ${
                      milestone.status === 'In Progress'
                        ? 'bg-green text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                   {milestone.status}
                  </button> 
                }
                  
                </div>
                {/*{milestone.status === 'In Progress' && (
                  <div className="text-red-500 mt-2">{milestone.due}</div>
                )}*/}
              </td>
              <td className="border border-gray-300 px-4 py-2">{milestone.time_left} </td>

            </tr>
          ))}

          {miles.filter(milestone => milestone.status === 'Done').map((milestone, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{milestone.title}</td>
              <td className="border border-gray-300 px-4 py-2">{milestone.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={milestone.document} className="text-blue-500 hover:underline">Download Milestone Documentation</a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(milestone.title, 'Paid')}
                    className={`px-3 py-1 rounded ${
                      milestone.status === 'Paid'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Done
                  </button>
                  </div>

                {/*</div>
                {milestone.status === 'Done' && (
                  <div className="text-green-500 mt-2">Done</div>
                )}*/}

              </td>

            </tr>
          ))}
{/*
          {miles.filter(milestone => milestone.status === 'To Do').map((milestone, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{milestone.title}</td>
              <td className="border border-gray-300 px-4 py-2">{milestone.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={milestone.document} className="text-blue-500 hover:underline">Download Milestone Documentation</a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(milestone.title, 'Paid')}
                    className={`px-3 py-1 rounded ${
                      milestone.status === 'To Do'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    To Do
                  </button>
                  
                </div>
                {/*{milestone.status === 'To Do' && (
                  <div className="text-gray-500 mt-2">PAY</div>
                )}*/}
           {/*   </td>
              <td className="border border-gray-300 px-4 py-2">{milestone.time_left}  </td>*/}

         {/*   </tr>
          ))}*/}*/}

        </tbody>
      </table>
    </div>
  );
};

export default MilestonePage;