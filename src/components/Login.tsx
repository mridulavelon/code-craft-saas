"use client";
import useStore from "@/store/store";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Login = () => {
const { updateShowLogin,updateShowRegister,showLogin } = useStore();
const schema = Yup.object().shape({
  email: Yup.string().required("Email or phone no is required"),
  password: Yup.string().required("Password is required").min(7),
});

const formik = useFormik({
  initialValues: {
     email: "",
     password: "",
  },
  validationSchema: schema,
  onSubmit: async ({ email, password }:any) => {
     await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
     }).then(async(response:any) => {
      console.log(response);
      if (response.status === 200) {
        updateShowLogin(false)
     } else {
        toast.error("Invalid username or password", { className: 'bg-blue-500 text-white p-4 rounded-lg shadow-lg',position: "top-center"});
     }
     }).catch((error) => {
       toast.error("Something unexpected happened", {position: "top-center"});
     });
      // setShowLoading(false);
  },
});
const { errors, touched, values, handleChange, handleSubmit, resetForm }:any = formik;
  
  const handleSignUpState = () => {
    updateShowLogin(false);
    updateShowRegister(true);
  }

  
  const onClose = () => {
    updateShowLogin(false);
  }

  if(!showLogin) return null;

  return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Sign In</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <form 
       className="mt-4"
       onSubmit={handleSubmit} 
       method="POST"
       >
        <label className="block text-sm mb-1 font-semibold">Email</label>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          className={`w-full p-2 rounded bg-gray-800 ${errors.email && touched.email && `border-red-600`} text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter your email"
        />
          {errors.email && touched.email && <div id="formErrorName1"><small className="text-red-600">{errors?.email ?? ""}</small></div>}

        <label className="block text-sm mt-3 mb-1 font-semibold">Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          className={`w-full p-2 rounded ${errors.password && touched.password && `border-red-600`} bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter your password"
        />
        {errors.password && touched.password && <div id="formErrorName1"><small className="text-red-600">{errors?.password ?? ""}</small></div>}

        <div className="flex justify-between items-center mt-3">
          <label className="flex items-center text-sm font-semibold">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-400 text-sm hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold">
          Sign In
        </button>
      </form>
      <div className="flex flex-col">
      <button 
        onClick={() => signIn('google')}
        className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded flex items-center justify-center font-semibold">
          <img 
           src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png" 
           className="h-5 w-5 mr-2" 
           alt="Google" />
          Sign in with Google
        </button>
        <button 
        onClick={() => signIn('github')}
        className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded flex items-center justify-center font-semibold">
          <img 
           src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
           className="h-5 w-5 mr-2" 
           alt="Google" />
          Sign in with Guthub
        </button>
        <div className="flex flex-row gap-1 justify-center items-center mt-4 font-semibold">
          Create an account  <span className="text-blue-400 text-sm hover:underline cursor-pointer" onClick={handleSignUpState}>Sign up</span>
        </div>
      </div>
    </div>
  </div>
);
};
export default Login;