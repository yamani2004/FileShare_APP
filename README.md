# 📁 File Share App

A secure and minimal file-sharing app with authentication, file uploads to Cloudinary, metadata extraction, link expiry, and protected routes using JWT.

---

## 🚀 Features

✅ User Authentication (JWT-based)  
✅ File Upload via Multer & Cloudinary  
✅ Metadata Extraction (filename, type, size)  
✅ Protected Routes (upload/list/delete)  
✅ Expiry System & Auto Cleanup (using cron job)  
✅ React Frontend with Protected Routes  
✅ TailwindCSS for clean UI

---

## 🧰 Tech Stack

| Frontend | Backend            | Storage/Cloud  |
|----------|--------------------|----------------|
| React    | Node.js + Express  | Cloudinary     |
| Tailwind | MongoDB (Mongoose) | Multer         |
| Axios    | JWT + Bcrypt       | dotenv         |

---

## 📁 Folder Structure

### 🔹 Root

- `/server.js` → Express app entry point  
- `/.env` → Environment variables  
- `/README.md` → This file  

---

### 🔹 Backend

#### 📂 `controllers/`
- `authController.js` → Handles user register/login  
- `fileController.js` → Handles file upload, listing, metadata  

#### 📂 `routes/`
- `authRoutes.js` → `/api/auth/register`, `/api/auth/login`  
- `fileUploadRoute.js` → `/api/files/upload`, `/api/files/myfiles`  

#### 📂 `models/`
- `User.js` → Mongoose user schema  
- `File.js` → Mongoose file schema with metadata  

#### 📂 `middleware/`
- `authMiddleware.js` → JWT protection for secured routes  

#### 📂 `configs/`
- `cloudinary.js` → Config for Cloudinary + multer-storage-cloudinary  

#### 📂 `utils/`
- `cleanup.js` → Cron job for deleting expired links  

---

### 🔹 Frontend (`/client`)

#### 📂 `src/components/`
- `Login.jsx` → Login form UI  
- `Register.jsx` → Registration form UI  
- `UploadForm.jsx` → File upload form  
- `FileList.jsx` → Display uploaded files  
- `ProtectedRoute.jsx` → Protect routes with auth  

#### 📂 `src/pages/`
- `Home.jsx` → Landing page  
- `Dashboard.jsx` → Protected page to view/upload files  
- `LoginPage.jsx` → Login route page  
- `RegisterPage.jsx` → Register route page  

#### 📂 `src/`
- `App.js` → Main app with routing  
- `authContext.js` → React context to manage auth token  

---

## 🔐 Authentication Flow

1. User registers via `/api/auth/register` → data stored in MongoDB  
2. On login, `/api/auth/login` issues JWT token  
3. JWT token is stored in React Context or LocalStorage  
4. Protected routes like `/api/files/upload` validate token via middleware  

---

## 🌩️ File Upload Flow

1. User selects file → `UploadForm.jsx`  
2. File is sent via `axios` POST request to `/api/files/upload`  
3. Backend uses `multer` + `Cloudinary` to store the file  
4. Metadata (size, type, expiry) is saved to MongoDB  

---

## ⏳ Expiry & Cleanup

- Uploaded files have an `expiresAt` field  
- A cron job (`utils/cleanup.js`) runs daily to delete expired files  

---

## 📷 Optional: Diagrams

You can add sequence diagrams or folder tree visuals using tools like [excalidraw](https://excalidraw.com) or [draw.io](https://app.diagrams.net).

---

## 💬 How to Run

### 🖥 Backend

```bash
cd file-share-app
npm install
npm run dev

🌐 Frontend
cd client
npm install
npm start
