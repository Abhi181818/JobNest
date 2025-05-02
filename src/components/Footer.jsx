import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t mt-2">
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
            </div>
        </footer>
    );
};

export default Footer;