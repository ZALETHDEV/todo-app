# 🚀 Guía de Ejecución — ToDo App (Ionic + Angular + Firebase)

Este documento describe los pasos necesarios para **instalar, configurar y ejecutar** el proyecto **ToDo App**, desarrollado con **Ionic Angular** y **Firebase Remote Config**.

---

## 📋 Requisitos previos

Antes de iniciar, asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Versión recomendada | Comando de verificación |
|--------------|--------------------|--------------------------|
| **Node.js** | >= 18.x | `node -v` |
| **npm** | >= 9.x | `npm -v` |
| **Ionic CLI** | >= 7.x | `ionic -v` |
| **Angular CLI** | >= 17.x | `ng version` |

---

## 📦 Instalación del proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/todo-ionic-app.git
cd todo-ionic-app
2️⃣ Instalar dependencias
bash
Copy code
npm install
Esto instalará todas las dependencias del proyecto (Ionic, AngularFire, Firebase, etc.).

🔑 Configuración de Firebase
3️⃣ Crear un proyecto en Firebase
Entra a https://console.firebase.google.com

Crea un nuevo proyecto o selecciona uno existente.

Agrega una nueva app web (⚙️ → Configuración del proyecto → Tus apps → Agregar app web).

Copia la configuración de Firebase.

4️⃣ Agregar la configuración al proyecto
Edita el archivo src/environments/environment.ts con tus credenciales de Firebase:

ts
Copy code
export const environment = {
  production: false,
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID",
  },
};
🔥 Configuración de Remote Config (opcional)
En la consola de Firebase Remote Config, agrega parámetros para probar configuraciones dinámicas:

Key	Tipo	Valor ejemplo	Descripción
CategoriaFeacture	Boolean	true	Muestra/oculta una funcionalidad
Luego publica los cambios desde Firebase.

🧠 Ejecución en entorno local
5️⃣ Ejecutar la app en modo desarrollo
bash
Copy code
ionic serve
Esto levantará un servidor local (por defecto en http://localhost:8100) y abrirá la app en el navegador.

📱 Ejecución en dispositivo móvil
6️⃣ Agregar la plataforma (solo si deseas probar en Android/iOS)
Para Android:
bash
Copy code
ionic capacitor add android
ionic capacitor build android
ionic capacitor run android
Para iOS (en macOS):
bash
Copy code
ionic capacitor add ios
ionic capacitor build ios
ionic capacitor run ios
⚠️ Recuerda tener instalado Android Studio o Xcode según tu plataforma.

🧰 Comandos útiles
Comando	Descripción
ionic serve	Inicia el servidor de desarrollo
ionic build	Compila la app para producción
ionic capacitor sync	Sincroniza los cambios con las plataformas móviles
ionic capacitor open android	Abre el proyecto en Android Studio
ionic capacitor open ios	Abre el proyecto en Xcode

🧹 Limpieza de caché (si Remote Config no actualiza)
En algunos casos, para forzar la actualización de los parámetros de Firebase Remote Config:

bash
Copy code
ionic storage clear
o elimina manualmente los datos de la app en el dispositivo / navegador.

✅ Verificación final
Antes de entregar o ejecutar en producción, verifica:

 Las tareas y categorías se guardan correctamente.

 Los cambios en Remote Config se reflejan sin borrar datos.

 El modo oscuro funciona correctamente.

 No hay errores en consola durante la ejecución.

 Los modales y formularios se cierran correctamente.

🧑‍💻 Autor
Desarrollado por: Zaleth Mata
📧 zalethdamata@gmail.com
📆 Prueba Técnica - Pragma

