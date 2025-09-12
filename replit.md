# ArtOverwatch - Creative Enterprise Platform

## Overview

ArtOverwatch is a comprehensive creative enterprise platform designed to empower visual artists by providing them with corporate-grade tools to manage their entire creative business. The application serves as a unified platform for idea incubation, IP protection, revenue tracking, branding, treasury management, and community building. Built with a modern React frontend and Express backend, the platform emphasizes clean design following Apple's Human Interface Guidelines and provides a professional, corporate aesthetic for creative professionals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture. Key architectural decisions include:

- **UI Framework**: Uses **shadcn/ui** components built on top of **Radix UI primitives** for accessibility and consistency
- **Styling**: **Tailwind CSS** with custom design tokens following Apple HIG principles, featuring a corporate blue-gray color palette
- **Routing**: **Wouter** for lightweight client-side routing
- **State Management**: **TanStack Query** (React Query) for server state management with custom query functions
- **Form Handling**: **React Hook Form** with **Zod** validation through **@hookform/resolvers**
- **Build Tool**: **Vite** for fast development and optimized builds

### Backend Architecture
The backend follows a traditional Express.js pattern with TypeScript:

- **Framework**: **Express.js** with TypeScript for type safety
- **Database ORM**: **Drizzle ORM** with PostgreSQL dialect for type-safe database operations
- **Database Provider**: **Neon Database** (serverless PostgreSQL)
- **Storage Pattern**: Repository pattern implemented through `IStorage` interface with in-memory implementation for development
- **API Design**: RESTful API with `/api` prefix for all routes

### Design System
The application implements a comprehensive design system based on Apple's Human Interface Guidelines:

- **Typography**: SF Pro Display with system font fallbacks, structured hierarchy from headers (600 weight) to body text (400 weight)
- **Color Palette**: Professional blue-gray theme with corporate gradient overlays, supporting both light and dark modes
- **Layout System**: Consistent Tailwind spacing units (4, 6, 8, 12, 16) with card-based layouts
- **Component Library**: Extensive shadcn/ui components with custom styling for corporate aesthetics

### Authentication & Authorization
The application is prepared for authentication through session-based architecture:

- **Session Management**: Uses `connect-pg-simple` for PostgreSQL session storage
- **User Schema**: Drizzle schema defines users with username/password authentication
- **Storage Interface**: Includes user management methods for CRUD operations

### State Management Strategy
The application uses a hybrid approach to state management:

- **Server State**: TanStack Query for caching, synchronization, and background updates of server data
- **Client State**: React's built-in state management (useState, useContext) for UI state
- **Form State**: React Hook Form for complex form state and validation

### Development & Build Process
The project follows modern development practices:

- **Module System**: ESM modules throughout with TypeScript configuration
- **Development Server**: Vite dev server with Express API proxy
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled

## External Dependencies

### Database & Storage
- **Neon Database**: Serverless PostgreSQL provider for production database hosting
- **Drizzle ORM**: Type-safe ORM for database operations and migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Design
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Utility for creating variant-based component APIs

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack Query**: Data fetching and caching library

### Routing & Navigation
- **Wouter**: Lightweight React router for client-side navigation

### Form & Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

### Potential Integration Points
The application architecture suggests future integrations with:
- **Stripe**: Payment processing (dependencies already included)
- **File Storage**: For artwork and digital asset management
- **Email Services**: For notifications and communication
- **IP Registration Services**: For automated intellectual property filing
- **Analytics Platforms**: For business intelligence and reporting