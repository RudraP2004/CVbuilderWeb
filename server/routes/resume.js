import express from 'express';
import { body, validationResult } from 'express-validator';
import Resume from '../models/Resume.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all resumes for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error getting resumes' });
  }
});

// Get single resume
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error getting resume' });
  }
});

// Create resume
router.post('/', authenticateToken, async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user._id
    };

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json({
      message: 'Resume created successfully',
      resume
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error creating resume' });
  }
});

// Update resume
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({
      message: 'Resume updated successfully',
      resume
    });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error updating resume' });
  }
});

// Delete resume
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error deleting resume' });
  }
});

export default router;