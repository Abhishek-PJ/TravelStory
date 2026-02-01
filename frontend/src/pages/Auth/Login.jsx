import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import ThemeToggle from "../../components/ThemeToggle";
import bgImage from "../../assests/images/bg-image.png";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
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
        <div className="login-ui-box right-10 -top-40" />
        <div className="login-ui-box bg-cyan-200 dark:bg-cyan-800 -bottom-40 right-1/2" />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          {/* Mobile Hero Section */}
          <div className="w-full max-w-md bg-cover bg-center rounded-2xl p-6 text-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="py-8">
              <h1 className="text-4xl font-bold text-black dark:text-white">
                Capture <span className="text-red-700 dark:text-red-500">Your</span> <br /> Journeys
              </h1>
              <p className="text-sm text-white mt-4 px-4">
                Record your travel experiences and memories in your personal travel journal.
              </p>
            </div>
          </div>

          {/* Mobile Form Section */}
          <div className="w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-2xl shadow-xl p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Login</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark focus:border-primary-light dark:focus:border-primary-dark focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20 outline-none transition-all"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
                
                <PasswordInput
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />

                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 text-white font-medium py-3 rounded-lg transition-colors duration-200"
              >
                LOGIN
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
                className="w-full bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-primary-light dark:text-primary-dark font-medium py-3 rounded-lg border-2 border-primary-light dark:border-primary-dark transition-colors duration-200"
                onClick={() => navigate("/signup")}
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Original Desktop Layout */}
      <div className="hidden md:flex container h-screen items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-center  bg-cover bg-center rounded-lg p-10 z-50"  style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="pt-16">
            <h4 className="text-5xl text-black dark:text-white font-semibold leading-[58px]">
              Capture <span className="text-red-700 dark:text-red-500">Your</span> <br/> Journeys
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>

        <div className="w-2/4 h-[75vh] bg-surface-light dark:bg-surface-dark rounded-r-lg relative p-16 shadow-lg">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7 text-text-light dark:text-text-dark">Login</h4>
            <input 
              type="text" 
              placeholder="Email" 
              className="input-box bg-white dark:bg-gray-800 text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700" 
              value={email} 
              onChange={({target}) => setEmail(target.value)} 
            />
            <PasswordInput 
              value={password} 
              onChange={({target}) => setPassword(target.value)}
            />
            {error && <p className="text-xs text-red-500 dark:text-red-400 pb-1">{error}</p>}

            <button type="submit" className="btn-primary bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90 dark:hover:bg-primary-dark/90">LOGIN</button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center my-4">Or</p>
            <button 
              type="button" 
              className="btn-primary btn-light border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark" 
              onClick={() => navigate("/signup")}
            >
              CREATE ACCOUNT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;