import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Briefcase,
    MapPin,
    Check,
    Clock,
    Building,
    User,
    Mail,
    IndianRupee
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [applicant, setApplicant] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
                setJob(response.data);
                if (user) {
                    setApplicant({ name: user.name || '', email: user.email || '' });
                }
                setLoading(false);
            } catch (error) {
                toast.error('Error loading job details. Please try again.');
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id, user]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!applicant.name || !applicant.email) {
            toast.error('Please provide your name and email.');
            return;
        }
        try {
            setApplying(true);
            await axios.post('http://localhost:8080/api/applications', {
                applicantName: applicant.name,
                jobTitle: job.title,
                status: 'Pending',
                user: { id: user.id },
                job: { id: job.id }
            });
            toast.success('Application submitted successfully!');
            navigate("/my-applications")
            setApplying(false);
        } catch (error) {
            toast.error('Error submitting application. Please try again.');
            setApplying(false);
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!job) return <div className="text-center py-20">Job not found.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    {/* Job Header */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Building className="mr-2 text-blue-500" />
                            <span>{job.company}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="mr-1 text-blue-500" />
                                <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <IndianRupee className="mr-1 text-blue-500" />
                                <span>{job.salaryRange}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-1 text-blue-500" />
                                <span>Full-time</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <img src={job.imageUrl} alt="" className='className="h-6 w-6 rounded-full mr-2"' />
                            Job Description
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Apply for this Job</h2>
                        <form onSubmit={handleApply}>
                            <div className="mb-4 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={applicant.name}
                                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-white text-gray-900"
                                    required
                                />
                            </div>
                            <div className="mb-6 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={applicant.email}
                                    onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 bg-white text-gray-900"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={applying}
                                className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {applying ? 'Submitting...' : (
                                    <>
                                        <Check className="h-5 w-5 mr-2" />
                                        Apply Now
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
