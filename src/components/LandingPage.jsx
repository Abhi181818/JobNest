import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, ArrowRight, Info } from 'lucide-react';
import { toast } from 'react-toastify';

const LandingPage = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate("/search")
    };

    useEffect(() => {
        const fetchFeaturedJobs = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/jobs');
                const data = await response.json();
                setFeaturedJobs(data);
            } catch (error) {
                toast.error('Error fetching featured jobs');
            }
        };
        fetchFeaturedJobs();
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 hover:scale-105 transition duration-150">
                                Find Your <span className="text-blue-600">Dream Job</span>
                            </h1>
                            <p className="mt-4 text-gray-600">
                                Discover opportunities with top employers to advance your career.
                            </p>
                            <div className="mt-6 flex">
                                {/* <input
                                    type="text"
                                    placeholder="Search for jobs..."
                                    className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                                /> */}
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors duration-300 flex items-center rounded-md"
                                >
                                    <Search size={16} className="mr-2 animate-spin" />
                                    Search you next dream Job!!.
                                </button>
                            </div>
                        </div>
                        <div className="md:w-2/5">
                            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 hover:border-b-2">
                                <img
                                    src="https://media.istockphoto.com/id/1279104620/photo/top-view-of-a-white-desktop-concept-job-search.jpg?s=612x612&w=0&k=20&c=Ow_kvA2wQ4rLlqX_oFHgpjLb1JMKyPQKLOPzbu6w6qw="
                                    alt="landing image"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 ">
                        Featured <span className="text-blue-600 hover:underline">Opportunities</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredJobs.slice(0, 6).map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-b-2 transition-all duration-300"
                            >
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    {/* <Briefcase size={16} className="mr-2 text-blue-500" /> */}
                                    <img src={job.imageUrl} alt={job.company} className="h-6 w-6 rounded-full mr-2" />
                                    <span>{job.company}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{job.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <MapPin size={16} className="mr-2 text-blue-500" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <IndianRupee size={16} className="mr-2 text-blue-500" />
                                    <span>{job.salaryRange}</span>
                                </div>
                                <Link
                                    to={`/job/${job.id}`}
                                    className="flex bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium py-2 px-4 rounded transition-colors duration-300 mt-auto"
                                >
                                    <Info size={16} className='mr-9 mt-1' />
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            to="/search"
                            className=" inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300"
                        >
                            View All Jobs
                            <ArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;