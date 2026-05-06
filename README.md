# Movie Booking App

A React + Vite movie ticket booking app with authentication, movie discovery, cinema selection, showtime booking, and location-based filtering.

## Features

- User registration and login using `localStorage`
- Browse now-playing and recommended movies
- Search movies by title
- Filter movies by Indian state/region
- View movie details, cast, director, and runtime
- Pick cinemas and showtimes
- Book tickets and store booking history locally
- Detect user location using browser geolocation
- Fallback movie data when the movie API does not respond

## Tech Stack

- React 19
- Vite
- React Router DOM
- Plain CSS
- TMDB API for movie data
- OpenStreetMap Nominatim for reverse geocoding

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown by Vite in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## App Flow

1. Register a new account.
2. Log in with the same credentials.
3. Browse movies from the dashboard.
4. Filter by state or search by movie name.
5. Open a movie to see details and cinema options.
6. Select a showtime and confirm the booking.

## Data Sources

- TMDB API for movie listings, search, and movie details
- OpenStreetMap Nominatim for reverse geocoding
- `localStorage` for users, session state, and bookings

## Notes

- This is a frontend-only project with no backend.
- Booking, login, and user data are stored locally in the browser.
- The current TMDB API key is hardcoded and should be moved to environment variables before production deployment.
- If the movie API fails, local fallback movie data is used.

## Future Improvements

- Seat selection
- Payment integration
- Booking history page
- Protected routes
- Backend and database integration
- Environment-based API configuration

## Author

Annam
