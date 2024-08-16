import { Navigate,Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'
import { Link } from "react-router-dom";

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



export default function GuestLayout() {
	const{token} = useStateContext();
	if(token){
		return <Navigate to='/'/>
	}
	return (
            <div className="bg-white bg-dark-bg flex flex-col min-h-screen">
              <Navbar />

              <main>
	          <Outlet />
	          </main>

              <Footer />
            </div>
 
 


        
        
        //   element={
        //     <div className="bg-white bg-dark-bg flex flex-col min-h-screen">
        //       <Navbar />
        //       <main className="flex-grow">
        //         <ListingResults />
        //       </main>
        //       <Footer />
        //     </div>
        //   }
        // />
        // <Route
        //   path="/checkout"
        //   element={
        //     <div className="bg-white bg-dark-bg flex flex-col min-h-screen">
        //       <Navbar />
        //       <main className="flex-grow">
        //         <PaymentForm />
        //       </main>
        //       <Footer />
        //     </div>
        //   }
        // />
        // <Route
        //   path="/servicedetails"
        //   element={
        //     <div className="bg-white bg-dark-bg flex flex-col min-h-screen">
        //       <Navbar />
        //       <main className="flex-grow">
        //         <ServiceDetails />
        //       </main>
        //       <Footer />
        //     </div>
        //   }
        // />

        

  );
}
