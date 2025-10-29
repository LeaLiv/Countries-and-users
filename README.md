# 🌍 Countries and Users API

A Node.js/Express REST API for managing countries and users data with middleware implementation and MongoDB integration.

## 📋 Overview

This project is a RESTful API built with Express.js that provides endpoints for managing countries and users information. It demonstrates modern backend development practices with proper routing, middleware, and data models.

## 🏗️ Project Structure

```
Countries-and-users/
├── db/              # Database configuration and connection
├── middlewares/     # Custom middleware functions
├── models/          # Data models and schemas
├── routes/          # API route definitions
├── app.js           # Main application entry point
├── package.json     # Project dependencies
└── .gitignore      # Git ignore rules
```

## ✨ Features

- 🌐 **RESTful API**: Clean and intuitive API endpoints
- 🗄️ **Database Integration**: MongoDB for data persistence
- 🔧 **Custom Middleware**: Request validation and processing
- 📊 **Data Models**: Well-structured data schemas
- 🛣️ **Organized Routes**: Modular routing system
- 🔐 **Error Handling**: Comprehensive error management

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: JavaScript

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB installed and running

### Setup

1. Clone the repository:
```bash
git clone https://github.com/LeaLiv/Countries-and-users.git
cd Countries-and-users
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (create `.env` file):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/countries-users
```

4. Start MongoDB service

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Countries
- `GET /api/countries` - Get all countries
- `GET /api/countries/:id` - Get country by ID
- `POST /api/countries` - Create new country
- `PUT /api/countries/:id` - Update country
- `DELETE /api/countries/:id` - Delete country

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🗂️ Project Components

### Database Layer (`db/`)
Database connection and configuration management

### Middleware (`middlewares/`)
Custom middleware for request processing, validation, and error handling

### Models (`models/`)
Data schemas and model definitions for countries and users

### Routes (`routes/`)
API endpoint definitions and request handlers

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes.

## 👤 Author

**Lea Livshitz**
- GitHub: [@LeaLiv](https://github.com/LeaLiv)

---

⭐️ If you find this project useful, give it a star!
