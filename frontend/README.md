🚀 Around The U.S. (Authentication & Interactive Gallery)
A full-featured React application that allows users to explore, share, and manage a gallery of photos from across the United States. This project focuses on secure authentication, state management, and responsive UI.

📋 Project Overview
This application serves as an interactive social platform where users can:

Secure Authentication: Sign up and log in using JWT (JSON Web Tokens) validation.

Real-time Feedback: Experience a smooth UI with the InfoTooltip component, providing instant visual confirmation for registration and login status.

Profile Management: Edit user information, update avatars, and maintain a personalized profile.

Interactive Content: Create, delete, and "like" cards in a dynamic photo gallery.

🛠️ Tech Stack
Frontend: React.js (Functional Components & Hooks: useState, useEffect, useContext).

Routing: React Router DOM (Implementation of ProtectedRoutes and navigation logic).

Styling: CSS3 (BEM Methodology, Flexbox, Grid, and Responsive Design).

API Integration: RESTful API communication for data persistence and user auth.

Version Control: Git & GitHub.

🏗️ Key Features
🔐 Auth & Authorization Flow
Implemented a robust security workflow:

Registration: Data validation with success/error modals to guide the user.

Login: Secure token generation and persistent session handling via localStorage.

Route Protection: Unauthorized users are automatically redirected from private routes to the login page.

💬 User Experience (UX)
The InfoTooltip system was specifically designed to handle API response messages dynamically, ensuring the user is always informed of the application's state (e.g., "Incorrect email or password" or "Registration successful").

🚀 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/your-username/your-repo-name.git
Install dependencies:

Bash
npm install
Launch the development server:

Bash
npm start
📁 Project Structure
Plaintext
src/
 ├── components/       # UI Components (Header, Main, InfoTooltip, etc.)
 ├── contexts/         # React Context for global state (CurrentUserContext)
 ├── utils/            # API & Auth logic (auth.js, api.js)
 ├── images/           # Assets and SVG icons
 └── App.jsx           # Main application logic and routing
👤 Author
Juan Pablo Monsalve

Final Thoughts
This project represents a major milestone in mastering React's complex state lifting, context provider patterns, and the integration of secure backend authentication services.

🚀 Around The U.S. (Proyecto con Registro y Login)
Este es un proyecto de una aplicación web completa desarrollada con React, que permite a los usuarios registrarse, iniciar sesión y gestionar un perfil con una galería de fotos de lugares de los Estados Unidos.

📋 Descripción del Proyecto
La aplicación funciona como una red social interactiva donde los usuarios pueden:

Seguridad: Registro de nuevos usuarios y validación de credenciales mediante JWT (JSON Web Tokens).

Interfaz Dinámica: Uso de popups informativos (InfoTooltip) para feedback de éxito o error en tiempo real.

Gestión de Perfil: Editar información del usuario y cambiar el avatar.

Galería de Tarjetas: Añadir, eliminar y dar "me gusta" a fotos de lugares.

🛠️ Tecnologías Utilizadas
React.js (Hooks como useState, useEffect, useContext, useNavigate)

React Router DOM (Gestión de rutas protegidas y navegación)

CSS3 (Arquitectura BEM y diseño responsivo)

API Rest (Comunicación con servidor externo para autenticación y datos)

JavaScript (ES6+)

🏗️ Características Principales
🔐 Autenticación y Autorización
Se implementó un flujo de trabajo de autenticación completo:

Registro: Captura de datos y feedback visual con iconos de estado.

Login: Generación y almacenamiento de token en localStorage.

Protección de Rutas: Solo los usuarios autenticados pueden acceder a la sección principal de fotos (ProtectedRoute).

💬 Feedback al Usuario (Popups)
El componente InfoTooltip es el encargado de comunicar al usuario el resultado de sus acciones (éxito en registro o errores de red/credenciales), mejorando significativamente la experiencia de usuario (UX).

🚀 Instalación y Uso
Clona el repositorio:

Bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
Instala las dependencias:

Bash
npm install
Inicia la aplicación en modo desarrollo:

Bash
npm start
📁 Estructura de Carpetas
Plaintext
src/
 ├── components/       # Componentes de React (Header, Main, InfoTooltip, etc.)
 ├── contexts/         # Contexto de React para usuario actual
 ├── utils/            # Lógica de API y Autenticación (auth.js, api.js)
 ├── images/           # Activos visuales e iconos
 └── App.jsx           # Componente principal y gestión de estados
👤 Autor
Juan Pablo Monsalve

Notas finales
Este proyecto fue un reto técnico para dominar el manejo de estados complejos en React y la integración de servicios de autenticación de terceros.