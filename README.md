# SmartParkX - Intelligent Smart Parking System

![SmartParkX Banner](https://img.shields.io/badge/SmartParkX-2.0-blue?style=for-the-badge&logo=parking)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/github/license/KartikChouhan03/SmartParkX?style=for-the-badge)

## 📌 Overview

**SmartParkX** is a fully automated, intelligent parking management system designed to alleviate urban congestion and streamline the parking experience. Leveraging **ANPR (Automatic Number Plate Recognition)**, real-time sensor data, and a robust web-based dashboard, SmartParkX eliminates manual intervention from entry to exit.

Ideally suited for smart cities, shopping malls, university campuses, and large office complexes, this project serves as a comprehensive prototype for modern IoT-driven automation.

## 🚀 Key Features

- **Automated Entry & Exit**: Seamless vehicle access control using ANPR technology.
- **Real-Time Availability**: Live tracking of parking slots via sensor integration.
- **Smart Billing**: Automated duration tracking and billing generation upon exit.
- **Admin Dashboard**: Comprehensive control panel for managing slots, users, and viewing logs.
- **User Interface**: Clean, responsive web interface for users to check availability and payment status.
- **Security**: Exit barriers open only after successful payment verification.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Context API
- **HTTP Client**: Axios

### Backend

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Authentication**: JWT (JSON Web Tokens)

### Hardware / IoT (Prototype)

- **Microcontroller**: ESP32
- **Sensors**: Ultrasonic / IR Sensors
- **Computer Vision**: OpenCV, Tesseract OCR (Future: YOLO)

## 📸 Screenshots

_(Add your application screenshots here)_

|                                   Admin Dashboard                                    |                                User View                                 |
| :----------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
| ![Admin Dashboard](https://via.placeholder.com/600x300?text=Admin+Dashboard+Preview) | ![User View](https://via.placeholder.com/600x300?text=User+View+Preview) |

## 🏗️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/KartikChouhan03/SmartParkX.git
cd SmartParkX
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and start the client.

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 🧪 Usage

1.  **Admin Login**: Access the dashboard to view live slot status and revenue reports.
2.  **Simulation**: Use the prototype hardware or simulation tools to trigger entry/exit events.
3.  **User Flow**: Users can see available slots on the display or web app.

## 🔮 Future Roadmap

- [ ] **Payment Gateway**: Integration with Stripe/Razorpay for online payments.
- [ ] **Advanced AI**: Implementing YOLO for faster and more accurate license plate detection.
- [ ] **Mobile App**: React Native application for users.
- [ ] **Predictive Analytics**: ML models to predict peak parking times.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🧑‍💻 Author

**Kartik**

- GitHub: [@KartikChouhan03](https://github.com/KartikChouhan03)

---

