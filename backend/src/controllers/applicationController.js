import Application from '../models/Application.js';

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
export const createApplication = async (req, res) => {
  try {
    const { domain, personalDetails, academicInfo, requirementsAcknowledged } = req.body;

    const application = new Application({
      userId: req.user._id,
      domain,
      personalDetails,
      academicInfo,
      requirementsAcknowledged,
      status: 'Pending'
    });

    const createdApplication = await application.save();

    // Emit socket event for real-time update (e.g., to admins or user dashboard)
    if (req.io) {
      req.io.emit('application_created', createdApplication);
    }

    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create application', error: error.message });
  }
};

// @desc    Get user applications
// @route   GET /api/applications/my
// @access  Private
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user._id });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (application) {
      application.status = status;
      const updatedApplication = await application.save();

      // Emit socket event for real-time update to user
      if (req.io) {
        req.io.emit(`application_updated_${application.userId}`, updatedApplication);
      }

      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
