import { Program } from '../models/Program.js';

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get program by ID
// @route   GET /api/programs/:id
// @access  Public
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
