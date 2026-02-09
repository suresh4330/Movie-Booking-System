import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api/movieApi";
import { detectLocation } from "../../api/locationApi"; // Import helper

function CinemaList() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read selected city from localStorage or default
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("userCity") || "Hyderabad");

  const cityCinemas = {
    "Hyderabad": [
      { id: 1, name: "Prasads Multiplex", location: "Necklace Road" },
      { id: 2, name: "AMB Cinemas", location: "Gachibowli" },
      { id: 3, name: "Sudarshan 35mm", location: "RTC X Roads" },
      { id: 4, name: "Sandhya 70mm", location: "RTC X Roads" },
      { id: 5, name: "PVR: Next Galleria", location: "Panjagutta" },
      { id: 6, name: "Asian Jyothi", location: "Kukatpally" },
      { id: 7, name: "Viswanath 70mm", location: "Kukatpally" },
      { id: 8, name: "Gokul 70mm", location: "Erragadda" },
      { id: 9, name: "Arjun 70mm", location: "Kukatpally" },
      { id: 10, name: "Devi 70mm", location: "RTC X Roads" }
    ],
    "Bangalore": [
      { id: 1, name: "PVR: Koramangala", location: "Forum Mall" },
      { id: 2, name: "Urvashi Cinema", location: "Lalbagh Road" },
      { id: 3, name: "Rex Theatre", location: "Brigade Road" },
      { id: 4, name: "Veeresh Cinema", location: "Magadi Road" },
      { id: 5, name: "Cauvery Theatre", location: "Sankey Road" },
      { id: 6, name: "INOX: Lido", location: "Ulsoor" },
      { id: 7, name: "Cinepolis: Orion", location: "Malleshwaram" }
    ],
    "Chennai": [
      { id: 1, name: "SPI: Sathyam", location: "Royapettah" },
      { id: 2, name: "Escape Cinemas", location: "Express Avenue" },
      { id: 3, name: "Devi Cineplex", location: "Mount Road" },
      { id: 4, name: "Albert Theatre", location: "Egmore" },
      { id: 5, name: "Kasi Theatre", location: "Ashok Nagar" },
      { id: 6, name: "AGS Cinemas", location: "T. Nagar" },
      { id: 7, name: "Rohini Silver Screens", location: "Koyambedu" }
    ],
    "Mumbai": [
      { id: 1, name: "Gaiety Galaxy", location: "Bandra" },
      { id: 2, name: "Regal Cinema", location: "Colaba" },
      { id: 3, name: "Maratha Mandir", location: "Mumbai Central" },
      { id: 4, name: "PVR: Phoenix", location: "Lower Parel" },
      { id: 5, name: "Sterling", location: "Fort" },
      { id: 6, name: "Carnival Cinemas", location: "Andheri" }
    ],
    "Delhi": [
      { id: 1, name: "PVR: Select Citywalk", location: "Saket" },
      { id: 2, name: "Delite Cinema", location: "Asaf Ali Road" },
      { id: 3, name: "Liberty Cinema", location: "Karol Bagh" },
      { id: 4, name: "Sangam Courtyard", location: "RK Puram" },
      { id: 5, name: "INOX: Nehru Place", location: "Nehru Place" }
    ],
    "Kochi": [
      { id: 1, name: "PVR: Lulu", location: "Edappally" },
      { id: 2, name: "Shenoys", location: "MG Road" },
      { id: 3, name: "Padma Cinema", location: "MG Road" },
      { id: 4, name: "Kavitha Theatre", location: "MG Road" },
      { id: 5, name: "Saritha, Savitha, Sangeetha", location: "Banerji Road" }
    ],
    "Andhra Pradesh": [
      { id: 1, name: "Lepl Centro", location: "Vijayawada" },
      { id: 2, name: "Alankar", location: "Vijayawada" },
      { id: 3, name: "Urvashi", location: "Vijayawada" },
      { id: 4, name: "Jagadamba 70mm", location: "Vizag" },
      { id: 5, name: "Sangam Sarat", location: "Vizag" },
      { id: 6, name: "Kinnera & Karkys", location: "Vizag" },
      { id: 7, name: "Jayaram", location: "Tirupati" },
      { id: 8, name: "PVR: Ripples", location: "Vijayawada" },
      { id: 9, name: "INOX: Varun Beach", location: "Vizag" }
    ],
    "West Bengal": [
      { id: 1, name: "PVR: Diamond Plaza", location: "Kolkata" },
      { id: 2, name: "INOX: South City", location: "Kolkata" },
      { id: 3, name: "Star Theatre", location: "Kolkata" },
      { id: 4, name: "Nandan", location: "Kolkata" }
    ],
    "Punjab": [
      { id: 1, name: "PVR: Elante", location: "Chandigarh" },
      { id: 2, name: "Cinepolis: TDI", location: "Mohali" },
      { id: 3, name: "Wave Cinemas", location: "Ludhiana" }
    ],
    "Gujarat": [
      { id: 1, name: "PVR: Acropolis", location: "Ahmedabad" },
      { id: 2, name: "Rajhans", location: "Surat" },
      { id: 3, name: "INOX: R-World", location: "Gandhinagar" }
    ],
    "Maharashtra": [
      { id: 1, name: "PVR: Phoenix", location: "Mumbai" },
      { id: 2, name: "E-Square", location: "Pune" },
      { id: 3, name: "INOX: Prozone", location: "Aurangabad" }
    ],
    "Rajasthan": [
      { id: 1, name: "Raj Mandir", location: "Jaipur" },
      { id: 2, name: "PVR: MGF", location: "Jaipur" }
    ],
    "Uttar Pradesh": [
      { id: 1, name: "PVR: Z Square", location: "Kanpur" },
      { id: 2, name: "Wave", location: "Lucknow" },
      { id: 3, name: "SRS", location: "Agra" }
    ],
    "Bihar": [
      { id: 1, name: "Mona Cinema", location: "Patna" },
      { id: 2, name: "Cinepolis", location: "Patna" }
    ],
    "Madhya Pradesh": [
      { id: 1, name: "PVR: Treasury", location: "Indore" },
      { id: 2, name: "Jyoti Cinema", location: "Bhopal" }
    ],
    "Odisha": [
      { id: 1, name: "INOX: Bhawani", location: "Bhubaneswar" },
      { id: 2, name: "Maharaja", location: "Bhubaneswar" }
    ],
    "Assam": [
      { id: 1, name: "PVR: City Centre", location: "Guwahati" },
      { id: 2, name: "Gold Cinema", location: "Guwahati" }
    ],
    "Kerala": [
      { id: 1, name: "PVR: Lulu", location: "Kochi" },
      { id: 2, name: "Aries Plex", location: "Trivandrum" },
      { id: 3, name: "RP Mall", location: "Kollam" }
    ],
    "Karnataka": [
      { id: 1, name: "PVR: Koramangala", location: "Bangalore" },
      { id: 2, name: "DRC Cinemas", location: "Mysore" },
      { id: 3, name: "Big Cinemas", location: "Mangalore" }
    ],
    "Tamil Nadu": [
      { id: 1, name: "SPI: Sathyam", location: "Chennai" },
      { id: 2, name: "KG Cinemas", location: "Coimbatore" },
      { id: 3, name: "Vetrrivel", location: "Madurai" }
    ],
    "Telangana": [
      { id: 1, name: "Prasads Multiplex", location: "Hyderabad" },
      { id: 2, name: "AMB Cinemas", location: "Hyderabad" },
      { id: 3, name: "PVR: Preston", location: "Hyderabad" }
    ]
  };

  const cinemas = cityCinemas[selectedCity] || [
    { id: 1, name: "Generic Cinema", location: "City Center" },
    { id: 2, name: "PVR Cinemas", location: "Main Road" }
  ];

  useEffect(() => {
    const fetchDetails = async () => {
      // Try to fetch from API
      const data = await getMovieDetails(id);
      if (data) {
        // Extract Director from credits
        const director = data.credits?.crew?.find(member => member.job === 'Director')?.name || "Unknown Director";
        const cast = data.credits?.cast?.slice(0, 3).map(c => c.name).join(", ") || "Cast info unavailable";
        const genres = data.genres?.map(g => g.name).join(", ") || "Genre info unavailable";

        setMovie({
          id: data.id,
          title: data.title,
          city: selectedCity, // PERSIST SELECTED CITY
          director,
          cast,
          genres,
          overview: data.overview,
          runtime: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : 'N/A',
          poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/300x450',
          backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : null
        });
      } else {
        // Fallback for demo if API fails 
        setMovie({
          title: "Movie " + id,
          city: selectedCity,
          director: "Director Name",
          cast: "Actor 1, Actor 2",
          genres: "Action, Drama",
          runtime: "2h 30m"
        });
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id, selectedCity]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading movie details...</div>;

  if (!movie) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Movie not found</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>

      {/* Movie Details Header */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        background: 'var(--bg-card)',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Blur Effect */}
        {movie.backdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            filter: 'blur(10px)',
            zIndex: 0
          }}></div>
        )}

        <img
          src={movie.poster}
          alt={movie.title}
          style={{
            width: '200px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '8px',
            zIndex: 1,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
          onError={(e) => e.target.src = 'https://via.placeholder.com/200x300'}
        />

        <div style={{ flex: 1, zIndex: 1 }}>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2.5rem' }}>{movie.title}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>{movie.runtime}</span>
            <span>•</span>
            <span>{movie.genres}</span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#a5f3fc', marginBottom: '0.5rem' }}>Director</h3>
            <p style={{ fontSize: '1.1rem' }}>{movie.director}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#a5f3fc', marginBottom: '0.5rem' }}>Cast</h3>
            <p style={{ fontSize: '1.1rem' }}>{movie.cast}</p>
          </div>

          <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>{movie.overview}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '0.5rem 1rem' }}>← Back to Movies</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Location Selector in Booking Page */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                localStorage.setItem("userCity", e.target.value);
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {[
                "Telangana", "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Kerala",
                "Maharashtra", "Delhi", "West Bengal", "Punjab", "Gujarat",
                "Rajasthan", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Odisha", "Assam"
              ].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={async () => {
              try {
                alert("Requesting Location Access...");
                const detectedCity = await detectLocation();

                const supportedCities = ["Hyderabad", "Bangalore", "Mumbai", "Chennai", "Delhi", "Kochi", "Andhra Pradesh",
                  "Telangana", "Karnataka", "Tamil Nadu", "Kerala", "Maharashtra", "West Bengal", "Punjab", "Gujarat",
                  "Rajasthan", "Uttar Pradesh", "Bihar", "Madhya Pradesh", "Odisha", "Assam"
                ];

                // Improved matching: exact or includes
                let matched = supportedCities.find(c => detectedCity.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(detectedCity.toLowerCase()));

                // Fallback for Andhra Pradesh logic (e.g., if detected 'Vijayawada', return AP)
                if (!matched) {
                  if (["Vijayawada", "Vizag", "Tirupati", "Guntur"].some(s => detectedCity.includes(s))) {
                    matched = "Andhra Pradesh";
                  }
                }

                if (matched) {
                  setSelectedCity(matched);
                  localStorage.setItem("userCity", matched);
                  alert(`Location Detected: ${matched} (via ${detectedCity})`);
                } else {
                  // Just set it anyway for demo purposes if it looks like a city, or alert
                  alert(`We detected you are in ${detectedCity}, but we don't have theaters there yet! defaulting to Hyderabad.`);
                  setSelectedCity("Hyderabad");
                }

              } catch (error) {
                console.error(error);
                alert("Could not detect location. Please select manually.");
              }
            }}
            style={{
              fontSize: '0.8rem',
              padding: '0.3rem 0.6rem',
              background: 'transparent',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Detect my location
          </button>
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem' }}>Select Cinema</h2>

      <div className="movie-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {cinemas.map(c => (

          <div key={c.id}
            className="card"
            onClick={() => navigate(`/show/${id}/${c.name}?cinemaLocation=${c.location}`)}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              margin: 0,
              transition: 'transform 0.2s',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}>

            <div style={{
              background: 'var(--primary)',
              height: '4px',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}></div>

            <h3 style={{ margin: '1rem 0 0.5rem' }}>{c.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{c.location}</p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              <span style={{
                fontSize: '0.8rem',
                padding: '0.2rem 0.6rem',
                border: '1px solid #4ade80',
                color: '#4ade80',
                borderRadius: '4px'
              }}>M-Ticket</span>
              <span style={{
                fontSize: '0.8rem',
                padding: '0.2rem 0.6rem',
                border: '1px solid #facc15',
                color: '#facc15',
                borderRadius: '4px'
              }}>Food & Beverage</span>
            </div>

          </div>

        ))}
      </div>

    </div >
  );
}

export default CinemaList;
