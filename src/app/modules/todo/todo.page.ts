import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from './models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './services/todo-service';
import { ToastController } from '@ionic/angular';
import { CategoryService } from '../category/services/category-service';
import { Category } from '../category/models/category.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: false,
})
export class TodoPage implements OnInit {
  todos: Todo[] = [];
  categories: Category[] = [];
  selectedCategoryId?: number;
  todoForm!: FormGroup;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: [null],
    });

    await this.loadCategories();
    await this.loadTodos();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getAll();   
  }

  async loadTodos() {
    if (this.selectedCategoryId) {
      this.todos = await this.todoService.getByCategory(
        this.selectedCategoryId
      );
    } else {
      this.todos = await this.todoService.getAll();
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async addTodo() {
    if (this.todoForm.invalid) return;
    const title = this.todoForm.value.title.trim();
    const category = this.todoForm.value.categoryId;
    if (!title) return;

    await this.todoService.add(title, category);
    this.todoForm.reset();
    this.showForm = false;
    
    await this.loadTodos();
    this.showToast('Tarea agregada');
  }

  async toggleDone(todo: Todo) {
    await this.todoService.toggleDone(todo.id);
    await this.loadTodos();
  }

  async delete(todo: Todo) {
    await this.todoService.delete(todo.id);
    await this.loadTodos();
    this.showToast('Tarea eliminada...');
  }

  async onCategoryFilterChange() {
    await this.loadTodos();
  }

  getCategory(todo: Todo): Category | undefined {
    return this.categories.find((c) => c.id === todo.categoryId);
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color: 'primary',
      position: 'bottom',
    });
    await toast.present();
  }
}
