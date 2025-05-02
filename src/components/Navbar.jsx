import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    Home,
    LogIn,
    LogOut,
    Search,
    User2Icon,
    ClipboardList
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl transition-all duration-300">
            <div className="px-6 py-3 bg-white/80  backdrop-blur-md shadow-lg rounded-xl">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-2">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                        <span className="text-xl font-bold text-gray-800">Job<span className="text-blue-600">Nest</span></span>
                    </Link>

                    <div className="hidden md:flex items-center flex-1 justify-center mx-4">
                        <Link to="/search" className="relative group ">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-200">
                                <Search size={18} className="text-gray-500 group-hover:text-blue-500" />
                                <span className="text-gray-600 group-hover:text-blue-500">Search Jobs</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-1 md:space-x-4">

                        <Link
                            to="/search"
                            className="md:hidden flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                            <Search size={18} className="flex-shrink-0" />
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/my-applications"
                                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                >
                                    <ClipboardList size={18} className="flex-shrink-0" />
                                    <span className="hidden md:inline">My Applications</span>
                                </Link>

                                <div className="hidden md:flex items-center px-3 py-2 text-gray-600">
                                    <span className="text-sm font-medium">Hi, {user.name?.split(' ')[0]}</span>
                                </div>

                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 px-4 py-2 text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-red-300 focus:outline-none"
                                >
                                    <LogOut size={18} className="flex-shrink-0" />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                >
                                    <LogIn size={18} className="flex-shrink-0" />
                                    <span className="hidden md:inline">Login</span>
                                </Link>

                                <Link
                                    to="/signup"
                                    className="flex items-center space-x-1 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-300 focus:outline-none"
                                >
                                    <User2Icon size={18} className="flex-shrink-0" />
                                    <span className="hidden md:inline">Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;