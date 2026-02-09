// OpenStreetMap Nominatim API (Free, no key required)
const REVERSE_GEOCODE_URL = "https://nominatim.openstreetmap.org/reverse";

export const detectLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`${REVERSE_GEOCODE_URL}?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();

                    // Extract city/state logic
                    // OpenStreetMap can return city, town, village, or state_district
                    const address = data.address;
                    const detectedCity = address.city || address.town || address.village || address.state_district || address.state;

                    resolve(detectedCity);
                } catch (error) {
                    reject(error);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
};
