// Replace with your Firebase config
const firebaseConfig = {
      apiKey: "AIzaSyA_pGzSJ9XzSm5snZXpwsUElfsfkyPyStA",
      authDomain: "food-rescue-app-59257.firebaseapp.com",
      databaseURL: "https://food-rescue-app-59257.firebaseio.com",
      projectId: "food-rescue-app-59257",
      storageBucket: "food-rescue-app-59257.appspot.com",
      messagingSenderId: "864941036294",
      appId: "1:864941036294:web:1e76ab157cef077a8a8487"
    };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Auth Functions
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password).catch(alert);
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password).catch(alert);
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  document.getElementById('user-status').textContent = user ? `Logged in as ${user.email}` : "Logged out";
});

// Google Maps
let map;
let userMarker;

function initMap() {
  navigator.geolocation.getCurrentPosition(pos => {
    const userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    map = new google.maps.Map(document.getElementById("map"), {
      center: userLoc,
      zoom: 14
    });
    userMarker = new google.maps.Marker({ position: userLoc, map, label: "You" });
  });
}

window.onload = initMap;

// Add Food
function addFood() {
  const foodName = document.getElementById("foodName").value;
  const expiry = parseInt(document.getElementById("expiry").value);
  const statusEl = document.getElementById("food-status");

  if (!auth.currentUser) {
    statusEl.textContent = "";
    return alert("Login to add food");
  }

  if (!foodName || isNaN(expiry)) {
    statusEl.textContent = "";
    return alert("Enter valid food and expiry");
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const foodData = {
      foodName,
      expiry,
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      addedBy: auth.currentUser.email,
      booked: false,
      bookedBy: null
    };

    database.ref("foods").push(foodData).then(() => {
      statusEl.textContent = "Food added successfully!";
      document.getElementById("foodName").value = "";
      document.getElementById("expiry").value = "";
    }).catch(err => {
      statusEl.textContent = "Error adding food.";
      console.error(err);
    });
  });
}

// Search Nearby
function searchNearby() {
  navigator.geolocation.getCurrentPosition(pos => {
    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    database.ref("foods").once("value", snapshot => {
      snapshot.forEach(child => {
        const data = child.val();
        const id = child.key;

        const distance = getDistance(userLat, userLng, data.lat, data.lng);
        const hoursSinceAdded = (Date.now() - data.timestamp) / 3600000;
        const remaining = data.expiry - hoursSinceAdded;

        if (distance <= 5 && remaining > 0) {
          const marker = new google.maps.Marker({
            position: { lat: data.lat, lng: data.lng },
            map,
            icon: data.booked ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                              : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="food-info-window">
                <h4>${data.foodName}</h4>
                <p class="expiry">Expires in: ${remaining.toFixed(1)} hrs</p>
                <p>Added by: ${data.addedBy}</p>
                <p>Location: ${data.lat.toFixed(5)}, ${data.lng.toFixed(5)}</p>
                ${!data.booked
                  ? `<button class="bookBtn" data-id="${id}">Book</button>`
                  : `<p><b>Already Booked</b> by ${data.bookedBy}</p>`}
              </div>`
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
            google.maps.event.addListenerOnce(infoWindow, "domready", () => {
              const btn = document.querySelector(".bookBtn");
              if (btn) {
                btn.addEventListener("click", () => {
                  if (!auth.currentUser) return alert("Login to book");

                  database.ref(`foods/${id}`).update({
                    booked: true,
                    bookedBy: auth.currentUser.email
                  }).then(() => {
                    alert("Food booked successfully!");
                    btn.disabled = true;
                    btn.innerText = "Booked";
                    btn.style.backgroundColor = "gray";
                  });
                });
              }
            });
          });
        }
      });
    });
  });
}

// Distance Calculator (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
