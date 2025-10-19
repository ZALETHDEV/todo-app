import { Injectable } from "@angular/core";
import { StorageService } from "src/app/core/services/storage-service";
import { Todo } from "../models/todo.model";

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly STORAGE_KEY = 'todos';

  constructor(private storageService: StorageService) {}

  async getAll(): Promise<Todo[]> {
    return (await this.storageService.get(this.STORAGE_KEY)) || [];
  }

  async add(title: string, categoryId?: number): Promise<void> {
    const todos = await this.getAll();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
      createdAt: new Date(),
      categoryId: categoryId ?? undefined,
    };

    todos.push(newTodo);
    await this.storageService.set(this.STORAGE_KEY, todos);
  }

  async toggleDone(id: number): Promise<void> {
    const todos = await this.getAll();
    const updated = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    await this.storageService.set(this.STORAGE_KEY, updated);
  }

  async delete(id: number): Promise<void> {
    const todos = await this.getAll();
    const filtered = todos.filter((t) => t.id !== id);
    await this.storageService.set(this.STORAGE_KEY, filtered);
  }

  async getByCategory(categoryId?: number): Promise<Todo[]> {
    const todos = await this.getAll();
    if (!categoryId) return todos;
    return todos.filter((t) => t.categoryId === categoryId);
  }

  async clear(): Promise<void> {
    await this.storageService.remove(this.STORAGE_KEY);
  }
}
