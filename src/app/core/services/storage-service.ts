import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async ensureStorageReady() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async set(key: string, value: any) {
    await this.ensureStorageReady();
    await this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.ensureStorageReady();
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    await this.ensureStorageReady();
    await this._storage?.remove(key);
  }

  async clear() {
    await this.ensureStorageReady();
    await this._storage?.clear();
  }
}
