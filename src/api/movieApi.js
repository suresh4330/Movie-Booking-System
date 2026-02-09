const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const BASE_URL = "https://api.themoviedb.org/3";

// Helper to get date range for "Now Playing" (Last 30 days - Strict "Live" Window)
const getDateRange = () => {
    const today = new Date();
    const minDateObj = new Date();
    minDateObj.setDate(today.getDate() - 30);  // Strictly last 1 month movies only
    return {
        maxDate: today.toISOString().split('T')[0],
        minDate: minDateObj.toISOString().split('T')[0]
    };
};

export const getNowPlayingMovies = async () => {
    try {
        const { minDate, maxDate } = getDateRange();
        // Fetch movies from Hollywood (en), Bollywood (hi), Tollywood (te), Kollywood (ta)
        // playing in India (region=IN) in theaters (release_type=2|3)
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en|hi|te|ta&region=IN&sort_by=popularity.desc&include_adult=false&page=1&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&with_release_type=2|3`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return [];
    }
};

export const getMoviesByRegion = async (langCode) => {
    try {
        const { minDate, maxDate } = getDateRange();
        // Fetch specific language + English blockbusters
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}|en&region=IN&sort_by=popularity.desc&include_adult=false&page=1&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&with_release_type=2|3`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Error fetching movies for region ${langCode}:`, error);
        return [];
    }
};

export const getRecommendedMovies = async () => {
    try {
        const { minDate, maxDate } = getDateRange();
        // "Recommended" now also strictly adheres to "in theaters" logic
        // Sorted by vote count (quality) instead of popularity
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&region=IN&sort_by=vote_count.desc&include_adult=false&page=1&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&with_release_type=2|3`
        );
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recommended movies:", error);
        return [];
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting movie details:", error);
        return null;
    }
}
