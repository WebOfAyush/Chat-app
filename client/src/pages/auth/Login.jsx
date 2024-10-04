import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
    
    console.log(formData);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col lg:flex-row font-poppins">
      
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
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
            <div className="space-y-2">
             
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Usernames"
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
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
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
