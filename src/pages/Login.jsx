import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Home/Footer";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        navigate("/");
        console.log(email, password)
    }

    return (
        <>
            <div className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Email address is required.</span>}
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register("password", { required: true, minLength: 8 })}
                            />
                            {errors.password?.type === "required" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password is required.</p>}
                            {errors.password?.type === "minLength" && <p className="text-sm text-red-500"><MdError className="text-lg inline" /> Password must be 8 characters.</p>}
                        </div>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Login
                            </button>
                        </div>
                        
                        <p className="text-center">
                            Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Login;