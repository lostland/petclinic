# Seoul Pet Clinic Center - Project Documentation

## Overview
This is a Seoul Pet Clinic Center landing page with a full-stack setup:
- **Frontend**: React + TypeScript + Vite (port 5000)
- **Backend**: Express + TypeScript (port 3001)
- **Database**: SQLite with better-sqlite3
- **Features**: Pet clinic website with inquiry form and Naver Maps integration

## Recent Changes (September 29, 2025)
- Successfully imported GitHub project to Replit environment
- Updated Vite configuration to run on port 5000 with `allowedHosts: true` for Replit proxy support
- Configured deployment settings for autoscale deployment
- Set up development workflow running both frontend and backend concurrently
- All dependencies installed and TypeScript errors resolved

## Project Architecture
- **Frontend** (`src/`): React components with Framer Motion animations
  - Components: HeroSection, ServicesSection, GallerySection, InquirySection, MapSection, etc.
  - Styles: Modular CSS files for each component
- **Backend** (`server/src/`): Express API server
  - Database operations with SQLite
  - Inquiry form API endpoint at `/api/inquiries`
- **Build System**: 
  - Frontend: Vite bundler
  - Backend: TypeScript compilation
  - Concurrent development with npm scripts

## Current Status
- ✅ Application successfully running in Replit environment
- ✅ Frontend accessible through Replit proxy
- ✅ Backend API operational on localhost:3001
- ✅ Database schema initialized
- ⚠️ Naver Maps API using demo key (authentication fails, but map section exists)

## User Preferences
- Korean language content
- Pastel color scheme with pet-friendly design
- Responsive mobile layout
- SQLite for simple data storage needs