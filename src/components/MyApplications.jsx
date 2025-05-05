import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Briefcase,
    MapPin,
    Calendar,
    Check,
    X,
    Eye,
    Filter,
    Clock,
    Award,
    ClipboardList
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/applications');
                const userApplications = response.data.filter(app => app.userId === user.id);

                const enrichedApplications = await Promise.all(userApplications.map(async (app) => {
                    const jobResponse = await axios.get(`http://localhost:8080/api/jobs/${app.jobId}`);
                    return { ...app, job: jobResponse.data };
                }));

                setApplications(enrichedApplications);
            } catch (error) {
                toast.error('Error fetching your applications');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user, navigate]);

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
    };

    const filteredApplications = applications.filter((application) => {
        if (filter === 'all') return true;
        if (filter === 'pending') return application.status === 'Pending';
        if (filter === 'completed') return application.status === 'Accepted' || application.status === 'Rejected';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted':
                return {
                    bg: 'bg-emerald-100',
                    text: 'text-emerald-800',
                    icon: <Check className="mr-1.5 h-4 w-4 text-emerald-600" />
                };
            case 'Rejected':
                return {
                    bg: 'bg-rose-100',
                    text: 'text-rose-800',
                    icon: <X className="mr-1.5 h-4 w-4 text-rose-600" />
                };
            default:
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-800',
                    icon: <Clock className="mr-1.5 h-4 w-4 text-blue-600" />
                };
        }
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <ClipboardList className="h-12 w-12 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                    <p className="mt-2 text-gray-600">Track all your job applications in one place</p>
                </div>

                <div className="mb-8 flex justify-center space-x-4">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center ${filter === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow'
                            }`}
                    >
                        <Award className={`mr-2 h-4 w-4 ${filter === 'all' ? 'text-white' : 'text-blue-500'}`} />
                        All Applications
                    </button>
                    <button
                        onClick={() => handleFilterChange('pending')}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center ${filter === 'pending'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow'
                            }`}
                    >
                        <Clock className={`mr-2 h-4 w-4 ${filter === 'pending' ? 'text-white' : 'text-blue-500'}`} />
                        Pending
                    </button>
                    <button
                        onClick={() => handleFilterChange('completed')}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center ${filter === 'completed'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow'
                            }`}
                    >
                        <Filter className={`mr-2 h-4 w-4 ${filter === 'completed' ? 'text-white' : 'text-blue-500'}`} />
                        Completed
                    </button>
                </div>

                {filteredApplications.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Briefcase className="mx-auto h-16 w-16 text-gray-300" />
                        <h3 className="mt-4 text-xl font-medium text-gray-900">No applications found</h3>
                        <p className="mt-2 text-gray-500">Try changing the filter or start applying for jobs!</p>
                        <Link to="/jobs" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredApplications.map((application) => {
                            const statusStyles = getStatusColor(application.status);
                            return (
                                <div
                                    key={application.id}
                                    className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                                            <div>
                                                <div className="flex items-start">
                                                    <div className="hidden md:flex h-12 w-12 rounded-lg bg-blue-100 items-center justify-center mr-4">
                                                        <Briefcase className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900">{application.job.title}</h3>
                                                        <div className="mt-2 flex items-center text-sm text-gray-600">
                                                            <img src={application.job.imageUrl} alt={application.job.company} className="h-6 w-6 rounded-full mr-2" />
                                                            <span className="truncate">{application.job.company}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <MapPin className="mr-1.5 h-4 w-4 text-blue-500 flex-shrink-0" />
                                                        <span className="truncate">{application.job.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-3">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles.bg} ${statusStyles.text}`}>
                                                    {statusStyles.icon}
                                                    {application.status}
                                                </span>
                                                <Link
                                                    to={`/job/${application.jobId}`}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                >
                                                    <Eye className="mr-1.5 h-4 w-4" />
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`h-1 w-full ${application.status === 'Accepted' ? 'bg-emerald-500' :
                                        application.status === 'Rejected' ? 'bg-rose-500' :
                                            'bg-blue-500'
                                        }`}>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplications;