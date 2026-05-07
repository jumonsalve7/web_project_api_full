# 🌐 Proyecto Web Full Stack (Frontend + Backend)

Este es un proyecto full stack que separa el frontend y el backend en dos módulos independientes dentro del mismo repositorio. El objetivo es construir una aplicación web funcional con una API REST y una interfaz de usuario.

---

## 📁 Estructura del proyecto


web_project_api_full/
│
├── frontend/ → Aplicación frontend (interfaz de usuario)
├── backend/ → API REST (servidor)
├── .gitignore
└── README.md


---

## ⚙️ Tecnologías utilizadas

### Frontend
- React (o framework utilizado)
- JavaScript / TypeScript
- HTML / CSS
- Librerías de estilos (según proyecto)

### Backend
- Node.js
- Express.js
- API REST
- (Base de datos si aplica: MongoDB / PostgreSQL / etc.)

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/jumonsalve7/web_project_api_full.git
cd web_project_api_full
2. Instalar dependencias
Backend
cd backend
npm install
Frontend
cd frontend
npm install
3. Variables de entorno

En el backend crea un archivo .env:

PORT=3000
# DATABASE_URL=...
# JWT_SECRET=...
4. Ejecutar el proyecto
Backend
cd backend
npm run dev
Frontend
cd frontend
npm start
📌 Notas importantes
El frontend y backend funcionan de forma independiente.
Es necesario ejecutar ambos para que la aplicación funcione correctamente.
Los archivos .env no están incluidos por seguridad.
node_modules no se suben al repositorio.
🧠 Posibles mejoras
Autenticación de usuarios
Mejor manejo de errores
Despliegue (frontend y backend)
Integración con base de datos en producción
👨‍💻 Autor

Juan Pablo

🌐 Full Stack Web Project (Frontend + Backend)

This is a full stack web application that separates the frontend and backend into two independent modules within the same repository. The goal is to build a functional web application with a REST API and a user interface.

📁 Project Structure
web_project_api_full/
│
├── frontend/   → Frontend application (user interface)
├── backend/    → REST API (server)
├── .gitignore
└── README.md
⚙️ Technologies Used
Frontend
React (or chosen framework)
JavaScript / TypeScript
HTML / CSS
Styling libraries (depending on project)
Backend
Node.js
Express.js
REST API architecture
(Database if applicable: MongoDB / PostgreSQL / etc.)
🚀 Installation and Setup
1. Clone the repository
git clone https://github.com/jumonsalve7/web_project_api_full.git
cd web_project_api_full
2. Install dependencies
Backend
cd backend
npm install
Frontend
cd frontend
npm install
3. Environment variables

Create a .env file inside the backend folder:

PORT=3000
# DATABASE_URL=...
# JWT_SECRET=...
4. Run the project
Backend
cd backend
npm run dev
Frontend
cd frontend
npm start
📌 Important Notes
Frontend and backend run independently.
Both services must be running for full functionality.
.env files are not included for security reasons.
node_modules are excluded from the repository.
🧠 Possible Improvements
User authentication
Better error handling
Deployment (frontend & backend)
Production database integration
👨‍💻 Author

Juan Pablo