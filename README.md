# 🛠️ Sistema de Gestión de Solicitudes

Este proyecto es una solución completa de backend y frontend para la gestión de solicitudes de soporte, con autenticación basada en roles (`cliente`, `soporte`, `admin`) y funcionalidades como creación de solicitudes, gestión de estados, historial de cambios y reportes.

---

## 🚀 Tecnologías utilizadas

### 🔧 Backend
- Node.js + Express
- Sequelize (ORM)
- SQLite (puedes cambiarlo por PostgreSQL o MySQL)
- JWT para autenticación
- Bcrypt para hasheo de contraseñas
- dotenv para variables de entorno

### 🎨 Frontend
- React
- React Router DOM
- Axios
- Bootstrap (opcional)

---

## 📂 Estructura del proyecto

/backend
/controllers
/models
/routes
/middlewares
/config
seed.js
app.js

/frontend
/components
/pages
/context
.env
App.js


---

## 🔐 Funcionalidades principales

### Autenticación y autorización
- Login con JWT
- Autenticación por roles: cliente, soporte, admin

### Endpoints obligatorios
- `POST /auth/login` → Login
- `POST /solicitudes` → Crear solicitud (cliente)
- `GET /solicitudes` → Listar solicitudes según rol
- `PUT /solicitudes/:id` → Actualizar estado y respuesta
- `GET /reportes/solicitudes` → Resumen por estado
- `GET /historial/:solicitudId` → Ver historial de cambios
- `GET/POST/DELETE /usuarios` → Gestión de usuarios (solo admin)

---

## ✅ Validaciones y seguridad implementadas

- Validación de inputs en backend y frontend
- Sanitización de entradas
- Middleware de autenticación y autorización
- CORS configurado
- Rate limiting básico
- Uso de prepared statements con Sequelize

---

## 📦 Instalación

### 1. Clona el repositorio
```bash
git clone https://github.com/wmilanv/cifra.git
cd soporte-app
