const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/db');
const logger = require('./utils/logger');

// Import routes
const authRoutes = require('./modules/auth/auth.routes');
const blogRoutes = require('./modules/blog/blog.routes');
const leadsRoutes = require('./modules/leads/leads.routes');
const portfolioRoutes = require('./modules/portfolio/portfolio.routes');
const servicesRoutes = require('./modules/services/services.routes');
const teamRoutes = require('./modules/team/team.routes');
const testimonialsRoutes = require('./modules/testimonials/testimonials.routes');
const mediaRoutes = require('./modules/media/media.routes');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ethiocodes.com', 'https://www.ethiocodes.com']
    : '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'EthioCodes API is working!',
    version: '1.0.0',
    endpoints: [
      '/api/auth',
      '/api/blog',
      '/api/leads',
      '/api/portfolio',
      '/api/services',
      '/api/team',
      '/api/testimonials',
      '/api/media'
    ]
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/media', mediaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await testConnection();
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized');
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n✅ Server is running!`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/health`);
      console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
      console.log(`\n📚 Available API Endpoints:`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   GET    /api/auth/me`);
      console.log(`   GET    /api/blog`);
      console.log(`   POST   /api/leads/contact`);
      console.log(`   GET    /api/services`);
      console.log(`   GET    /api/team`);
      console.log(`   GET    /api/testimonials`);
      console.log(`   GET    /api/portfolio\n`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;