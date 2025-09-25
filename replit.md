# Pet Clinic Landing Page - Purrfect Paws

## Overview
This is a modern Korean pet clinic landing page with a trendy design targeting younger demographics. The application includes a full-stack solution with Express.js backend, SQLite database, and static frontend with admin management capabilities.

## Recent Changes (September 25, 2025)
- Configured for Replit environment with proper host binding (0.0.0.0:5000)
- Added cache control headers for proper display in Replit's proxy environment
- Set up workflow for automatic server startup
- Configured deployment for autoscale production environment
- Tested all functionality including inquiry submission and admin management

## Project Architecture
- **Backend**: Node.js with Express.js server
- **Database**: SQLite with automatic table creation
- **Frontend**: Static HTML/CSS/JS with modern animations and interactions
- **Admin Panel**: Session-based authentication for inquiry management
- **Port**: 5000 (required for Replit environment)

## Key Features
- Modern landing page with scroll animations and interactive gallery
- Inquiry form with database storage
- Admin authentication and inquiry management dashboard
- Photo/video gallery toggle functionality
- Responsive design with Korean language support
- Session-based admin authentication with bcrypt password hashing

## Admin Credentials
- Username: `admin`
- Password: `petclinic123!`

## Technical Notes
- Server binds to 0.0.0.0:5000 for Replit proxy compatibility
- Cache control headers prevent caching issues in iframe environment
- SQLite database auto-creates on startup
- Environment variables can be set via .env file for production customization

## Dependencies
- express: Web server framework
- sqlite3: Database driver
- bcrypt: Password hashing
- express-session: Session management
- dotenv: Environment variable management

## Deployment
Configured for Replit autoscale deployment with npm start command.