import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, IonModal } from '@ionic/angular';
import { Category } from './models/category.model';
import { CategoryService } from './services/category-service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: false,
})
export class CategoryPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  categories: Category[] = [];
  categoryForm!: FormGroup;
  showForm = false;
  isEditing = false;
  editingCategoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadCategories();
  }

  async ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['#3b82f6', Validators.required],
    });
    await this.loadCategories();
  }

  async loadCategories() {
    this.categories = await this.categoryService.getAll();
  }

  openModal() {
    this.modal.present(); // ✅ abre el modal manualmente
    this.resetForm();
    this.isEditing = false;
  }

  resetForm() {
    this.categoryForm.reset({ color: '#3b82f6' });
    this.isEditing = false;
    this.editingCategoryId = undefined;
  }

  async saveCategory(modal?: IonModal) {
    if (this.categoryForm.invalid) return;
    const formValue = this.categoryForm.value;

    if (this.isEditing && this.editingCategoryId) {
      const updated: Category = {
        id: this.editingCategoryId,
        name: formValue.name.trim(),
        color: formValue.color,
      };
      await this.categoryService.update(updated);
      this.showToast('Categoría actualizada...');
    } else {
      const newCategory: Category = {
        id: Date.now(),
        name: formValue.name.trim(),
        color: formValue.color,
      };
      await this.categoryService.add(newCategory);
      this.showToast('Categoría creada...');
    }

    await this.loadCategories();
    modal?.dismiss();
    this.resetForm();
  }

  async editCategory(category: Category) {
    this.categoryForm.setValue({
      name: category.name,
      color: category.color,
    });
    this.isEditing = true;
    this.editingCategoryId = category.id;

    // ✅ Abre el modal programáticamente
    this.modal.present();
  }

  async deleteCategory(category: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar',
      message: `¿Eliminar ${category.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.categoryService.delete(category.id);
            await this.loadCategories();
            this.showToast('Categoría eliminada...');
          },
        },
      ],
    });
    await alert.present();
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

  onModalDismiss() {
    this.resetForm();
  }
}
