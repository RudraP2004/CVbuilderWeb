import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'My Resume'
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String,
    summary: String
  },
  experience: [{
    jobTitle: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    degree: String,
    institution: String,
    location: String,
    startDate: String,
    endDate: String,
    gpa: String,
    description: String
  }],
  skills: [{
    name: String,
    level: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: String,
    link: String,
    startDate: String,
    endDate: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    link: String
  }],
  languages: [{
    name: String,
    proficiency: String
  }],
  template: {
    type: String,
    default: 'modern'
  }
}, {
  timestamps: true
});

export default mongoose.model('Resume', resumeSchema);