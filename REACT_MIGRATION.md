# SoftMatcha React Frontend

This is the React-based frontend for the SoftMatcha corpus search demo, replacing the previous vanilla JavaScript + jQuery implementation.

## Benefits of React Implementation

### Performance Improvements
- **Virtual DOM**: React's virtual DOM efficiently updates only the parts of the UI that have changed, reducing unnecessary re-renders
- **Component Optimization**: React components can be optimized with memoization and lazy loading for better performance
- **Efficient State Management**: React's built-in state management (hooks) provides cleaner and more efficient state updates
- **Code Splitting**: Vite enables automatic code splitting, loading only the necessary code for each page

### Developer Experience
- **Component Reusability**: Components like `Header`, `SearchResults`, and `LoadingSpinner` can be easily reused and tested
- **Better Maintainability**: Clear component structure makes the codebase easier to understand and maintain
- **Modern Tooling**: Vite provides fast Hot Module Replacement (HMR) for instant feedback during development
- **Type Safety**: Easy to add TypeScript in the future for better type checking

### User Experience
- **Faster Initial Load**: Vite optimizes bundle size and enables efficient caching
- **Smooth Interactions**: React's reconciliation algorithm provides smooth UI updates
- **Better Error Handling**: React's error boundaries can catch and handle errors gracefully
- **Progressive Enhancement**: Modern build tools enable progressive web app features

## Architecture

### Components
- **App.jsx**: Main application component managing overall state and routing
- **Header.jsx**: Search form with threshold slider and corpus selector
- **SearchResults.jsx**: Displays search results with pagination
- **ExamplesSection.jsx**: Shows example searches
- **LoadingSpinner.jsx**: Reusable loading indicator

### State Management
- Uses React hooks (`useState`, `useEffect`) for local component state
- Search parameters are synced with URL for shareable links
- Pagination state is managed within `SearchResults` component

### API Integration
- Maintains the same `/search` API endpoint from the FastAPI backend
- Uses `fetch` API for asynchronous data fetching
- Proper error handling and loading states

## Development

### Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### Setup
```bash
cd frontend
npm install
```

### Development Server
```bash
npm run dev
```
This starts the Vite development server with hot module replacement at `http://localhost:5173`

### Build
```bash
npm run build
```
Builds the production-optimized bundle to `../static/dist/`

### Linting
```bash
npm run lint
```

## Deployment

The React app is built during the Docker image build process. The built static files are served by FastAPI at the root route (`/`).

The Dockerfile has been updated to:
1. Install Node.js 20.x
2. Copy the frontend directory
3. Run `npm install` and `npm run build`
4. The built files in `static/dist/` are served by the FastAPI backend

## Configuration

### Vite Configuration
- Output directory: `../static/dist/`
- Development proxy: Proxies `/search` requests to `http://localhost:7860` (FastAPI backend)
- Build optimization: Automatic code splitting and minification

### Backend Integration
The FastAPI backend (`src/run_demo.py` and `src/config.py`) has been updated to:
- Serve the React app's `index.html` at the root route
- Mount static assets (`/assets` and `/images`) from the build directory
- Keep the `/search` API endpoint unchanged

## Migration from jQuery

The original implementation used:
- jQuery for DOM manipulation
- Inline scripts in Jinja2 templates
- Manual state management with global variables
- XMLHttpRequest for API calls

The React implementation provides:
- Declarative UI with JSX
- Component-based architecture
- React hooks for state management
- Modern `fetch` API
- Better separation of concerns
- Improved testability

## Future Enhancements

Potential improvements for the React frontend:
- Add TypeScript for type safety
- Implement React Router for multi-page navigation
- Add unit tests with Vitest
- Add end-to-end tests with Playwright
- Implement React Query for better data fetching and caching
- Add accessibility improvements (ARIA labels, keyboard navigation)
- Implement service workers for offline support
- Add analytics tracking
