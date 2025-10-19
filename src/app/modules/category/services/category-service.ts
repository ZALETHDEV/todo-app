import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageService } from 'src/app/core/services/storage-service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly STORAGE_KEY = 'categories';

  constructor(private storageService: StorageService) {}

  async getAll(): Promise<Category[]> {
    return (await this.storageService.get(this.STORAGE_KEY)) || [];
  }

  async add(category: Category): Promise<void> {
    const categories = await this.getAll();
    categories.push(category);
    await this.storageService.set(this.STORAGE_KEY, categories);
  }

  async delete(id: number): Promise<void> {
    const categories = await this.getAll();
    const filtered = categories.filter((c) => c.id !== id);
    await this.storageService.set(this.STORAGE_KEY, filtered);
  }

  async update(category: Category): Promise<void> {
    const categories = await this.getAll();
    const updated = categories.map((c) =>
      c.id === category.id ? category : c
    );
    await this.storageService.set(this.STORAGE_KEY, updated);
  }
}
