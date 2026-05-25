import { useEffect, useState } from 'react';
import { todoDatabase, type Todo } from './services/indexedDB';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTodos();
    todoDatabase.init();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const loadedTodos = await todoDatabase.getAllTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTodo = await todoDatabase.addTodo(todo);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    try {
      const updated = await todoDatabase.updateTodo(id, updates);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoDatabase.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleClearCompleted = async () => {
    try {
      const completedTodos = todos.filter((t) => t.completed);
      for (const todo of completedTodos) {
        await todoDatabase.deleteTodo(todo.id);
      }
      setTodos(todos.filter((t) => !t.completed));
    } catch (error) {
      console.error('Failed to clear completed todos:', error);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__title">✅ My Tasks</h1>
          <p className="app__subtitle">Stay organized and productive</p>
        </div>
      </header>

      <main className="app__main">
        <AddTodo onAddTodo={handleAddTodo} />

        {isLoading ? (
          <div className="loading">Loading your tasks...</div>
        ) : (
          <>
            <div className="filters">
              <button
                className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filter === 'active' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                className={`filter-btn ${filter === 'completed' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>

            <TodoList
              todos={todos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              filter={filter}
            />

            {todos.some((t) => t.completed) && (
              <button className="app__clear-btn" onClick={handleClearCompleted}>
                Clear Completed Tasks
              </button>
            )}
          </>
        )}
      </main>

      <footer className="app__footer">
        <p>Made with ❤️ - Stay productive!</p>
      </footer>
    </div>
  );
}

export default App;
