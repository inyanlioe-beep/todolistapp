import type { Todo } from '../services/indexedDB';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  filter: 'all' | 'active' | 'completed';
  categoryFilter: string;
}

export const TodoList = ({ todos, onUpdate, onDelete, filter, categoryFilter }: TodoListProps) => {
  const filteredTodos = todos.filter((todo) => {
    const matchesCategory =
      categoryFilter === 'all' || todo.category?.trim() === categoryFilter;

    if (!matchesCategory) return false;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const groupedTodos = filteredTodos.reduce<Record<string, Todo[]>>((groups, todo) => {
    const category = todo.category?.trim() || 'Uncategorized';

    return {
      ...groups,
      [category]: [...(groups[category] || []), todo],
    };
  }, {});

  const categoryGroups = Object.entries(groupedTodos).sort(([categoryA], [categoryB]) =>
    categoryA.localeCompare(categoryB)
  );

  const emptyMessage =
    categoryFilter !== 'all'
      ? `No ${filter === 'all' ? '' : `${filter} `}tasks in ${categoryFilter}.`
      : {
          all: 'No tasks yet. Add one to get started!',
          active: "No active tasks! You're all caught up.",
          completed: 'No completed tasks yet.',
        }[filter];

  if (filteredTodos.length === 0) {
    return (
      <div className="todo-list--empty">
        <p className="todo-list__empty-message">{emptyMessage}</p>
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

      <div className="todo-list__groups">
        {categoryGroups.map(([category, categoryTodos]) => (
          <section className="todo-list__group" key={category}>
            <div className="todo-list__group-header">
              <h2 className="todo-list__group-title">{category}</h2>
              <span className="todo-list__group-count">{categoryTodos.length}</span>
            </div>

            <ul className="todo-list__items">
              {categoryTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};
