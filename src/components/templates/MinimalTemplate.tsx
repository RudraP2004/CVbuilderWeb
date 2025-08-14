import React from 'react';
import { Resume } from '../../context/ResumeContext';

interface MinimalTemplateProps {
  resume: Resume;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ resume }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-light">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-light mb-6">{resume.personalInfo.fullName}</h1>
        
        <div className="text-sm text-gray-600 space-y-1">
          {resume.personalInfo.email && (
            <div>{resume.personalInfo.email}</div>
          )}
          {resume.personalInfo.phone && (
            <div>{resume.personalInfo.phone}</div>
          )}
          {resume.personalInfo.location && (
            <div>{resume.personalInfo.location}</div>
          )}
          {resume.personalInfo.linkedin && (
            <div>{resume.personalInfo.linkedin}</div>
          )}
          {resume.personalInfo.website && (
            <div>{resume.personalInfo.website}</div>
          )}
        </div>
      </div>

      <div className="space-y-12">
        {/* Summary */}
        {resume.personalInfo.summary && (
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-6">Experience</h2>
            <div className="space-y-8">
              {resume.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-normal">{exp.jobTitle}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
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
            <h2 className="text-2xl font-light mb-6">Education</h2>
            <div className="space-y-6">
              {resume.education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-normal">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-sm text-gray-500">{edu.location}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
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
            <h2 className="text-2xl font-light mb-6">Skills</h2>
            <div className="text-gray-700 leading-relaxed">
              {resume.skills.map((skill, index) => (
                <span key={index}>
                  {skill.name}
                  {index < resume.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-6">Projects</h2>
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-normal">{project.title}</h3>
                      {project.technologies && (
                        <p className="text-sm text-gray-500">{project.technologies}</p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(project.startDate)} — {formatDate(project.endDate)}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-gray-700 mb-2">{project.description}</p>
                  )}
                  {project.link && (
                    <p className="text-sm text-gray-500">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-6">Certifications</h2>
            <div className="space-y-3">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-normal">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-6">Languages</h2>
            <div className="text-gray-700 leading-relaxed">
              {resume.languages.map((lang, index) => (
                <span key={index}>
                  {lang.name} ({lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)})
                  {index < resume.languages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;