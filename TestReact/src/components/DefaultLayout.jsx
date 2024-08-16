import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'
import axiosClient from "../axiosClient";

export default function DefaultLayout() {
	const{user,token,setUser, setToken} = useStateContext();

	if(!token){
		return <Navigate to='./login'/>
	}

     const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }
	
	return (
	<div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    Header / DefaultLayout
                </div>
                <div>
                    {user.email}
                    <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                </div>
            </header>
            <main>
            <Outlet />
            </main>
            </div>
        </div>
	)
}
