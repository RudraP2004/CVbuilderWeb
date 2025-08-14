import React from 'react';
import { Resume } from '../../context/ResumeContext';

interface TemplateSelectorProps {
  data: Resume;
  onChange: (data: Resume) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ data, onChange }) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with subtle colors',
      preview: '/images/modern-template.png'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout perfect for conservative industries',
      preview: '/images/classic-template.png'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant with focus on content',
      preview: '/images/minimal-template.png'
    }
  ];

  const handleTemplateChange = (templateId: string) => {
    onChange({
      ...data,
      template: templateId
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Choose Template</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
              data.template === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleTemplateChange(template.id)}
          >
            <div className="p-6">
              <div className="aspect-[3/4] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-xl">
                      {template.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Preview</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>
              
              {data.template === template.id && (
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Selected
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;