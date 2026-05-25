# ✅ My Tasks - Todo List App

A beautiful, mobile-friendly todo list application built with React and IndexedDB.

## Features

- ✨ **Beautiful UI/UX** - Modern, gradient-based design with smooth animations
- 📱 **Mobile Friendly** - Fully responsive design that works seamlessly on web and mobile
- 💾 **Offline First** - Uses IndexedDB for local data persistence (no server needed)
- 🎯 **Task Management** - Create, edit, delete, and organize tasks
- 🏷️ **Priority Levels** - Set task priority (Low, Medium, High)
- 📅 **Due Dates** - Add due dates to your tasks
- 📝 **Task Descriptions** - Add detailed descriptions to tasks
- 🔍 **Filter Tasks** - Filter by All, Active, or Completed tasks
- 📊 **Statistics** - View active, completed, and total task counts
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/todolistapp.git
cd todolistapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## How to Use

1. **Add a Task**
   - Type your task title in the input field
   - Click the ⚙️ button to expand options
   - Add description, due date, and priority level
   - Click "Add Task" to save

2. **Complete a Task**
   - Click the checkbox next to a task to mark it as complete

3. **Edit a Task**
   - Click the ✏️ button to enter edit mode
   - Modify the task details
   - Click "Save" to confirm changes

4. **Delete a Task**
   - Click the 🗑️ button to remove a task

5. **Filter Tasks**
   - Use the filter buttons to view All, Active, or Completed tasks

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **IndexedDB** - Client-side database for offline persistence
- **Vite** - Fast build tool and dev server
- **CSS3** - Beautiful, responsive styling

## Project Structure

```
src/
├── components/
│   ├── AddTodo.tsx      # Form for adding new tasks
│   ├── TodoList.tsx     # List container and statistics
│   └── TodoItem.tsx     # Individual task item
├── services/
│   └── indexedDB.ts     # IndexedDB database service
├── App.tsx              # Main application component
├── App.css              # Application styling
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## Browser Support

- Chrome/Edge 63+
- Firefox 78+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Persistence

All tasks are stored in your browser's IndexedDB database. This means:
- Your tasks persist even after closing the browser
- Your data is stored locally on your device
- No data is sent to any server
- Clearing browser data will remove your tasks

## Performance

- Optimized bundle size (~63KB gzipped)
- Smooth 60fps animations
- Instant task operations with IndexedDB
- Responsive design with zero lag

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## Author

Created with ❤️ for productivity enthusiasts

---

**Made with React, IndexedDB, and love! 🚀**
