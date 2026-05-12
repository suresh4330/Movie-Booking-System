# 🎬 Movie Booking App

**Movie Booking App** is a responsive frontend web application that enables users to discover movies, explore cinemas, and simulate ticket bookings — all powered by the TMDB API and browser-local storage. It supports location-based movie filtering using the OpenStreetMap Nominatim API, real-time movie search, and a complete booking flow from registration to booking confirmation.

🔗 [Live Demo](#) <!-- Replace with your deployed URL -->

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=react-router&logoColor=white)
![TMDB API](https://img.shields.io/badge/API-TMDB-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)
![OpenStreetMap](https://img.shields.io/badge/API-OpenStreetMap-7EBC6F?style=flat-square&logo=openstreetmap&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Storage-localStorage-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

---

## ✨ Features

- 🔐 User **Registration & Login** using `localStorage`
- 🎥 Browse **Now Playing** and recommended movies via TMDB API
- 🔍 **Search** movies by title in real time
- 📍 **Location-based filtering** by Indian state using browser geolocation & Nominatim API
- 🎞️ View **movie details** — cast, director, runtime, and genre
- 🏟️ Browse **cinemas** and available **showtimes**
- 🎟️ **Book tickets** and store booking history locally
- 🗂️ Fallback to local movie data when the TMDB API is unavailable

---

## 📁 Project Structure

```
Movie/
├── src/
│   ├── components/
│   │   ├── Auth/          # Register & Login
│   │   ├── Dashboard/     # MovieList (Browse & Search)
│   │   ├── Cinema/        # CinemaList (Theater selection)
│   │   ├── Show/          # ShowTime (Showtime picker)
│   │   └── Booking/       # BookingSuccess (Confirmation)
│   ├── api/               # TMDB & Nominatim API calls
│   ├── data/              # Local fallback movie data
│   ├── App.jsx            # Route configuration
│   └── main.jsx           # App entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-booking-app.git
cd movie-booking-app/Movie
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

---

## 🔄 App Flow

```
Register → Login → Browse Movies → Filter/Search → Movie Details → Select Cinema → Pick Showtime → Book Ticket → Confirmation
```

1. **Register** — Create a new account (stored in `localStorage`)
2. **Login** — Authenticate with your credentials
3. **Dashboard** — Browse now-playing movies, filter by state, or search
4. **Movie Detail** — View cast, director, runtime, and choose a cinema
5. **Showtime** — Pick a show slot for the selected cinema
6. **Booking Confirmed** — Receive a booking confirmation stored locally

---

## 📡 Data Sources

| Source | Usage |
|---|---|
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie listings, search, cast, and details |
| [OpenStreetMap Nominatim](https://nominatim.org/) | Reverse geocoding for location-based filtering |
| `localStorage` | Users, session state, and booking history |

---

## 📌 Notes

- This is a **frontend-only** project with no backend server.
- All booking, login, and user data are persisted in the browser's `localStorage`.
- The TMDB API key is currently hardcoded — move it to a `.env` file before deploying.
- Offline fallback data ensures the app remains usable when the API is unreachable.

---

## 🔮 Future Improvements

- [ ] Seat selection UI
- [ ] Payment gateway integration
- [ ] Dedicated booking history page
- [ ] Protected routes (auth guard)
- [ ] Backend + database integration
- [ ] Environment-based API configuration

---

## 👤 Author

**Annamneedi suresh kumar**  
Built with ❤️ using React, Vite, TailwindCSS, and the TMDB API.

---

## 🏷️ Topics

`react` · `vite` · `tailwindcss` · `movie-booking` · `tmdb-api` · `openstreetmap` · `localstorage` · `react-router` · `frontend` · `javascript` · `location-based-filtering` · `ticket-booking`
