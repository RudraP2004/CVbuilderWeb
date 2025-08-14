import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import CertificationsForm from '../components/resume/CertificationsForm';
import LanguagesForm from '../components/resume/LanguagesForm';
import TemplateSelector from '../components/resume/TemplateSelector';
import { Resume } from '../context/ResumeContext';

const ResumeBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, setCurrentResume, createResume, updateResume, fetchResume, loading } = useResume();
  
  const [activeSection, setActiveSection] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [resumeData, setResumeData] = useState<Resume>({
    title: 'My Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    template: 'modern'
  });

  useEffect(() => {
    if (id) {
      fetchResume(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentResume) {
      setResumeData(currentResume);
    }
  }, [currentResume]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id && currentResume) {
        await updateResume({ ...resumeData, _id: id });
      } else {
        const newResume = await createResume(resumeData);
        navigate(`/resume/${newResume._id}/edit`, { replace: true });
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (id) {
      navigate(`/resume/${id}/preview`);
    } else {
      // For new resumes, we need to save first
      handleSave().then(() => {
        if (currentResume?._id) {
          navigate(`/resume/${currentResume._id}/preview`);
        }
      });
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', label: 'Experience', component: ExperienceForm },
    { id: 'education', label: 'Education', component: EducationForm },
    { id: 'skills', label: 'Skills', component: SkillsForm },
    { id: 'projects', label: 'Projects', component: ProjectsForm },
    { id: 'certifications', label: 'Certifications', component: CertificationsForm },
    { id: 'languages', label: 'Languages', component: LanguagesForm },
    { id: 'template', label: 'Template', component: TemplateSelector }
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || PersonalInfoForm;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Resume' : 'Create New Resume'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </button>
          <button
            onClick={handlePreview}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <ActiveComponent
              data={resumeData}
              onChange={setResumeData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;