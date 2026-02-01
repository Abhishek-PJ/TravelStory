# 🌍 Travel Story

A full-stack web application for documenting and sharing your travel experiences. Create, edit, and organize your travel stories with beautiful images and location tags.

![Travel Story](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen) ![Cloudinary](https://img.shields.io/badge/Cloudinary-Images-orange)

## ✨ Features

- 📝 **Create Travel Stories** - Document your journeys with titles, descriptions, and dates
- 🖼️ **Image Upload** - Upload and store images using Cloudinary cloud storage
- 🏷️ **Location Tags** - Add visited locations to your stories
- 🔍 **Search & Filter** - Search stories by title or filter by date range
- 🌙 **Dark/Light Theme** - Toggle between dark and light modes
- 🔐 **User Authentication** - Secure login and signup with JWT tokens
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Day Picker** - Date selection component

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **Cloudinary** - Image storage and management
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
TravelStory/
├── backend/
│   ├── models/
│   │   ├── travelStory.js
│   │   └── usermodel.js
│   ├── uploads/
│   ├── cloudinary.js
│   ├── index.js
│   ├── multer.js
│   ├── utilities.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── Cards/
    │   │   └── Input/
    │   ├── pages/
    │   │   ├── Auth/
    │   │   └── Home/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

#### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_atlas_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
PORT=5000
BASE_URL=http://localhost:5000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek-PJ/TravelStory.git
   cd TravelStory
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   - Create `.env` files in both `backend/` and `frontend/` directories
   - Add the required environment variables as shown above

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-account` | Register a new user |
| POST | `/login` | Login user |
| GET | `/get-user` | Get current user info |

### Travel Stories
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add-travel-story` | Create a new story |
| GET | `/get-all-stories` | Get all user stories |
| PUT | `/edit-story/:id` | Update a story |
| DELETE | `/delete-story/:id` | Delete a story |
| PUT | `/update-is-favourite/:id` | Toggle favorite status |
| GET | `/search` | Search stories |
| GET | `/travel-stories/filter` | Filter stories by date |

### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/image-upload` | Upload image to Cloudinary |
| DELETE | `/delete-image` | Delete image from Cloudinary |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abhishek PJ**
- GitHub: [@Abhishek-PJ](https://github.com/Abhishek-PJ)

---

⭐ Star this repo if you find it helpful!
