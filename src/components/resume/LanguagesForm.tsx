import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Resume, Language } from '../../context/ResumeContext';

interface LanguagesFormProps {
  data: Resume;
  onChange: (data: Resume) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, onChange }) => {
  const proficiencyLevels = [
    { value: 'basic', label: 'Basic' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'professional', label: 'Professional' },
    { value: 'native', label: 'Native' }
  ];

  const handleAddLanguage = () => {
    const newLanguage: Language = {
      name: '',
      proficiency: 'professional'
    };

    onChange({
      ...data,
      languages: [...data.languages, newLanguage]
    });
  };

  const handleRemoveLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index)
    });
  };

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = data.languages.map((lang, i) => {
      if (i === index) {
        return { ...lang, [field]: value };
      }
      return lang;
    });

    onChange({
      ...data,
      languages: updatedLanguages
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Languages</h2>
        <button
          onClick={handleAddLanguage}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </button>
      </div>

      {data.languages.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No languages added yet.</p>
          <p className="text-sm">Click "Add Language" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.languages.map((lang, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Language {index + 1}</h3>
                <button
                  onClick={() => handleRemoveLanguage(index)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language *
                  </label>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Spanish"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Proficiency Level
                  </label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    {proficiencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagesForm;