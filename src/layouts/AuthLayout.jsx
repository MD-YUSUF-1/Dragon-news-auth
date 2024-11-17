
import { Outlet } from 'react-router-dom';
import Navbar from './../components/Navbar';

const AuthLayout = () => {
    return (
        <div className='bg-[#f3f3f3] font-poppins'>
            <header className='w-11/12 py-3 mx-auto'>
                <Navbar></Navbar>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;