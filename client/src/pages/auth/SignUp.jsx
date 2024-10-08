import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../api/authAPI";

export default function SignUp() {
  const queryClient = useQueryClient();
  const {mutate, isError, isPending, error}= useMutation({
    mutationFn:signup,
    onSuccess: () =>{
      console.log("user created ")
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
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
    <main className="min-h-screen bg-background flex flex-col lg:flex-row font-poppins">
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <img
          src="/vectors/signup-page.png"
          alt="Decorative illustration for sign up page"
          width={900} 
          height={700}
          className="w-full max-w-md h-auto"
        />
      </div>
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-foreground text-white rounded-xl outline-none"
                />
              </div>
              <div className="space-y-2">
                
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-foreground text-white rounded-xl outline-none"
                />
              </div>
            </div>
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
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
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
              className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
