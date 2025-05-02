import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Search, Filter, X, ChevronDown } from 'lucide-react';

const JobSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([]);
    const [showFilters, setShowFilters] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
    });

    const colorScheme = {
        primary: 'blue',
        secondary: 'indigo',
        accent: 'purple',
        neutral: 'gray'
    };

    const locationOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'US'];

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]);
            }
        };
        fetchJobs();
    }, []);

    const handleFilterChange = (filterType, value) => {
        if (Array.isArray(filters[filterType])) {
            if (filters[filterType].includes(value)) {
                setFilters({
                    ...filters,
                    [filterType]: filters[filterType].filter(item => item !== value)
                });
            } else {
                setFilters({
                    ...filters,
                    [filterType]: [...filters[filterType], value]
                });
            }
        } else {
            // For radio buttons and selects (strings)
            setFilters({
                ...filters,
                [filterType]: value
            });
        }
    };

    const clearFilters = () => {
        setFilters({
            location: '',
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation = !filters.location || job.location.includes(filters.location);
        return matchesSearch && matchesLocation;
    });

    return (
        <div className={`job-search bg-${colorScheme.neutral}-50 min-h-screen`}>
            <div className="max-w-7xl mx-auto p-4">
                <div className="text-center mb-6">
                    <h1 className={`text-3xl font-bold text-${colorScheme.neutral}-900`}>Find Your Perfect Job</h1>
                    <p className={`text-${colorScheme.neutral}-600 mt-2`}>
                        Browse through hundreds of job opportunities
                    </p>
                </div>

                <div className="lg:flex gap-6">
                    <div className={`lg:w-1/4 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className={`bg-white rounded-lg shadow-md p-4 sticky top-4`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className={`text-lg font-semibold text-${colorScheme.neutral}-900 flex items-center`}>
                                    <Filter size={18} className="mr-2" />
                                    Filters
                                </h2>
                                <button
                                    onClick={clearFilters}
                                    className={`text-${colorScheme.primary}-600 text-sm hover:underline flex items-center`}
                                >
                                    <X size={14} className="mr-1" />
                                    Clear All
                                </button>
                            </div>

                            <div className="mb-6">
                                <h3 className={`text-${colorScheme.neutral}-700 font-medium mb-2 flex items-center`}>
                                    <MapPin size={16} className="mr-1" />
                                    Location
                                </h3>
                                <select
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    className={`w-full p-2 border border-${colorScheme.neutral}-300 rounded-md focus:outline-none focus:ring-1 focus:ring-${colorScheme.primary}-500`}
                                >
                                    <option value="">All Locations</option>
                                    {locationOptions.map(location => (
                                        <option key={location} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>

                    <div className="lg:w-3/4">
                        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search by job title"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`w-full pl-10 p-3 border border-${colorScheme.neutral}-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${colorScheme.primary}-500`}
                                        />
                                        <Search className={`absolute left-3 top-3 text-${colorScheme.neutral}-400`} size={20} />
                                    </div>
                                </div>
                                <button
                                    onClick={toggleFilters}
                                    className={`lg:hidden flex items-center justify-center p-3 bg-${colorScheme.primary}-100 text-${colorScheme.primary}-600 rounded-md`}
                                >
                                    <Filter size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="job-list">
                            <div className="flex justify-between items-center mb-4">
                                <p className={`text-${colorScheme.neutral}-600`}>
                                    <span className="font-medium">{filteredJobs.length}</span> jobs found
                                </p>
                                <div className={`text-${colorScheme.neutral}-600 flex items-center`}>
                                    <span className="mr-2">Sort by:</span>
                                    <select className={`p-1 border border-${colorScheme.neutral}-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-${colorScheme.primary}-500`}>
                                        <option>Most Relevant</option>
                                        <option>Newest</option>
                                        <option>Salary: High to Low</option>
                                        <option>Salary: Low to High</option>
                                    </select>
                                </div>
                            </div>

                            {filteredJobs.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {filteredJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className={`bg-white border-l-4 border-${colorScheme.primary}-500 rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-b-2`}
                                        >
                                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                                <img src={job.imageUrl} alt={job.company} className='className="h-6 w-6 rounded-full mr-2"' />

                                                <span className="font-medium"> {job.company}</span>
                                            </div>
                                            <h3 className={`text-xl font-semibold text-${colorScheme.neutral}-900 mb-2`}>{job.title}</h3>
                                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                                <MapPin className={`mr-1 text-${colorScheme.primary}-500`} size={16} />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {job.jobType && (
                                                    <span className={`text-xs px-2 py-1 rounded-full bg-${colorScheme.primary}-100 text-${colorScheme.primary}-800`}>
                                                        {job.jobType}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className={`text-${colorScheme.neutral}-700 font-bold`}>₹{job.salaryRange} P.A.</p>
                                                <Link
                                                    to={`/job/${job.id}`}
                                                    className={`py-2 px-4 bg-${colorScheme.primary}-600 hover:bg-${colorScheme.primary}-700 text-white rounded-md font-medium text-sm transition-colors duration-300`}
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                                    <p className={`text-xl text-${colorScheme.neutral}-600`}>No jobs found matching your criteria.</p>
                                    <button
                                        onClick={clearFilters}
                                        className={`mt-4 text-${colorScheme.primary}-600 hover:underline`}
                                    >
                                        Clear filters and try again
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSearch;