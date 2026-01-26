# SmartParkX  Smart Parking Management System

SmartParkX is an intelligent, fully automated smart parking system designed to reduce congestion, eliminate manual parking management, and improve user experience using ANPR (Automatic Number Plate Recognition), real-time sensor data, and a web-based dashboard.

The project is currently under active development and aims to simulate a real-world smart parking environment suitable for college major projects, smart city use cases, and IoT-driven automation systems.

📌 Problem Statement

Traditional parking systems suffer from:

Manual slot allocation and monitoring

Inefficient use of parking space

Time wastage in searching for free slots

Revenue leakage due to inaccurate billing

Poor scalability in high-traffic areas

SmartParkX addresses these problems by introducing automation at every step — from entry to exit.

🎯 Project Objectives

Automate vehicle entry and exit using ANPR

Display real-time parking slot availability

Auto-confirm parking using slot sensors

Track parking duration accurately

Generate parking bills automatically

Prevent unpaid exits using exit verification

Provide a scalable web-based admin/user interface

⚙️ System Workflow (Current Design)

Car arrives at entry gate
→ ANPR scans and registers the license plate

Available slots displayed
→ Based on real-time sensor data (Web App + Display Screen)

User parks in any free slot
→ Slot sensor detects vehicle and auto-confirms occupancy

Parking session starts
→ Time tracking begins from entry scan

Car leaves the slot
→ Sensor detects vacancy

Exit gate ANPR scan
→ Parking duration calculated
→ Bill generated
→ Barrier opens only after payment confirmation

This ensures zero manual intervention.

🧠 Key Features

🚘 Automatic Number Plate Recognition (ANPR)

📡 Real-time parking slot monitoring

⏱️ Accurate parking duration tracking

💰 Automated billing system

🔐 Exit control based on payment status

🌐 Web-based dashboard (Admin/User)

🔄 Fully automated parking lifecycle

🛠️ Tech Stack
Frontend

React.js

HTML5, CSS3, JavaScript

Context API for state management

Backend

Node.js

Express.js

RESTful APIs

Database

MongoDB (Atlas)

Computer Vision & Automation

OpenCV

YOLO (planned for advanced detection)

Tesseract OCR (for ANPR – initial phase)

Hardware (Planned / Prototype)

esp32

Ultrasonic / IR Sensors

Camera (Laptop camera for prototype)


⚠️ Note: This project is actively evolving. Features, architecture, and workflows may change as development progresses.

🧪 Use Cases

College campuses

Shopping malls

Office complexes

Smart city infrastructure

Controlled parking facilities

📁 Project Structure (High-Level)
SmartParkX/
│
├── frontend/        # React frontend
├── backend/         # Node.js + Express APIs
├── models/          # ML / CV models (ANPR)
├── hardware/        # Arduino & sensor logic
├── docs/            # Diagrams, workflow docs
└── README.md

🚀 Future Enhancements

Online payment gateway integration

Advanced analytics dashboard

AI-based parking demand prediction

Cloud-based camera feeds

Role-based access control

Multi-location parking management

🧑‍💻 Author
Kartik


📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with proper attribution.

📌 Disclaimer
This project is developed for academic and learning purposes.
It is a prototype-level implementation and not intended for production use.
