import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import SignUp from "./pages/Auth/SignUp"
import Login from "./pages/Auth/Login"
import { ToastContainer } from "react-toastify";


const App =() => {
  

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        limit={3}
      />
      <Router>
        <Routes>
          <Route path="/" exact element={<Root />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

const Root=()=>{
  const isAuthenticated=!!localStorage.getItem("token");
  return isAuthenticated ? (<Navigate to="/dashboard" />) : ( <Navigate to='/login' />);
};

export default App
