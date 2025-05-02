import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus, User, Mail, Lock, Briefcase, CheckCircle } from 'lucide-react';

const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!user.name || !user.email || !user.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            await axios.post('http://localhost:8080/api/users/register', user);
            toast.success('Signup successful! Please login.');
            navigate('/login');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
            console.error('Error during signup:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left panel */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 flex-col justify-center">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center mb-6">
                        <Briefcase className="h-8 w-8 mr-2" />
                        <h1 className="text-2xl font-bold">JobNest</h1>
                    </div>

                    <h2 className="text-4xl font-bold mb-6">Join JobNest Today</h2>
                    <p className="text-lg mb-8 text-blue-100">Create your profile and start your career journey with thousands of job opportunities.</p>

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Connect with top employers</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Get personalized job recommendations</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Track your applications in one place</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="md:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-center">
                            <div className="md:hidden mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h2>
                            <p className="mt-2 text-center text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="appearance-none block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your full name"
                                            value={user.name}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            required
                                            className="appearance-none block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your email"
                                            value={user.email}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            className="appearance-none block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your password"
                                            value={user.password}
                                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
                                    disabled={loading}
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <UserPlus className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                                    </span>
                                    {loading ? 'Signing up...' : 'Sign up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
