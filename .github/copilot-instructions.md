---
applyTo: '**'
---

# SkillSync Frontend - Copilot Instructions

## Project Overview
SkillSync is an intelligent internship matching platform that connects students with companies using AI-powered recommendations. This is the frontend application that provides the user interface for students, companies, and administrators.

## Tech Stack
- **Frontend Framework**: React/Vue/Angular (TBD)
- **UI Library**: Material-UI/Ant Design/Tailwind CSS (TBD)
- **State Management**: Redux/Vuex/Context API (TBD)
- **HTTP Client**: Axios/Fetch API
- **Routing**: React Router/Vue Router/Angular Router
- **Form Handling**: React Hook Form/Formik/VeeValidate
- **Authentication**: JWT tokens stored securely

## Key Features
- **Student Portal**: Profile management, resume upload, internship search, application tracking, AI recommendations
- **Company Portal**: Internship posting, candidate viewing, application management, shortlisting
- **Admin Dashboard**: User management, analytics, system monitoring
- **Responsive Design**: Mobile-first approach for all user roles

## User Roles & Routes
1. **Student**: `/student/*` - Profile, applications, recommendations, search
2. **Company**: `/company/*` - Post internships, view candidates, manage applications
3. **Admin**: `/admin/*` - User management, analytics, system settings
4. **Public**: `/`, `/login`, `/register`, `/about`

## Code Guidelines
- Follow component-based architecture
- Use functional components with hooks (for React)
- Implement proper prop validation (PropTypes/TypeScript)
- Keep components small and focused (Single Responsibility Principle)
- Use meaningful component and variable names
- Implement proper error boundaries
- Follow accessibility best practices (ARIA labels, semantic HTML)
- Use CSS modules or styled-components for component styling
- Maintain consistent folder structure and naming conventions

## Component Structure
```
src/
├── components/          # Reusable components
│   ├── common/         # Buttons, inputs, cards, etc.
│   ├── layout/         # Header, footer, sidebar
│   └── features/       # Feature-specific components
├── pages/              # Page components (route handlers)
├── services/           # API calls and business logic
├── hooks/              # Custom hooks
├── context/            # Context providers
├── utils/              # Helper functions
├── constants/          # Constants and configurations
├── assets/             # Images, fonts, static files
└── styles/             # Global styles and themes
```

## API Integration
- Base API URL: `http://localhost:8000` (development)
- All API calls should go through service layer
- Implement proper error handling for API calls
- Use interceptors for authentication tokens
- Handle loading and error states in components

## API Endpoints
- `/api/auth/*` - Authentication endpoints
- `/api/students/*` - Student operations
- `/api/companies/*` - Company operations
- `/api/internships/*` - Internship management
- `/api/recommendations/*` - AI recommendations
- `/api/admin/*` - Admin operations

## Security
- Never store sensitive data in localStorage (use httpOnly cookies for tokens)
- Validate all user inputs on the frontend
- Sanitize user-generated content before rendering
- Implement proper CORS handling
- Use environment variables for API URLs and keys
- Implement route guards for protected routes
- Handle authentication token expiration gracefully

## State Management
- Keep global state minimal
- Use local state for component-specific data
- Implement proper loading and error states
- Cache API responses when appropriate
- Clear sensitive data on logout

## Styling Guidelines
- Use consistent spacing and typography
- Implement responsive breakpoints (mobile, tablet, desktop)
- Follow a consistent color scheme and design system
- Use CSS variables for theme management
- Ensure proper contrast ratios for accessibility
- Optimize images and assets

## General Rules
- Ensure code is modular, reusable, and simple to understand
- Write unit tests for critical components and utilities
- Don't create any .md files unless specifically instructed
- Never start a development server or kill a server, I will handle that
- Never change the application ports or API configurations
- Create all utility scripts inside the scripts/ directory
- Create all test files inside the tests/ or __tests__/ directory
- Never push anything directly to main branch, always create a new branch for changes and raise a PR
- Comment complex logic and business rules
- Use meaningful commit messages following conventional commits

## Performance
- Implement code splitting and lazy loading for routes
- Optimize bundle size (tree shaking, minification)
- Use React.memo/useMemo/useCallback to prevent unnecessary re-renders
- Implement pagination for large lists
- Optimize images (use WebP, lazy loading)
- Implement proper caching strategies

## Testing
- Write unit tests for utility functions
- Write component tests for critical UI components
- Test user interactions and form submissions
- Mock API calls in tests
- Maintain test coverage above 70%

## Error Handling
- Display user-friendly error messages
- Log errors for debugging
- Implement fallback UI for error states
- Handle network failures gracefully
- Provide retry mechanisms for failed requests
