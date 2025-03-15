// authMiddleware.js

/**
 * Session configuration settings
 * @constant {Object} sessionConfig
 */
const sessionConfig = {
  cookieName: 'session.token',
  adminRole: 'admin',
  errorMessages: {
    unauthenticated: 'Unauthorized access. Please log in.',
    unauthorized: 'Forbidden: Admin privileges required'
  }
};

/**
 * Authentication middleware to verify user session
 * @middleware isAuthenticated
 */
const isAuthenticated = (req, res, next) => {
  if (!req.session?.user) {
    return res.status(401).json({ 
      success: false,
      message: sessionConfig.errorMessages.unauthenticated
    });
  }
  next();
};

/**
 * Authorization middleware to verify admin privileges
 * @middleware isAdmin
 */
const isAdmin = (req, res, next) => {
  if (req.session.user?.role !== sessionConfig.adminRole) {
    return res.status(403).json({ 
      success: false,
      message: sessionConfig.errorMessages.unauthorized
    });
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  sessionConfig
};