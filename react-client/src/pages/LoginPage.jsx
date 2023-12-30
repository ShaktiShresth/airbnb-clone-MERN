import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    // input empty?
    if (!email || !password) {
      toast.error("Please fill in all the fields to login!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    try {
      const { data } = await axios.post(
        "https://airbnb-clone-mern-lemon.vercel.app/login",
        {
          email,
          password,
        }
      );
      setUser(data);
      setRedirect(true);
      toast.success("Login successfull !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      toast.error("Login failed!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 flex justify-around items-center grow">
      <div className="-mt-32">
        <h1 className="text-center text-4xl font-semibold">Login</h1>
        <form className="max-w-md mx-auto mt-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="bg-primaryColor w-full text-white p-2 rounded-2xl hover:bg-primaryHoverColor">
            Continue
          </button>
          <ToastContainer />
          <div className="text-center pt-3 text-sm">
            <Link
              to={"/reset"}
              className="text-gray-400 hover:underline hover:text-primaryHoverColor"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center text-gray-500 text-center py-2 before:w-full before:h-onePxHeight before:bg-grayColor before:mr-4 after:w-full after:h-onePxHeight after:bg-grayColor after:ml-4">
            or
          </div>
          <div className="text-gray-400 text-center">
            Don't have an account yet?{" "}
            <Link
              to={"/register"}
              className="underline text-black hover:text-primaryHoverColor"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
