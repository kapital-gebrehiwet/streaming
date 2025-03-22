import { FcGoogle } from "react-icons/fc";
import Logo from "./logo";
import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <>
      <div className="login_bg_gradient bg-cover h-screen grid place-items-center">
        <Logo />

        <div className="bg-[rgba(0, 0, 0, 0.5)] p-10 w-80 space-y-4 grid place-items-center rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md w-full flex items-center justify-center space-x-4 hover:bg-blue-600" onClick={()=>signIn("google")}>
            <FcGoogle className="text-3xl" />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
