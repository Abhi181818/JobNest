import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <Facebook className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <Twitter className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <Instagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <Linkedin className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2025 JobNest. All rights reserved.
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                    <div className="flex space-x-6 md:order-2">
                        <Link to="/" className="text-gray-500 hover:text-gray-900">Home</Link>
                        <Link to="/search" className="text-gray-500 hover:text-gray-900">Jobs</Link>
                        <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <a href="mailto:info@jobnest.com" className="flex items-center text-gray-500 hover:text-gray-900">
                            <Mail className="h-5 w-5 mr-2" />
                            <span>info@jobnest.com</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;