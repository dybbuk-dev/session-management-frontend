# 🎨 Frontend – Asignación de sesiones universitarias (Next.js + Tailwind CSS)

Este es el **frontend** del sistema de asignación de sesiones. Muestra un calendario de sesiones, permite a los usuarios ver los detalles de las mismas y asignar a los estudiantes a las sesiones disponibles.

---

## 🧰 Pila tecnológica

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- TypeScript

---

## ✅ Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o posterior)
- El backend ejecutándose en `http://localhost:8080` (o el puerto configurado)

---

## 🚀 Instrucciones de configuración

### 1. Accede a la carpeta del frontend

`````bash
cd frontend

### 2. Instalar dependencias

npm install

### 3. Crear el archivo de entorno

- Crear un archivo .env.local
```bash
touch .env.local

- Agregue esta línea:
NEXT_PUBLIC_API_URL=http://localhost:8080/api

### 4. Inicie el servidor de desarrollo

````bash
npm run dev
`````
