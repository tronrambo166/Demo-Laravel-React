import { Navigate,Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'

export default function GuestLayout() {
	const{token} = useStateContext();
	if(token){
		return <Navigate to='/'/>
	}
	return (
	<div> 
	<div>
	GuestLayout
	</div>
	<Outlet />
	</div>
	)
}