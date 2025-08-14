import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Edit3 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from '../components/templates/ModernTemplate';
import ClassicTemplate from '../components/templates/ClassicTemplate';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import { generatePDF } from '../utils/pdfGenerator';

const ResumePreview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, fetchResume, loading, error } = useResume();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume(id);
    }
  }, [id]);

  const renderTemplate = () => {
    if (!currentResume) return null;

    switch (currentResume.template) {
      case 'classic':
        return <ClassicTemplate resume={currentResume} />;
      case 'minimal':
        return <MinimalTemplate resume={currentResume} />;
      default:
        return <ModernTemplate resume={currentResume} />;
    }
  };

  const handleDownloadPDF = async () => {
    if (!currentResume) return;
    
    setIsGeneratingPDF(true);
    try {
      await generatePDF(currentResume);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !currentResume) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Resume not found</h2>
        <p className="text-gray-600 mb-4">
          {error || 'The resume you\'re looking for doesn\'t exist or you don\'t have permission to view it.'}
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{currentResume.title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/resume/${id}/edit`)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Resume
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div id="resume-preview" className="p-8">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;