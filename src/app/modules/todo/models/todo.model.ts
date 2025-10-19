export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
  categoryId?: number;
}
