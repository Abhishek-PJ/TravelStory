import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import ThemeToggle from "../../components/ThemeToggle";
import signupBgImage from "@/assests/images/signup-bg-img.png";

import { useApi } from "@/utils/useApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const api = useApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/create-account", {
        fullName: name,
        email,
        password,
      });
      
      if (response && response.accessToken) {
        localStorage.setItem("token", response.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bgImageStyle = {
    backgroundImage: `url(/images/signup-bg-img.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-hidden relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Background decorative elements - visible on mobile only */}
      <div className="md:hidden">
        <div className="absolute w-64 h-64 rounded-full bg-cyan-100/50 dark:bg-cyan-900/20 -top-20 -right-20 blur-3xl" />
        <div className="absolute w-64 h-64 rounded-full bg-cyan-200/50 dark:bg-cyan-800/20 -bottom-20 left-1/2 blur-3xl" />
      </div>

      {/* Original desktop background elements */}
      <div className="hidden md:block">
        <div className="signup-ui-box right-10 -top-40" />
        <div className="signup-ui-box bg-cyan-200 dark:bg-cyan-800 -bottom-40 right-1/2" />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          {/* Mobile Hero Section */}
          <div 
            className="w-full max-w-md bg-cover bg-center rounded-2xl p-6 text-center" 
            style={{ 
              backgroundImage: `url(${new URL(signupBgImage, import.meta.url).href})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="py-8">
              <h1 className="text-4xl font-bold text-black dark:text-white">
                Share Your <span className="text-red-700 dark:text-red-500">Travel</span> <br /> Stories
              </h1>
              <p className="text-sm text-white mt-4 px-4">
                Join our community of travelers and share your adventures with the world.
              </p>
            </div>
          </div>

          {/* Mobile Form Section */}
          <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl p-6">
            <form onSubmit={handleSignUp} className="space-y-6">
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Sign Up</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:border-primary-light dark:focus:border-primary-dark focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:border-primary-light dark:focus:border-primary-dark focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />

                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  disabled={isLoading}
                />

                <PasswordInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  disabled={isLoading}
                />

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 text-white font-medium py-3 rounded-lg transition-colors duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'SIGN UP'}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-light dark:bg-surface-dark text-gray-500 dark:text-gray-400">Or</span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-primary-light dark:text-primary-dark font-medium py-3 rounded-lg border-2 border-primary-light dark:border-primary-dark transition-colors duration-200 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => navigate("/login")}
                disabled={isLoading}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Original Desktop Layout */}
      <div className="hidden md:flex container h-screen items-center justify-center px-20 mx-auto">
        <div 
          className="w-2/4 h-[90vh] flex items-center bg-cover bg-center rounded-lg p-10 z-50"  
          
          style={{ 
            backgroundImage: `url(${new URL(signupBgImage, import.meta.url).href})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="pt-16">
            <h4 className="text-5xl text-black dark:text-white font-semibold leading-[58px]">
              Share Your <span className="text-red-700 dark:text-red-500">Travel</span> <br/> Stories
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Join our community of travelers and share your adventures with the world.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-surface-light dark:bg-surface-dark rounded-r-lg relative p-16 shadow-lg">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7 text-text-light dark:text-text-dark">Sign Up</h4>
            
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input-box bg-white dark:bg-gray-800 text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-box bg-white dark:bg-gray-800 text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />

            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              disabled={isLoading}
            />

            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              disabled={isLoading}
            />

            {error && <p className="text-xs text-red-500 dark:text-red-400 pb-1">{error}</p>}

            <button 
              type="submit" 
              className={`btn-primary bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'SIGN UP'}
            </button>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center my-4">Or</p>
            
            <button
              type="button"
              className={`btn-primary btn-light border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
