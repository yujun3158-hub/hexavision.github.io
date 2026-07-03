# hexavision.github.io
---

# 🦉 HexaVision - AI-Powered Smart Parking System

> **"Like the eyes of an owl, we monitor every parking spot in real-time."**
> This is the frontend UI/UX implementation of a next-generation smart parking management system that integrates AI object recognition (LPR) and IoT sensors.

## 📌 Project Overview

HexaVision is a Single Page Application (SPA) parking management platform that provides both a **Mobile Web App for General Users** and an **Admin Control Dashboard** within a single HTML/CSS/JS file.
It features an industrial UI optimized for a Raspberry Pi 7-inch touch display (1024×600) and supports both real-time communication with backend APIs and a standalone demo mode using mock data.

---

## 🛠 Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (No Framework)
* **Design/UI:** Responsive Web Design (Mobile / Tablet / Desktop), FontAwesome, Pretendard & JetBrains Mono fonts
* **HW / AI Integration (UI representation):** Raspberry Pi 5, HC-SR04 Ultrasonic Sensors, YOLOv5, PaddleOCR
* **Backend Integration:** FastAPI, Aiven MySQL (via Tailscale VPN)

---

## ✨ Core Features

### 📱 1. User App

Provides an intuitive parking service UI tailored for mobile environments.

* **Home & Real-time Fees:** Real-time elapsed time and automatic fee calculation for the currently used parking lot (features an odometer animation).
* **Parking Search (Map/Places):** Favorites, destination parking lot search, and real-time availability (occupancy rate) checks.
* **Payment & Settlement:** Pre-settlement via registered credit cards and a 20-minute exit countdown feature.
* **My Page:** Manage registered vehicles, register/delete multiple payment cards, and view monthly payment history.
* **Theme Support:** Toggle between Dark mode (default) and Light mode.

### 🖥 2. Admin Console

A control system optimized for tablets and Raspberry Pi touch displays.

* **Dashboard:** Provides sparkline trends for currently parked vehicles, empty spots, and today's entry/exit counts, along with a 24-hour entry/exit bar chart.
* **Real-time Map Control:** Real-time occupancy status checks for the model parking lot (8/10 slots) and a manual status toggle feature.
* **Sensor & LPR Management:**
* System health check (real-time status of VPN, API, and DB connections).
* HC-SR04 ultrasonic sensor connection status and real-time Ping tests.
* Force trigger and log viewing for License Plate Recognition (LPR) based on YOLOv5 + PaddleOCR.


* **Season Ticket & Log Settings:** Set season ticket prices by parking lot and view real-time entry/exit logs.

---

## 🚀 How to Run and Test

This frontend is written in pure web files without any frameworks, so no separate build process is required.

1. Clone or download the repository.
2. Run the `index.html` file in a modern web browser like Chrome or Safari.
*(Using the Live Server extension in VS Code will make testing much smoother.)*

### 🔑 Login Demo Accounts

You can quickly swap between User and Admin modes by **clicking the HexaVision logo** in the top header.

* **General User:** `test@cu.ac.kr` / `1234`
* **Admin:** `admin/777` / `1234`

---

## ⚙️ Backend API Configuration

You can control the system mode via the `API_CONFIG` object inside the `<script>` tag at the bottom of the code.

```javascript
const API_CONFIG = {
    BASE_URL: 'https://api.1py.shop',   // Actual Backend API Address (e.g., Raspberry Pi Tailscale IP)
    API_KEY: 'ISSUED_API_KEY',          // API Key for backend authentication
    USE_MOCK: true,                     // true: Standalone Frontend Demo Mode / false: Actual Backend Integration Mode
    POLL_INTERVAL: 5000                 // Real-time polling interval (ms)
};

```

* **For Demo and Development:** Set `USE_MOCK = true` to test all features using built-in mock data and animations without needing a server.
* **For Actual Device Integration:** Change to `USE_MOCK = false` and input the `BASE_URL` and `API_KEY` according to your server environment.

---

## 🎨 UI/UX & Animation Features

* **Status Indicators:** Smooth pulse and hover animations representing sensor communication and operational status.
* **Custom Components:** Applies components reflecting the exact proportions of actual Korean license plates (`<span class="license-plate">`).
* **Responsive Layout:** Utilizes `CSS Media Queries` to naturally rearrange the layout from mobile portrait mode to a 1024x600 widescreen display.