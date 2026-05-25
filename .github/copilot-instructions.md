# My Tasks - TODO List App

Beautiful, mobile-friendly todo list application built with React and IndexedDB.

## Project Overview

This is a fully functional todo list application with:
- React 18 with TypeScript for type safety
- IndexedDB for offline data persistence  
- Responsive mobile-first design
- Beautiful gradient UI with animations
- Full CRUD operations for tasks
- Priority levels and due dates
- Task filtering (All, Active, Completed)

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- IndexedDB API for local storage
- CSS3 with responsive design
- ESLint for code quality

## Key Features

✨ Beautiful UI/UX with gradient design
📱 Fully responsive mobile-friendly layout
💾 Offline-first with IndexedDB persistence
🎯 Full task management capabilities
🏷️ Task prioritization and due dates
📊 Task statistics and filtering
⚡ Optimized performance (~63KB gzipped)

## Project Structure

```
src/
├── components/          # React components
│   ├── AddTodo.tsx
│   ├── TodoList.tsx
│   └── TodoItem.tsx
├── services/            # Business logic
│   └── indexedDB.ts
├── App.tsx              # Main component
├── App.css              # App styling
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## Setup & Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## GitHub Deployment

See GITHUB_SETUP.md for detailed instructions on:
1. Creating a GitHub repository
2. Pushing code to GitHub
3. Deploying with Vercel, Netlify, or GitHub Pages

## Browser Support

- Chrome/Edge 63+
- Firefox 78+
- Safari 15+
- All modern mobile browsers

## Future Enhancement Ideas

- Dark mode toggle
- Recurring tasks
- Task categories/tags
- Cloud sync with service worker
- Export/import functionality
- Drag and drop reordering
- Notifications
