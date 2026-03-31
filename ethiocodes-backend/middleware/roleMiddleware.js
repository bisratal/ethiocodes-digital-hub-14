const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

const isAdmin = checkRole('Admin');
const isAdminOrEditor = checkRole('Admin', 'Editor');

module.exports = { checkRole, isAdmin, isAdminOrEditor };