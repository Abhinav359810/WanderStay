# 🏡 WanderStay

WanderStay is a full-stack accommodation booking platform inspired by Airbnb. It enables users to discover, create, edit, and manage property listings while providing secure authentication, authorization, and a review system.

Built using the **MERN Stack**, WanderStay focuses on clean architecture, secure session-based authentication, and scalable backend design.

---

## 🚀 Features

### 👤 Authentication
- User Signup & Login
- Secure session-based authentication using Passport.js
- Logout functionality
- Persistent login sessions

### 🔐 Authorization
- Only authenticated users can create listings
- Only listing owners can edit or delete their listings
- Protected frontend and backend routes

### 🏠 Listings
- Create new listings
- View all listings
- View listing details
- Update listings
- Delete listings

### ⭐ Reviews
- Add reviews to listings
- Delete reviews
- Input validation using Joi

### 🎨 Frontend
- Responsive UI using Bootstrap
- React Router for client-side routing
- Toast notifications using React Hot Toast
- Global authentication using React Context API

### ⚙️ Backend
- RESTful API architecture
- Express.js & Node.js
- MongoDB with Mongoose ODM
- Middleware-based validation and authorization
- Centralized error handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- React Hot Toast

### Backend
- Node.js
- Express.js
- Passport.js
- Express Session
- Joi

### Database
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```
WanderStay
│
├── Frontend
│   ├── components
│   ├── pages
│   ├── context
│   ├── hooks
│   └── App.jsx
│
├── Backend
│   ├── routes
│   ├── models
│   ├── middleware
│   ├── utils
│   ├── controllers
│   └── app.js
│
└── README.md
```

---

## 🔒 Security Features

- Passport.js Authentication
- Express Session
- Owner-based Authorization
- Protected Routes
- Joi Validation
- Custom Error Handling
- Cloudinary Image Uploads
- Multer Integration
- Mapbox Location & Interactive Maps

---

## 📌 Upcoming Features
- Wishlist Feature
- Advanced Search & Filters
- Booking System
- AI-powered Property Search
- User Profile Dashboard

---

## 📸 Screenshots

_I Will Add screenshots after deployment._

---

## ⚡ Installation

### Clone the repository

```bash
git clone https://github.com/Abhinav359810/WanderStay.git
```

### Backend

```bash
cd Backend
npm install
npm start
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

Create a `.env` file in the backend directory.

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

(Cloudinary and Mapbox keys will be added when those features are integrated.)

---

## 📈 Future Improvements

- Payment Gateway Integration
- Real-time Chat
- Notifications
- Booking Calendar
- Admin Dashboard
- Deployment using Render & Vercel

---

## 👨‍💻 Author

**Abhinav Singh**

If you like this project, consider giving it a ⭐ on GitHub!
