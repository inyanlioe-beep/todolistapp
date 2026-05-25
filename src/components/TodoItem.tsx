import { useState } from 'react';
import type { Todo } from '../services/indexedDB';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || '');

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        dueDate: editedDueDate,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
    setEditedDueDate(todo.dueDate || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff6b6b';
      case 'medium':
        return '#ffd93d';
      case 'low':
        return '#6bcf7f';
      default:
        return '#999';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <li className="todo-item todo-item--editing">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="todo-item__edit-title"
          autoFocus
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="todo-item__edit-description"
          rows={2}
        />
        <input
          type="date"
          value={editedDueDate}
          onChange={(e) => setEditedDueDate(e.target.value)}
          className="todo-item__edit-date"
        />
        <div className="todo-item__edit-actions">
          <button onClick={handleSaveEdit} className="todo-item__save-btn">
            Save
          </button>
          <button onClick={handleCancelEdit} className="todo-item__cancel-btn">
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <div className="todo-item__checkbox-wrapper">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-item__checkbox"
          aria-label={`Toggle ${todo.title}`}
        />
        <span className="todo-item__checkbox-custom"></span>
      </div>

      <div className="todo-item__content">
        <div className="todo-item__header">
          <h3 className="todo-item__title">{todo.title}</h3>
          <span
            className="todo-item__priority"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
            title={todo.priority}
          >
            {todo.priority[0].toUpperCase()}
          </span>
        </div>
        {todo.description && (
          <p className="todo-item__description">{todo.description}</p>
        )}
        {todo.dueDate && (
          <p className="todo-item__due-date">📅 {formatDate(todo.dueDate)}</p>
        )}
      </div>

      <div className="todo-item__actions">
        <button
          onClick={() => setIsEditing(true)}
          className="todo-item__edit-btn"
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="todo-item__delete-btn"
          aria-label="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};
