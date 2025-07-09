 Surplus Food Locator App
A web-based platform to donate and locate surplus food in real-time using geolocation, Firebase, and Google Maps API.
This app helps bridge the gap between food donors and people in need, aiming to reduce food waste and fight hunger.

Features
User Authentication (Register/Login with Firebase Auth)

Google Maps Integration to view food donation locations

Add Surplus Food with expiry time and current location

Real-Time Updates using Firebase Realtime Database

QR Code Generation for donation tracking and verification

Responsive UI for desktop and mobile

How It Works
User logs in or registers.

Adds a food item using a simple form with type and expiry time.

App fetches the user's location and stores the donation in Firebase.

Food markers appear on the map for all users in real time.

A QR code is generated for each donation to help with secure pickup.

Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: Firebase (Auth + Realtime Database)

Maps: Google Maps JavaScript API

QR Code: qrcode.min.js library

🔧 Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/food-rescue-app.git
cd food-rescue-app
Replace YOUR_GOOGLE_MAPS_API_KEY in the HTML file with your actual API key.

Add your Firebase config to the script (firebase.initializeApp(...)).

Run the app by opening index.html in your browser.

Screenshots

![WhatsApp Image 2025-07-09 at 18 15 56_59af2d84](https://github.com/user-attachments/assets/182830b8-f86c-41a6-9ef8-412606d62054)

License
This project is intended for educational and research purposes only. Usage of third-party APIs or models is subject to their individual licenses.

