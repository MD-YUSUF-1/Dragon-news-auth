
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../provider/AuthProvider';
import { useContext, useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const {logInUser,setUser} = useContext(AuthContext);
    const [error ,setError] = useState({});
    const location = useLocation();

    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        logInUser(email,password)
        .then((user)=>{
            setUser(user.user)
            navigate(location?.state ? location.state : '/')
        })
        .catch((err)=>{

            setError({...error,login:err.code} )
        })
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-2xl font-semibold text-center ">Login your account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        {
                            error?.login && <label className="label">
                            <a href="#" className="text-red-600 text-sm">{error.login}</a>
                        </label>
                        }
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button  className="btn btn-neutral ">Login</button>
                    </div>
                    <div className="text-center font-medium pt-4">
                        <p >Don’t Have An Account ? <Link className='text-[#F75B5F]' to={'/auth/register'}>Register</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;