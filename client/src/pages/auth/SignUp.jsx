import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../api/authAPI";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { z } from "zod"; 

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email : z.string().email({ message: "Please provide a valid email" }),
  username : z.string().min(3, {message: "Username must be at least 3 charcters long"}),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })
    .refine((val) => /[0-9]/.test(val), { message: "Password must contain a number" })
});

export default function SignUp() {
  const { setAuthUser, setIsAuthenticated } = useAuthContext();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("User Created");
      localStorage.setItem("chatx_user_data", JSON.stringify(data.user));
      setAuthUser(data.user);
      setIsAuthenticated(true);
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      signUpSchema.parse(formData); 
      setFormErrors({}); 
      mutate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setFormErrors(errors);
      }
    }
  };

  return (
    <main className="min-h-screen w-screen bg-background flex flex-col lg:flex-row font-poppins">
      <div className="h-full flex hidden md:flex items-center justify-center w-1/2 p-8">
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
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isError && <div className="text-red-500">{error.message || "Something went wrong"}</div>}

            <div className="grid grid-cols-2 gap-4">
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
                {formErrors.firstName && <div className="text-red-500 text-sm">{formErrors.firstName}</div>}
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
                {formErrors.lastName && <div className="text-red-500 text-sm">{formErrors.lastName}</div>}
              </div>
            </div>

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
              {formErrors.username && <div className="text-red-500 text-sm">{formErrors.username}</div>}
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
              {formErrors.email && <div className="text-red-500 text-sm">{formErrors.email}</div>}
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
              {formErrors.password && <div className="text-red-500 text-sm">{formErrors.password}</div>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
            >
              {isPending ? "Loading" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
