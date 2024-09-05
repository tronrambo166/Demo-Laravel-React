import { FaUser, FaCog, FaBell, FaWrench, FaEnvelope, FaCopy, FaDollarSign, FaHome } from 'react-icons/fa';
import profile from "../../../images/profile.png";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from "../../axiosClient";

const Dashboardhero = () => {
  const [user, setUser] = useState([]);
  const [id, setid] = useState('');

  useEffect(() => {
    const getUser = () => { 
      axiosClient.get('/checkAuth')
        .then(({ data }) => {
          setUser(data);            // Set user data
          setid(data.user.id);       // Update the id state correctly
          console.log(data.user);    // Debugging user data
          console.log(data.user.id); // Debugging id
        })
        .catch(err => {
          console.log(err); 
        });
    };
    getUser();
  }, []);

  return (
    <>
      <div id='dashbg' className='relative w-[950px] rounded-xl mb-[20px] mx-2 h-[200px] mt-4 p-4'>
        <div className="flex justify-between">
          <div>
            <h1 className="text-white">Pages / Dashboard</h1>
            <h2 className="text-white font-semibold">Dashboard</h2>
          </div>
          <div className='flex items-center gap-4'>
            <Link to="/">
              <div className='flex text-sm gap-1 items-center text-white'>
                <FaHome />
                <h1>Home</h1>
              </div>
            </Link>
            <div className='flex items-center text-sm gap-2 text-white'>
              <FaUser />
              <h1>Sign out</h1>
            </div>
            <FaCog className='text-white' />
            <FaBell className='text-white' />
          </div>
        </div>

        {/* Floating Bottom Center Section */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="bg-gray-100/50 w-[900px] p-4 rounded-lg shadow-lg">
            <div className='flex justify-between'>
              <div className='flex gap-2 items-center'>
                <img src={profile} className='rounded-xl' alt="" />

                <div className='flex flex-col items-center'>
                  <h2 className="text-black text-lg font-bold">{user.user?.name || 'Emmanuel Nurul'}</h2>
                  <h3>{user.user?.email || 'test@email.com'}</h3>
                </div>
              </div>
              <div className='flex text-[13px] gap-3 text-uppercase items-center'>
                <Link to="">
                  <div className='flex items-center gap-1'>
                    <FaWrench />
                    <h1>Overview</h1>
                  </div>
                </Link>
                <Link to="/dashboard/add-business">
                  <div className='flex items-center gap-1'>
                    <FaCopy />
                    <h1>Add Business</h1>
                  </div>
                </Link>
                <Link to="/dashboard/add-service">
                  <div className='flex items-center gap-1'>
                    <FaWrench />
                    <h1>Add Service</h1>
                  </div>
                </Link>
                <Link to="/dashboard/messages">
                  <div className='flex items-center gap-1'>
                    <FaEnvelope />
                    <h1>Messages</h1>
                  </div>
                </Link>
                <Link to={`./account/${id}`}>
                  <div className='flex items-center gap-1'>
                    <FaDollarSign />
                    <h1>Account</h1>
                  </div>
                </Link>
              </div>
            </div>
            {/* Add any additional content here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardhero;
