import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNowPlayingMovies, getRecommendedMovies, searchMovies, getMoviesByRegion } from "../../api/movieApi";
import moviesData from "../../data/movies"; // Fallback data

function MovieList() {

  const [movies, setMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("userCity") || "Hyderabad"); // Default city

  const handleCityChange = (city) => {
    setSelectedCity(city);
    localStorage.setItem("userCity", city);
  };

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Expanded List of Indian States & Cities
  const cities = [
    "Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala",
    "Maharashtra", "Delhi", "West Bengal", "Punjab", "Gujarat",
    "Rajasthan", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Odisha", "Assam"
  ];

  // Map locations to their regional language codes for API
  const cityLangCodes = {
    "Telangana": "te",
    "Andhra Pradesh": "te",
    "Karnataka": "kn",
    "Tamil Nadu": "ta",
    "Kerala": "ml",
    "Maharashtra": "mr", // Marathi
    "Delhi": "hi",
    "West Bengal": "bn", // Bengali
    "Punjab": "pa", // Punjabi
    "Gujarat": "gu", // Gujarati
    "Rajasthan": "hi",
    "Uttar Pradesh": "hi",
    "Bihar": "hi",
    "Madhya Pradesh": "hi",
    "Odisha": "or", // Oriya
    "Assam": "hi" // Assamese often covered under Hindi/Regional or 'as' if supported
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedCity]);

  const fetchMovies = async () => {
    setLoading(true);

    // Determine which API call to make based on city
    let moviePromise;
    const langCode = cityLangCodes[selectedCity] || "hi"; // Default to Hindi if unknown

    // Fetch specific regional movies based on state selection
    if (langCode) {
      console.log(`Fetching movies for ${selectedCity} (Lang: ${langCode})`);
      moviePromise = getMoviesByRegion(langCode);
    } else {
      moviePromise = getNowPlayingMovies();
    }

    const [nowPlaying, recommendedData] = await Promise.all([
      moviePromise,
      getRecommendedMovies()
    ]);

    // Map cities to their regional languages for Display
    const cityLanguages = {
      "Telangana": "Telugu",
      "Andhra Pradesh": "Telugu",
      "Karnataka": "Kannada",
      "Tamil Nadu": "Tamil",
      "Kerala": "Malayalam",
      "Maharashtra": "Marathi",
      "West Bengal": "Bengali",
      "Punjab": "Punjabi",
      "Gujarat": "Gujarati",
      "Odisha": "Odia",
      "Delhi": "Hindi",
      "Uttar Pradesh": "Hindi",
      "Rajasthan": "Hindi",
      "Bihar": "Hindi",
      "Madhya Pradesh": "Hindi",
      "Assam": "Assamese"
    };

    const assignProps = (data, status) => {
      if (!data || data.length === 0) return [];
      return data.map(m => {
        // Determine language display based on selected city
        let displayLang = m.original_language === 'en' ? 'English' : m.original_language;
        const regionalLang = cityLanguages[selectedCity];
        const regionalCode = cityLangCodes[selectedCity];

        // Simulate regional availability: 
        // If it's a big movie (English/Hindi), show it as available in multiple languages
        if (['en', 'hi'].includes(m.original_language)) {
          // Blockbusters usually released in multiple languages
          displayLang = `${m.original_language === 'en' ? 'English' : 'Hindi'}, ${regionalLang || 'Hindi'}`;
        } else if (m.original_language !== 'en') {
          // Basic mapping for API language codes
          const langMap = {
            'hi': 'Hindi', 'te': 'Telugu', 'ta': 'Tamil', 'kn': 'Kannada', 'ml': 'Malayalam',
            'bn': 'Bengali', 'pa': 'Punjabi', 'gu': 'Gujarati', 'mr': 'Marathi', 'or': 'Odia'
          };
          displayLang = langMap[m.original_language] || m.original_language;
        }
        // The original code had a redundant and syntactically incorrect block here.
        // The logic for displayLang is now handled within the if/else if blocks.

        return {
          id: m.id,
          title: m.title,
          year: m.release_date ? m.release_date.split('-')[0] : '2024',
          rating: m.vote_average,
          language: displayLang,
          // CRITICAL FIX: To simulate a real platform, big movies should be available in ALL cities.
          // We will filter by city in the UI, but for data purposes, we won't hardcode a single city.
          movieCities: cities, // Available in all cities for demo
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/300x450',
          status
        }
      });
    };

    if (nowPlaying && nowPlaying.length > 0) {
      setMovies(assignProps(nowPlaying, "Now Showing"));
    } else {
      setMovies(moviesData); // Fallback
    }

    if (recommendedData && recommendedData.length > 0) {
      setRecommended(assignProps(recommendedData, "Recommended"));
    }

    setLoading(false);
  };

  const handleSearch = async (val) => {
    setSearch(val);
    if (val.length > 2) {
      const results = await searchMovies(val);
      if (results && results.length > 0) {
        const enhancedResults = results.map(m => ({
          id: m.id,
          title: m.title,
          year: m.release_date ? m.release_date.split('-')[0] : 'N/A',
          rating: m.vote_average,
          language: m.original_language,
          movieCities: cities, // Search results global
          poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : 'https://via.placeholder.com/300x450',
          status: "Result"
        }));
        setMovies(enhancedResults);
        setRecommended([]); // Hide recommendations during search
      }
    } else if (val.length === 0) {
      fetchMovies(); // Reset to now playing
    }
  };

  // Filter movies that include the selected city in their `movieCities` array
  // OR if "Global" (for search results)
  const filteredMovies = movies.filter(m =>
    selectedCity === "" || m.movieCities.includes(selectedCity) || m.status === "Result"
  );

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2>Movies</h2>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Location Selector */}
          <select
            onChange={(e) => handleCityChange(e.target.value)}
            value={selectedCity}
            style={{ margin: 0, minWidth: '150px' }}
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <button onClick={() => {
            localStorage.removeItem("loggedUser");
            navigate("/login");
          }}>Logout</button>
        </div>
      </header>

      {/* Current Location Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#a5f3fc' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <span>Showing movies in <strong>{selectedCity}</strong></span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          placeholder="Search for Movies..."
          onChange={(e) => handleSearch(e.target.value)}
          style={{ margin: 0, width: '100%', maxWidth: '600px' }}
        />
      </div>

      {loading ? <p style={{ textAlign: 'center' }}>Loading latest movies...</p> : (
        <>

          {/* Now Showing Section - MOVED TO TOP */}
          <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>Now Showing in {selectedCity}</h3>
          <div className="movie-grid" style={{ marginBottom: '3rem' }}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <div key={movie.id}
                  className="movie-card"
                  onClick={() => navigate(`/cinema/${movie.id}`)}>
                  <img src={movie.poster} alt={movie.title} onError={(e) => e.target.src = 'https://via.placeholder.com/300x450?text=No+Wait'} />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>Year: {movie.year}</p>
                    <p>Rating: ⭐ {movie.rating}</p>
                    <p>Lang: {movie.language}</p>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      backgroundColor: '#4ade80',
                      color: '#000',
                      fontWeight: 'bold'
                    }}>
                      Now Showing
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.2rem' }}>
                No movies found for {selectedCity}.
              </p>
            )}
          </div>

          {/* Trending/Recommended Section */}
          {search.length === 0 && recommended.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#facc15' }}>Trending Now</h3>
              <div style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '1rem'
              }}>
                {recommended.map(movie => (
                  <div key={movie.id}
                    onClick={() => navigate(`/cinema/${movie.id}`)}
                    style={{
                      minWidth: '200px',
                      cursor: 'pointer',
                      background: 'var(--bg-card)',
                      borderRadius: '12px',
                      padding: '10px',
                      border: '1px solid var(--border-color)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <h4 style={{ margin: '0.5rem 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>⭐ {movie.rating}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Events Section */}
          {search.length === 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#a5f3fc' }}>Live Events & Plays</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)', padding: '2rem', borderRadius: '12px', color: '#000', cursor: 'pointer', textAlign: 'left' }}>
                  <h3 style={{ margin: 0 }}>Music Concerts</h3>
                  <p>Live performances near you</p>
                </div>
                <div style={{ background: 'linear-gradient(45deg, #a18cd1, #fbc2eb)', padding: '2rem', borderRadius: '12px', color: '#000', cursor: 'pointer', textAlign: 'left' }}>
                  <h3 style={{ margin: 0 }}>Standup Comedy</h3>
                  <p>Laugh with the best comedians</p>
                </div>
                <div style={{ background: 'linear-gradient(45deg, #84fab0, #8fd3f4)', padding: '2rem', borderRadius: '12px', color: '#000', cursor: 'pointer', textAlign: 'left' }}>
                  <h3 style={{ margin: 0 }}>Sports</h3>
                  <p>Cricket, Football & more</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MovieList;
