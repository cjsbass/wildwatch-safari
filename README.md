# WildWatch: Safari Lodge Wildlife Notification System

A comprehensive notification system for safari lodges that detects and notifies guests when wildlife is spotted at their cameras. The application includes:

- Real-time wildlife detection notifications
- Admin dashboard for monitoring wildlife activity
- Camera management across multiple lodges
- Guest portal for wildlife sightings
- Responsive UI optimized for desktop and mobile devices

## Features

- **Multi-Lodge Support**: Manage multiple safari lodges with their own camera systems
- **Camera Management**: Add, configure, and monitor cameras with different capabilities (thermal, standard, infrared)
- **Wildlife Notifications**: Automated alerts when animals are detected at watering holes and other locations
- **Guest Management**: Register guests and customize their notification preferences
- **Analytics Dashboard**: View wildlife activity trends and camera performance metrics

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

3. Build for production:
```bash
npm run build
npm start
```

## UI Improvements

- Consistent spacing and alignment across all pages
- Responsive design that works on mobile and desktop
- Unified color scheme with safari-themed colors
- Tabbed navigation for intuitive organization
- Streamlined form inputs and controls

## Technologies Used

- **Next.js 15**: React framework with server components
- **React 19**: UI library for component-based development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **TypeScript**: Static type checking for improved development
- **Shadcn/ui**: Component system built on Radix UI

## Project Structure

- `/app`: Next.js app directory structure with routing
- `/components`: Reusable UI components
- `/lib`: Utility functions and helpers
- `/public`: Static assets and images

## Development

This project uses modern Next.js features including:
- App Router
- Server Components
- Client Components with hooks
- Optimized data fetching 