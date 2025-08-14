import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { Resume } from '../../context/ResumeContext';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-lg">
        <h1 className="text-4xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm">
          {resume.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{resume.personalInfo.email}</span>
            </div>
          )}
          {resume.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
          )}
          {resume.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          )}
          {resume.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span>{resume.personalInfo.linkedin}</span>
            </div>
          )}
          {resume.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{resume.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {resume.personalInfo.summary && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-sm text-gray-600">{edu.location}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Projects
            </h2>
            <div className="space-y-4">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      {project.technologies && (
                        <p className="text-sm text-gray-600">{project.technologies}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 mb-2">{project.description}</p>
                  )}
                  {project.link && (
                    <a href={project.link} className="text-blue-600 text-sm hover:underline">
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Certifications
            </h2>
            <div className="space-y-3">
              {resume.certifications.map((cert, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-blue-600">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                  </div>
                  {cert.link && (
                    <a href={cert.link} className="text-blue-600 text-sm hover:underline">
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-2 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {resume.languages.map((lang, index) => (
                <div key={index} className="text-gray-700">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-600"> - {lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;