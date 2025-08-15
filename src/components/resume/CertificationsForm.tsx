import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Resume, Certification } from '../../context/ResumeContext';

interface CertificationsFormProps {
  data: Resume;
  onChange: (data: Resume) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, onChange }) => {
  const handleAddCertification = () => {
    const newCertification: Certification = {
      name: '',
      issuer: '',
      date: '',
      link: ''
    };

    onChange({
      ...data,
      certifications: [...data.certifications, newCertification]
    });
  };

  const handleRemoveCertification = (index: number) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== index)
    });
  };

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = data.certifications.map((cert, i) => {
      if (i === index) {
        return { ...cert, [field]: value };
      }
      return cert;
    });

    onChange({
      ...data,
      certifications: updatedCertifications
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        <button
          onClick={handleAddCertification}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      {data.certifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No certifications added yet.</p>
          <p className="text-sm">Click "Add Certification" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.certifications.map((cert, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Certification {index + 1}
                </h3>
                <button
                  onClick={() => handleRemoveCertification(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certification Name *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issuing Organization *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credential Link
                  </label>
                  <input
                    type="url"
                    value={cert.link}
                    onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
                    placeholder="https://credly.com/badge/..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
