export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  updatedAt: number;
}

class TodoDatabase {
  private dbName = 'todolistDB';
  private storeName = 'todos';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('completed', 'completed', { unique: false });
          store.createIndex('priority', 'priority', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  async addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    if (!this.db) await this.init();
    
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(newTodo);

      request.onerror = () => {
        reject(new Error('Failed to add todo'));
      };

      request.onsuccess = () => {
        resolve(newTodo);
      };
    });
  }

  async getAllTodos(): Promise<Todo[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onerror = () => {
        reject(new Error('Failed to get todos'));
      };

      request.onsuccess = () => {
        const todos = (request.result as Todo[]).sort(
          (a, b) => b.createdAt - a.createdAt
        );
        resolve(todos);
      };
    });
  }

  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): Promise<Todo> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const todo = getRequest.result as Todo;
        const updatedTodo: Todo = {
          ...todo,
          ...updates,
          id: todo.id,
          createdAt: todo.createdAt,
          updatedAt: Date.now(),
        };

        const updateRequest = store.put(updatedTodo);

        updateRequest.onerror = () => {
          reject(new Error('Failed to update todo'));
        };

        updateRequest.onsuccess = () => {
          resolve(updatedTodo);
        };
      };

      getRequest.onerror = () => {
        reject(new Error('Failed to fetch todo for update'));
      };
    });
  }

  async deleteTodo(id: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onerror = () => {
        reject(new Error('Failed to delete todo'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }

  async clearAllTodos(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onerror = () => {
        reject(new Error('Failed to clear todos'));
      };

      request.onsuccess = () => {
        resolve();
      };
    });
  }
}

export const todoDatabase = new TodoDatabase();
