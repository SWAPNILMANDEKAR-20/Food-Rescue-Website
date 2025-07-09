Surplus Food Locator App

Overview  
The **Surplus Food Locator App** is a web-based platform designed to connect individuals or organizations with **surplus food** to nearby **shelters or people in need**. It promotes food redistribution, reduces waste, and ensures real-time visibility of available food via **Google Maps integration** and **Firebase backend**.



Features

- Login/Register: Secure authentication using Firebase Auth  
- Food Submission: Add food items with type, expiry time, and live location  
- Live Map View: See all available food locations instantly on an interactive Google Map  
- QR Code Generation: Each submission gets a unique QR for pickup verification  
- Real-Time Database: All entries update automatically without page refresh  
- Mobile Friendly: Responsive UI with clean navigation  



Technologies Used

Backend:
- Firebase Authentication – User login & registration  
- Firebase Realtime Database – Storage for food location data  
- QRCode.js – Generate unique QR codes for each food entry  

Frontend:
- HTML, CSS, JavaScript – Core structure and interactivity  
- Google Maps API – Geolocation and map visualization  
- Font Awesome & Google Font – UI styling and icons  


Project Structure

```
├── index.html              # Main UI
├── styles.css              # Stylesheet for UI
├── app.js                  # Logic for Firebase + Google Maps + QR
└── assets/ (optional)      # Images, icons, screenshots
```

---

How to Use

1. Clone the repository:
   
   git clone https://github.com/your-username/surplus-food-locator-app
   cd surplus-food-locator-app
   
2. Set up Firebase & Google Maps API:
   - Replace `"YOUR_GOOGLE_MAPS_API_KEY"` in the script with your own key
   - Add your Firebase project credentials in `app.js`

3. Run the app:
   - Simply open `index.html` in your browser
   - Login/Register, add food, and view donations on the map


Use Case
A restaurant has leftover cooked meals. The manager logs in, selects **"Cooked Meals"**, and submits the donation.  
The food location is shown on the map, and nearby NGOs or individuals can view and arrange pickup using the **generated QR code**.

---

## 🧪 License

This project is developed for academic, research, and social good purposes. APIs and third-party services are subject to their own licenses.
