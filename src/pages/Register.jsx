import { Link, useNavigate } from "react-router-dom";
import RegistrationFooter from "../components/RegistrationFooter";
import { useForm } from "react-hook-form";

import { MdError } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { api } from "../api";

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.post(`/auth/register`, data);

            if (res.status === 201) {
                console.log(res.data)
                toast.success('Register successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                    });
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            setError("root.random", {
                type: "random",
                message: `Somthing went Wrong ${data.email} is not found`,
            })
        }
    }

    return (
        <>
            <div className="container">
                <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
                    <h2 className="text-2xl font-bold mb-6">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="mb-6">
                            <label className="block mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register("firstName", { required: true })}
                            />
                            {errors.firstName && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> First Name is required.</span>}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                                {...register("lastName", { required: true })}
                            />
                            {errors.lastName && <span className="text-sm text-red-500"><MdError className="text-lg inline" /> Last Name is required.</span>}
                        </div>
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
                        <p className="text-red-500 mb-2">{errors?.root?.random?.message}</p>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                        <p className="text-center">
                            Already have account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                        </p>
                    </form>
                </div>

            </div>

            <RegistrationFooter />
        </>
    );
};

export default Register;