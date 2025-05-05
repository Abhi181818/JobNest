import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import JobSearch from './components/JobSearch';
import JobDetails from './components/JobDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import MyApplications from './components/MyApplications';
import AuthContextProvider from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<JobSearch />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-applications" element={<MyApplications />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer autoClose={3000} />
      </div>
    </AuthContextProvider>
  );
}

export default App;
