import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Edit3, Eye, Trash2, Calendar } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { resumes, fetchResumes, deleteResume, loading, error } = useResume();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDeleteResume = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setDeletingId(id);
      try {
        await deleteResume(id);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && resumes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-500 to-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto text-white">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-white text-lg">
          Manage your resumes and create new ones to land your dream job.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-600 border border-red-700 rounded-md shadow-md">
          <p className="text-sm text-white">{error}</p>
        </div>
      )}

      {/* Create New Resume Button */}
      <div className="mb-8 flex justify-center">
        <Link
          to="/resume/new"
          className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Resume
        </Link>
      </div>

      {/* Empty State */}
      {resumes.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-2xl shadow-inner border border-gray-700">
          <FileText className="mx-auto h-16 w-16 text-white mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            No resumes yet
          </h3>
          <p className="text-white mb-6">
            Create your first resume to get started on your job search journey.
          </p>
          <Link
            to="/resume/new"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Resume
          </Link>
        </div>
      ) : (
        /* Resume Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-white"
            >
              <div className="p-6">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">
                      {resume.title}
                    </h3>
                    <p className="text-sm text-white mb-2">
                      {resume.personalInfo.fullName || 'Untitled Resume'}
                    </p>
                    <div className="flex items-center text-xs text-white">
                      <Calendar className="h-3 w-3 mr-1" />
                      Updated {formatDate(resume.updatedAt)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="px-3 py-1 bg-gray-700 text-white text-xs font-medium rounded-full capitalize">
                      {resume.template}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/resume/${resume._id}/edit`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-all"
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <Link
                      to={`/resume/${resume._id}/preview`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium rounded-md transition-all"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Link>
                  </div>
                  <button
                    onClick={() => handleDeleteResume(resume._id!)}
                    disabled={deletingId === resume._id}
                    className="inline-flex items-center px-2 py-1.5 text-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    {deletingId === resume._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
