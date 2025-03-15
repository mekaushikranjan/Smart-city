const Complaint = require("../models/Complaint");

// Create a new complaint
exports.createComplaint = async (req, res) => {
  try {
    // Validate session
    if (!req.session.user?.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { title, description, category, location } = req.body;

    // Validate input
    if (!title || !description || !category || !location) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["title", "description", "category", "location"]
      });
    }

    const newComplaint = await Complaint.create({
      user: req.session.user.id,
      title,
      description,
      category,
      location,
      status: "Pending" // Default status
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint: await Complaint.findById(newComplaint._id).populate('user', 'name email')
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all complaints (Admin only)
exports.getAllComplaints = async (req, res) => {
  try {
    // Additional admin check
    if (req.session.user?.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get user-specific complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.session.user.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(complaints);

  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update complaint status (Admin only)
exports.updateComplaintStatus = async (req, res) => {
  try {
    // Additional admin check
    if (req.session.user?.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    const validStatuses = ["Pending", "In Progress", "Resolved"];
    const { status } = req.body;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Invalid status",
        validStatuses
      });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ 
      message: "Status updated successfully",
      complaint: updatedComplaint
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Authorization check
    const isOwner = complaint.user.toString() === req.session.user.id;
    const isAdmin = req.session.user?.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await complaint.deleteOne();
    res.json({ message: "Complaint deleted successfully" });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};