import { useState } from 'react';
import type { Todo } from '../services/indexedDB';

interface AddTodoProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo({
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        completed: false,
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <div className="add-todo__input-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="add-todo__input"
          onFocus={() => setIsExpanded(true)}
        />
        <button
          type="button"
          className="add-todo__expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Expand options"
        >
          ⚙️
        </button>
      </div>

      {isExpanded && (
        <div className="add-todo__expanded">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)..."
            className="add-todo__textarea"
            rows={2}
          />

          <div className="add-todo__controls">
            <div className="add-todo__control">
              <label htmlFor="due-date">Due date:</label>
              <input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="add-todo__date"
              />
            </div>

            <div className="add-todo__control">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="add-todo__select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button type="submit" className="add-todo__submit">
            Add Task
          </button>
        </div>
      )}
    </form>
  );
};
