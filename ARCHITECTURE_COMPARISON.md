# Architecture Comparison: Before vs After React Migration

## Before (Vanilla JavaScript + jQuery)

### File Structure
```
├── templates/
│   └── top.html (331 lines - HTML + inline JavaScript)
├── static/
│   ├── js/
│   │   └── index.js (14 lines - minimal JavaScript)
│   ├── css/
│   │   └── index.css (185 lines)
│   └── images/
│       ├── banner.svg
│       └── favicon.png
└── src/
    └── run_demo.py (serves Jinja2 template)
```

### Technology Stack
- **Frontend**: HTML (Jinja2), jQuery, Vanilla JavaScript
- **State Management**: Global variables
- **API Calls**: XMLHttpRequest
- **Build**: None (direct file serving)
- **Bundling**: None

### Issues
1. **Performance**: Full page re-renders, no optimization
2. **Maintainability**: 331-line mixed HTML/JS template
3. **State Management**: Global variables (`in_search`, `total_hits`, `token_end`)
4. **No Build Process**: No minification or optimization
5. **Testing**: Difficult to test inline scripts
6. **Code Reusability**: Limited component reusability

---

## After (React + Vite)

### File Structure
```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx (102 lines)
│   │   │   ├── SearchResults.jsx (174 lines)
│   │   │   ├── ExamplesSection.jsx (33 lines)
│   │   │   └── LoadingSpinner.jsx (9 lines)
│   │   ├── App.jsx (48 lines)
│   │   ├── main.jsx (12 lines)
│   │   └── index.css (184 lines)
│   ├── public/
│   │   └── images/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── static/
│   └── dist/ (build output)
│       ├── assets/
│       │   ├── index-[hash].js (275KB → 84KB gzipped)
│       │   └── index-[hash].css (153KB → 23KB gzipped)
│       ├── images/
│       └── index.html
└── src/
    └── run_demo.py (serves React app)
```

### Technology Stack
- **Frontend**: React 19.2.0, Vite 7.2.2
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **API Calls**: Modern Fetch API
- **Build**: Vite with optimizations
- **Bundling**: Code splitting, minification, gzip compression
- **CSS**: Bootstrap 5.0.2 + Custom CSS

### Improvements
1. **Performance**: 
   - Virtual DOM for efficient updates
   - Bundle optimization (84KB JS gzipped)
   - Code splitting
   - Fast HMR (Hot Module Replacement)

2. **Maintainability**:
   - Clear component separation
   - Each component has single responsibility
   - Easy to locate and modify code

3. **State Management**:
   - Local component state with React hooks
   - No global variables
   - URL-synced state for shareability

4. **Build Process**:
   - Automatic minification
   - Tree shaking (removes unused code)
   - Asset optimization
   - Source maps for debugging

5. **Testing**:
   - Components can be unit tested
   - ESLint for code quality
   - Easy to add Vitest for testing

6. **Code Reusability**:
   - Reusable components (LoadingSpinner, etc.)
   - Props for configuration
   - Easy to extend and compose

---

## Component Architecture

### Header Component
**Responsibility**: Search form with controls
- Query input
- Threshold slider (with live value display)
- Corpus model selector
- Form submission with validation

### SearchResults Component
**Responsibility**: Display and manage search results
- Fetch results from API
- Display results in table
- Handle pagination ("Load More")
- Loading and error states
- useCallback for performance optimization

### ExamplesSection Component
**Responsibility**: Show example searches
- Static example links
- Styled with Bootstrap

### LoadingSpinner Component
**Responsibility**: Reusable loading indicator
- SVG-based spinner
- Matches custom CSS animations

---

## Data Flow

### Before
```
User Input → Global Variable → XMLHttpRequest → Manual DOM Manipulation
```

### After
```
User Input → React State → Fetch API → State Update → Virtual DOM → Efficient Re-render
```

---

## Bundle Analysis

### Production Build Output
```
../static/dist/index.html                 0.76 kB │ gzip:  0.42 kB
../static/dist/assets/index-QARM_k-1.css  153.20 kB │ gzip: 23.28 kB
../static/dist/assets/index-DVF_ZEIZ.js   275.66 kB │ gzip: 84.23 kB
```

**Total Size**: 
- Uncompressed: ~430 KB
- Gzipped: ~108 KB

**Includes**:
- React 19.2.0
- React DOM 19.2.0
- Bootstrap 5.0.2
- All application code

---

## Backend Changes (Minimal)

### Before: `src/run_demo.py`
```python
@app.get("/", response_class=HTMLResponse)
def index(request: Request, ...):
    return app.templates.TemplateResponse(
        "top.html",
        {
            "request": request,
            "threshold": threshold,
            "query": query,
            "corpus_model": corpus_model,
            "corpus_model_options": app.corpus_model_options,
        },
    )
```

### After: `src/run_demo.py`
```python
@app.get("/", response_class=HTMLResponse)
def index(request: Request, ...):
    # Serve the React app
    return FileResponse("static/dist/index.html")
```

**Key Point**: The `/search` API endpoint remains **completely unchanged**.

---

## Development Workflow

### Before
1. Edit `templates/top.html`
2. Refresh browser
3. Check browser console for errors

### After
1. Edit React components in `frontend/src/`
2. Vite HMR updates instantly (< 100ms)
3. ESLint provides immediate feedback
4. Build for production: `npm run build`

---

## Future Enhancement Paths

### Easy to Add
- TypeScript for type safety
- Unit tests with Vitest
- E2E tests with Playwright
- React Query for caching
- React Router for navigation
- PWA features

### Before Migration
These would be very difficult to add to the vanilla JS + jQuery implementation.

### After Migration
All of these are standard React ecosystem tools with excellent documentation and support.

---

## Conclusion

The React migration provides:
- **Better Performance**: Virtual DOM, optimized bundles
- **Better Developer Experience**: Modern tools, fast feedback
- **Better Maintainability**: Clear structure, reusable components
- **Future-Ready**: Easy to add modern features
- **Minimal Risk**: Backend API unchanged, full compatibility maintained
