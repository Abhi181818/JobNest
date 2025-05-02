import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { LogIn, User, Lock, Mail, ArrowRight, Briefcase, CheckCircle } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', credentials);
            login(response.data);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error('Invalid email or password');
            console.error('Error logging in:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 flex-col justify-center">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center mb-6">
                        <Briefcase className="h-8 w-8 mr-2" />
                        <h1 className="text-2xl font-bold">JobNest</h1>
                    </div>

                    <h2 className="text-4xl font-bold mb-6">Find Your Dream Job Today</h2>
                    <p className="text-lg mb-8 text-blue-100">Join thousands of job seekers who have found their perfect career match using JobNest's powerful platform.</p>

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Access to thousands of job listings across all industries</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Easy application tracking system to manage your job search</p>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle className="h-6 w-6 mr-2 text-blue-200 flex-shrink-0" />
                            <p>Find opportunities that fit your skills</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-center">
                            <div className="md:hidden mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="mt-4 text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-center text-gray-600">
                                Sign in to your JobNest account
                            </p>
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                            <div className="space-y-4">
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
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            placeholder="Enter your email"
                                            value={credentials.email}
                                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
                                            value={credentials.password}
                                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
                                        <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                                    </span>
                                    <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                                    {!loading && (
                                        <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                                            <ArrowRight className="h-5 w-5 text-blue-300 group-hover:text-blue-200" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;