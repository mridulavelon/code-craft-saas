import useStore from "@/store/store";
import { LogIn } from "lucide-react";

function LoginButton() {
  const { updateShowLogin,showLogin } = useStore();
  return (
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
             transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
        onClick={() => updateShowLogin(true)}
      >
        <LogIn className="w-4 h-4 transition-transform" />
        <span className="font-semibold">Sign In</span>
      </button>
  );
}
export default LoginButton;
