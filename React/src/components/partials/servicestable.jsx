import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from "../../axiosClient";

const ServiceTable = () => {
  const [user, setUser] = useState();
  const [business, setBusiness] = useState([]);
  const [service, setService] = useState([]);
  const [myInvest, setMyInvest] = useState([]);

  useEffect(() => {
    const getBusinessAndServices = () => {
      setTimeout(() => {
        axiosClient.get('/business/dashhome')
          .then(({ data }) => {
            setBusiness(data.business);
            setService(data.services);
            setMyInvest(data.results);
            //console.log(data);
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    };
    getBusinessAndServices();
  }, []);

  console.log(business);
  console.log(service)

  // Example data for the table
  const data = [
    { name: 'Service 1', category: 'Category A', details: 'Details about Service 1', required: true, amount: '$100', contact: '123-456-7890' },
    { name: 'Service 2', category: 'Category B', details: 'Details about Service 2', required: false, amount: '$200', contact: '987-654-3210' },
    { name: 'Service 3', category: 'Category C', details: 'Details about Service 3', required: true, amount: '$150', contact: '555-555-5555' },
  ];

  return (
    <div className="bg-white shadow-md mt-[80px] rounded-xl w-[900px] h-auto pl-3 m-3 p-4">
    

       
      { myInvest.length > 0 &&
        <div className="overflow-x-auto">
        <h1 className="text-[#2D3748] font-semibold text-2xl mb-4">My Investments</h1>
        <table className="min-w-full divide-y divide-gray-600 text-black">
          <thead className="bg-white">
            <tr className="text-gray-400">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Value Needed</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                       <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Business Share</th>
                               <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">My Share</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Image</th>
                                <th width="20%" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {myInvest.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                 {item.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">
                 {item.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.investment_needed}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.details}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.share}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.myShare.toFixed()}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                <img 
                    className="w-[50px] h-[50px] rounded-lg" 
                    src={'../'+item.image}
                    alt="Service" 
                  />
                </td>

                <Link to={`/business-milestones/${btoa(btoa(item.id))}`} key={item.id}>
                  <button className="text-green rounded-xl border py-2 px-5">View milestones</button>
                </Link>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }


        <h1 className="text-[#2D3748] font-semibold text-2xl mb-4">My Service</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600 text-black">
          <thead className="bg-white">
            <tr className="text-gray-400">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Required</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {service.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 flex items-center">
                  <img 
                    className="w-[50px] h-[50px] rounded-lg" 
                    src={'../'+item.image}      
                    alt="Service" 
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-sm">{item.contact}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.details}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link to={`/service-milestones/${btoa(btoa(item.id))}`} key={item.id}>
                  <button className="text-green rounded-xl border py-2 px-5">View milestones</button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <h1 className="text-[#2D3748] font-semibold text-2xl mb-4">My Businesses</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600 text-black">
          <thead className="bg-white">
            <tr className="text-gray-400">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {business.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 flex items-center">
                  <img 
                    className="w-[50px] h-[50px] rounded-lg" 
                    src={'../'+item.image}
                    alt="Service" 
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-sm">{item.contact}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.details}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{item.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link to={`/business-milestones/${btoa(btoa(item.id))}`} key={item.id}>
                  <button className="text-green rounded-xl border py-2 px-5">View milestones</button>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

export default ServiceTable;
