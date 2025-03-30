const getCoordinates = async (address: string): Promise<{ longitude: number; latitude: number } | null> => {
    const accessToken = "pk.eyJ1IjoibmNhc2VsbGEiLCJhIjoiY204dTZkb3F6MGhoNjJtcTJjYTliYnVoMiJ9.ZwkXviox2SXgZc0gofm9Eg";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.features.length > 0) {
            const [longitude, latitude] = data.features[0].center;
            console.log("Latitude:", latitude, "Longitude:", longitude);
            return { latitude, longitude };
        } else {
            console.error("No location found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        return null;
    }
};
