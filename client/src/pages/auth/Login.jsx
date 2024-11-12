import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/authAPI";
import { useAuthContext } from "../../context/AuthContext";
export default function Login() {
  const { setAuthUser, setIsAuthenticated } = useAuthContext();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn:login,
    onSuccess:(data)=>{
      localStorage.setItem("chatx_user_data", JSON.stringify(data.userWithoutPassword));
      setAuthUser(data.userWithoutPassword);
      setIsAuthenticated(true);
    }
  })
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData)
  };

  return (
    <main className="min-h-screen w-screen bg-background flex flex-col lg:flex-row font-poppins">
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md  space-y-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                SignUp
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
          {isError && (
  <div className="text-red-500">
    {error?.response?.data?.error || error.message || "Something went wrong"}
  </div>
)}
            <div className="space-y-2">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-foreground text-white rounded-xl outline-none"
              />
            </div>

            <div className="space-y-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-foreground text-white rounded-xl outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-10 w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              {isPending ? "Loading": "Login"}
            </button>
          </form>
        </div>
      </div>
      <div className="h-full flex hidden md:flex items-center justify-center w-1/2 p-8">
        <img
          src="/vectors/login-page.png"
          alt="Decorative illustration for login page"
          width={900}
          height={700}
          className="w-full max-w-md h-auto"
        />
      </div>
    </main>
  );
}
