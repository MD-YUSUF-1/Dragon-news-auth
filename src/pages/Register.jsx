import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Register = () => {
    const {createNewUser,updateUserProfile} = useContext(AuthContext);
    const [error ,setError] = useState({});
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");
        if (password.length<6) {
            setError({...error, pass: "Password length must be greater than 6"})
            return;
        }
        const userProfile = {
            displayName:name,
            photoURL:photo
        }


        createNewUser(email,password)
        .then((user)=>{

            updateUserProfile(userProfile)
            .then(()=>{
                navigate('/');
            })
            .catch(err=>{

            })
            
        })
        .catch((err)=>{


        })

    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-2xl font-semibold text-center ">Register your account</h2>
                <form onSubmit={handleSubmit} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo -URL</span>
                        </label>
                        <input name="photo" type="text" placeholder="photo-url" className="input input-bordered" required />
                    </div>
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
                            error.pass && <label className="label">
                            <span className="text-sm text-rose-500">{error.pass}</span>
                        </label>
                        }
                    </div>
                    <div className="form-control mt-6">
                        <button  className="btn btn-neutral ">Register</button>
                    </div>
                    <div className="text-center font-medium pt-4">
                        <p >Already Have An Account ? <Link className='text-[#F75B5F]' to={'/auth/login'}>Login</Link> </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;