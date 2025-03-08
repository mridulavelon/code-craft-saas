"use client";
import useStore from "@/store/store";
const Register = () => {
const { updateShowLogin,updateShowRegister,showRegister } = useStore();
  
  const handleSignInState = () => {
    updateShowRegister(false);
    updateShowLogin(true);
  }

  const onClose = () => {
    updateShowRegister(false);
  }

  if(!showRegister) return null;

  return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Sign Up</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <form className="mt-4">
      <label className="block text-sm mb-1 font-semibold">Firstname</label>
        <input
          type="firstname"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your first name"
        />
          <label className="block text-sm mb-1 font-semibold">Lastname</label>
        <input
          type="lastname"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your last name"
        />
        <label className="block text-sm mb-1 font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        <label className="block text-sm mt-3 mb-1 font-semibold">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
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
          Sign Up
        </button>

        <button className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded flex items-center justify-center font-semibold">
          <img 
           src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png" 
           className="h-5 w-5 mr-2" 
           alt="Google" />
          Sign up with Google
        </button>
        <div className="flex flex-row gap-1 justify-center items-center mt-4 font-semibold">
          Already have an account  <span className="text-blue-400 text-sm hover:underline cursor-pointer" onClick={handleSignInState}>Sign in</span>
        </div>
      </form>
    </div>
  </div>
);
};
export default Register;