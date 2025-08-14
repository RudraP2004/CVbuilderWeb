import React, { createContext, useContext, useReducer } from 'react';
import { api } from '../services/api';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
  link: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Resume {
  _id?: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  template: string;
}

interface ResumeState {
  currentResume: Resume | null;
  resumes: Resume[];
  loading: boolean;
  error: string | null;
}

interface ResumeContextType extends ResumeState {
  setCurrentResume: (resume: Resume) => void;
  updateResume: (resume: Resume) => Promise<void>;
  createResume: (resume: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
  fetchResumes: () => Promise<void>;
  fetchResume: (id: string) => Promise<void>;
  clearError: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

type ResumeAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CURRENT_RESUME'; payload: Resume | null }
  | { type: 'SET_RESUMES'; payload: Resume[] }
  | { type: 'ADD_RESUME'; payload: Resume }
  | { type: 'UPDATE_RESUME'; payload: Resume }
  | { type: 'DELETE_RESUME'; payload: string };

const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_CURRENT_RESUME':
      return { ...state, currentResume: action.payload };
    case 'SET_RESUMES':
      return { ...state, resumes: action.payload };
    case 'ADD_RESUME':
      return { ...state, resumes: [action.payload, ...state.resumes] };
    case 'UPDATE_RESUME':
      return {
        ...state,
        resumes: state.resumes.map(r => r._id === action.payload._id ? action.payload : r),
        currentResume: state.currentResume?._id === action.payload._id ? action.payload : state.currentResume
      };
    case 'DELETE_RESUME':
      return {
        ...state,
        resumes: state.resumes.filter(r => r._id !== action.payload)
      };
    default:
      return state;
  }
};

const initialState: ResumeState = {
  currentResume: null,
  resumes: [],
  loading: false,
  error: null
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const setCurrentResume = (resume: Resume) => {
    dispatch({ type: 'SET_CURRENT_RESUME', payload: resume });
  };

  const createResume = async (resumeData: Partial<Resume>): Promise<Resume> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.post('/resume', resumeData);
      const resume = response.data.resume;
      dispatch({ type: 'ADD_RESUME', payload: resume });
      dispatch({ type: 'SET_LOADING', payload: false });
      return resume;
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to create resume' 
      });
      throw error;
    }
  };

  const updateResume = async (resume: Resume): Promise<void> => {
    if (!resume._id) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.put(`/resume/${resume._id}`, resume);
      dispatch({ type: 'UPDATE_RESUME', payload: response.data.resume });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to update resume' 
      });
      throw error;
    }
  };

  const deleteResume = async (id: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await api.delete(`/resume/${id}`);
      dispatch({ type: 'DELETE_RESUME', payload: id });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to delete resume' 
      });
      throw error;
    }
  };

  const fetchResumes = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.get('/resume');
      dispatch({ type: 'SET_RESUMES', payload: response.data });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to fetch resumes' 
      });
    }
  };

  const fetchResume = async (id: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await api.get(`/resume/${id}`);
      dispatch({ type: 'SET_CURRENT_RESUME', payload: response.data });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error: any) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || 'Failed to fetch resume' 
      });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <ResumeContext.Provider value={{
      ...state,
      setCurrentResume,
      updateResume,
      createResume,
      deleteResume,
      fetchResumes,
      fetchResume,
      clearError
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};