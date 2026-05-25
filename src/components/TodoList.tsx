import type { Todo } from '../services/indexedDB';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
}

export const TodoList = ({ todos, onUpdate, onDelete, filter }: TodoListProps) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="todo-list--empty">
        <p className="todo-list__empty-message">
          {filter === 'completed' && 'No completed tasks yet 🎉'}
          {filter === 'active' && 'No active tasks! You\'re all caught up ✨'}
          {filter === 'all' && 'No tasks yet. Add one to get started! 🚀'}
        </p>
      </div>
    );
  }

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;

  return (
    <div className="todo-list">
      <div className="todo-list__stats">
        <div className="stat">
          <span className="stat__value">{activeTodos}</span>
          <span className="stat__label">Active</span>
        </div>
        <div className="stat">
          <span className="stat__value">{completedTodos}</span>
          <span className="stat__label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat__value">{todos.length}</span>
          <span className="stat__label">Total</span>
        </div>
      </div>

      <ul className="todo-list__items">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};
