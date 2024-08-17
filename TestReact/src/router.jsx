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
//import ServiceDetails from './partials/ServiceDetails';

//import home from '../components/pages/home'
// import services from '../components/pages/services'
// import applyShow from '../components/pages/applyShow'
// import looking_investor from '../components/pages/looking_investor'
// import become_provider from '../components/pages/become_provider'
// import listingResults from '../components/pages/listingResults'
// import listingDetails from '../components/pages/listingDetails'
// import serviceResults from '../components/pages/serviceResults'
// import serviceDetails from '../components/pages/serviceDetails'
// import invest_eqp from '../components/pages/invest_eqp'
// import donate_eqp from '../components/pages/donate_eqp'
// import cart from '../components/pages/cart'
// import subscribe from '../components/pages/subscribe'
// import project_dash from '../components/pages/project_dash'
// import project_dash_service from '../components/pages/project_dash_service'
// import category from '../components/pages/category'
// import investEQUIP from '../components/pages/investEQUIP'
// import projectManagers from '../components/pages/projectManagers'
// import projectManagerCancel from '../components/pages/projectManagerCancel'
// import equipmentRelease from '../components/pages/equipmentRelease'
//Jitume Routes

const router = createBrowserRouter([
	{ path: '/',element: <DefaultLayout />,

		children: [
		{ path:'/', element: <Homepage />},
		{ path:'/home', element: <Homepage />},
		{ path:'/services', element: <Servicepage />}
	]},

	//GUEST
	{ 
	path: '/', element: <GuestLayout />, 
	children: [
	{ path:'/guest', element: <Homepage />},
	{path: '/login',element: <Login />},
	{ path: '/register',element: <Register />},
	{ path:'/home', element: <Homepage />},
	{ path:'/services', element: <Servicepage />}

	]},

	//Jitume Routes
	
	
	// { path:'/applyShow', element: applyShow},
	// { path:'/looking_investor', element: looking_investor},
	// { path:'/become_provider', element: become_provider},
	// { path:'/listingResults/:results/:loc',name: 'listingResults', element: listingResults},
	// { path:'/listingDetails/:id', element: listingDetails},
	// { path:'/invest_eqp/:id', element: invest_eqp},
	// { path:'/donate_eqp/:id', element: donate_eqp},
	// { path:'/subscribe/:id', element: subscribe},
	// { path:'/invest/:listing_id/:id', element: invest_eqp},
	// { path:'/cart', element: cart},

	// { path:'/serviceResults/:results/:loc',name: 'serviceResults', element: serviceResults},
	// { path:'/serviceDetails/:id', element: serviceDetails},
	// { path:'/AssetServiceDetails/:id/:business_bid_id', element: serviceDetails},
	// { path:'/business-milestone/:id', element: project_dash},
	// { path:'/service-milestone/:id', element: project_dash_service},
	// { path:'/category/:name', element: category},
	// { path:'/investEQUIP/:amount/:id/:percent', element: investEQUIP},
	// { path:'/projectManagers/:bid_id', element: projectManagers},
	// { path:'/projectManagerCancel/:bid_id', element: projectManagerCancel},
	// { path:'/equipmentRelease/:b_owner_id/:manager_id', element: equipmentRelease},

	//Jitume Routes


]);

export default router;