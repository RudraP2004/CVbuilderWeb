import React from 'react';
import { Resume } from '../../context/ResumeContext';

interface ClassicTemplateProps {
  resume: Resume;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ resume }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-serif">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-4">{resume.personalInfo.fullName}</h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {resume.personalInfo.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo.phone && (
            <span>•</span>
          )}
          {resume.personalInfo.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo.location && (
            <>
              <span>•</span>
              <span>{resume.personalInfo.location}</span>
            </>
          )}
        </div>
        
        {(resume.personalInfo.linkedin || resume.personalInfo.website) && (
          <div className="flex flex-wrap justify-center gap-4 text-sm mt-2">
            {resume.personalInfo.linkedin && (
              <span>{resume.personalInfo.linkedin}</span>
            )}
            {resume.personalInfo.website && resume.personalInfo.linkedin && (
              <span>•</span>
            )}
            {resume.personalInfo.website && (
              <span>{resume.personalInfo.website}</span>
            )}
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Summary */}
        {resume.personalInfo.summary && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Professional Summary
            </h2>
            <p className="text-gray-800 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{exp.jobTitle}</h3>
                      <p className="font-semibold">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-700">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-800 leading-relaxed">
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
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="font-semibold">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-sm text-gray-700">{edu.location}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="text-gray-800 mt-1">{edu.description}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {resume.skills.map((skill, index) => (
                <div key={index} className="text-gray-800">
                  • {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Notable Projects
            </h2>
            <div className="space-y-4">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{project.title}</h3>
                      {project.technologies && (
                        <p className="text-sm text-gray-700 italic">{project.technologies}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-700">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-800 mb-2">{project.description}</p>
                  )}
                  {project.link && (
                    <p className="text-sm text-gray-700">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Certifications
            </h2>
            <div className="space-y-2">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <span className="font-semibold">{cert.name}</span>
                    <span className="text-gray-700"> - {cert.issuer}</span>
                  </div>
                  <span className="text-sm text-gray-700">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide border-b border-gray-400 pb-1 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-6">
              {resume.languages.map((lang, index) => (
                <div key={index} className="text-gray-800">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-gray-700"> ({lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;