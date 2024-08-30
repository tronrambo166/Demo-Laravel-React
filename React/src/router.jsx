import {createBrowserRouter} from 'react-router-dom'
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/login'
import Register from './views/register';
import Users from './views/users';
import UserForm from './views/userForm';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';

//Jitume Routes
import Homepage from './components/pages/Homepage';
import Servicepage from './components/pages/Servicepage';
import ListingResults from './components/partials/listingResults';
import ListingDetails from './components/partials/ListingDetails';
import Dashboard from './components/pages/Dashboard';
import MyBusinesses from './components/partials/MyBusinesses';
import Dashhome from './components/partials/Dashhome';
import AddMilestone from './components/partials/Addmilestone';
import Milestones from './components/partials/Milestone';
import InvestmentBids from './components/partials/InvestmentBids';
import AddService from './components/partials/Addservice';
import ServiceMilestone from './components/partials/ServiceMilestone';
import ServiceBookings from './components/partials/Servicebookings';
import Messages from './components/partials/Messages';
import AccountPage from './components/partials/AccountPage';
import AddBusiness from './components/partials/Addbusiness';
import PaymentForm from './components/partials/PaymentForm';
import ServiceDetails from './components/partials/ServiceDetails';
import MilestonesPage from './components/partials/Milestonepage';
import MilestonesPageS from './components/partials/MilestonepageS';
import ServiceResults from './components/partials/Serviceresults';
import Subscribepage from './components/partials/Subscribepage';
import Investequip from './components/partials/Investequip';

// import donate_eqp from '../components/pages/donate_eqp'
// import category from '../components/pages/category'
// import investEQUIP from '../components/pages/investEQUIP'
// import projectManagers from '../components/pages/projectManagers'
// import projectManagerCancel from '../components/pages/projectManagerCancel'
// import equipmentRelease from '../components/pages/equipmentRelease'
//Jitume Routes

const router = createBrowserRouter([
	{ path: '/',element: <DefaultLayout />,

		children: [
		{ path:'/login', element: <Login />},
		{ path:'/', element: <Homepage />},
		{ path:'/home', element: <Homepage />},
		{ path:'/services', element: <Servicepage />},
		{ path:'/users', element: <Users />},
		{ path:'/listingResults/:resIds/:loc',name: 'listingResults', element: <ListingResults />},
		{ path:'/listing/:id', element: <ListingDetails />},
		{ path:'dashboard', element: <Dashboard/>},
		{ path:'/service-details/:id', element: <ServiceDetails/>},
		{ path:'/business-milestones/:id', element: <MilestonesPage/>},
		{ path:'/service-milestones/:id', element: <MilestonesPageS/>},
		{ path:'/checkout/:amount/:listing_id/:percent/:purpose', element: <PaymentForm/>},
		{ path:'/serviceResults/:resIds/:loc',name: 'serviceResults', element: <ServiceResults/>},
		{ path:'/subscribe', element: <Subscribepage/>},
		//{ path:'/checkout', element: <PaymentForm/>},
		{ path:'/invest', element: <Investequip/>},










	]},

	//Jitume Routes	
	// { path:'/donate_eqp/:id', element: donate_eqp},
	// { path:'/invest/:listing_id/:id', element: invest_eqp},

	// { path:'/AssetServiceDetails/:id/:business_bid_id', element: serviceDetails},

	// { path:'/category/:name', element: category},
	// { path:'/projectManagers/:bid_id', element: projectManagers},
	// { path:'/projectManagerCancel/:bid_id', element: projectManagerCancel},
	// { path:'/equipmentRelease/:b_owner_id/:manager_id', element: equipmentRelease},

	//Jitume Routes


]);

export default router;