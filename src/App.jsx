import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import MovieList from "./components/Dashboard/MovieList.jsx";
import CinemaList from "./components/Cinema/CinemaList.jsx";
import ShowTime from "./components/Show/ShowTime.jsx";
import BookingSuccess from "./components/Booking/BookingSuccess.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<MovieList />} />

        <Route path="/cinema/:id" element={<CinemaList />} />

        <Route path="/show/:id/:cinema" element={<ShowTime />} />

        <Route path="/success" element={<BookingSuccess />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
