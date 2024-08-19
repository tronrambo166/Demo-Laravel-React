import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'
import axiosClient from "../axiosClient";
import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { useState } from 'react'

import NavbarGuest from './partials/NavbarGuest';
import Navbar from './partials/Navbar';
import Footer from './partials/footer';
import ServiceTable from './partials/servicestable';
import Table from './partials/Table';
import Homepage from './pages/Homepage';
import Servicepage from './pages/Servicepage';
import ListingResults from './partials/listingResults';
import ListingDetails from './partials/ListingDetails';
import PaymentForm from './partials/PaymentForm';
import ServiceDetails from './partials/ServiceDetails';

export default function DefaultLayout() {
	const{user,token,setUser, setToken, setAuth, auth} = useStateContext();
    //if(!token ){}
    // const [loading, setLoading] = useState(false);
    // useEffect(()=> {
    //     checkAuth();
    // }, [])

    //  const checkAuth = () => {
    //     setLoading(true)
    //     axiosClient.get('/checkAuth')
    //       .then(({ data }) => {
    //         console.log(data);
    //         setAuth(data.auth);
    //       })
    //   }

	return (
        <div id="defaultLayout" className="bg-white bg-dark-bg flex flex-col min-h-screen">
              {!token ? <NavbarGuest /> : <Navbar />}
              <main>
              <Outlet />
              </main>
              
              <Footer />
        </div>
	)
}
