import axios from 'axios'

export class MapboxGeocoder {
    private apiKey: string = "pk.eyJ1IjoibmNhc2VsbGEiLCJhIjoiY204dTZkb3F6MGhoNjJtcTJjYTliYnVoMiJ9.ZwkXviox2SXgZc0gofm9Eg";
    private baseUrl: string;
    private defaultCity: string = "Ciudad Autonoma de Buenos Aires, Argentina";

    constructor() {
        this.baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    }

    async getCoordinates(address: string, options: { country?: string; limit?: number } = {}): Promise<[number, number]> {
        try {
            // Default options
            const defaultOptions = {
                limit: 1,
                country: 'ar' // Set Argentina as default country
            };

            // Merge provided options with defaults
            const mergedOptions = { ...defaultOptions, ...options };

            // Append the default city to make the address more specific
            // Only append if it doesn't already contain the city or parts of it
            let fullAddress = address;
            if (!address.toLowerCase().includes('buenos aires') &&
                !address.toLowerCase().includes('caba') &&
                !address.toLowerCase().includes('ciudad autonoma')) {
                fullAddress = `${address}, ${this.defaultCity}`;
            }

            // URL encode the address
            const encodedAddress = encodeURIComponent(fullAddress);

            // Build the query parameters
            const queryParams = new URLSearchParams({
                access_token: this.apiKey,
                limit: mergedOptions.limit.toString()
            });

            // Add optional parameters if provided
            if (mergedOptions.country) {
                queryParams.append('country', mergedOptions.country);
            }

            // Add proximity bias to Buenos Aires to improve results
            queryParams.append('proximity', '-58.3772,-34.6083'); // Coordinates of Buenos Aires

            // Build the full URL
            const url = `${this.baseUrl}/${encodedAddress}.json?${queryParams.toString()}`;

            console.log(`Geocoding: ${fullAddress}`); // For debugging

            // Make the API request
            const response = await axios.get(url);

            // Check if features exist and at least one feature was found
            if (response.data.features && response.data.features.length > 0) {
                // Return the coordinates [longitude, latitude]
                const coordinates = response.data.features[0].center;
                console.log(`Found coordinates: ${coordinates[0]}, ${coordinates[1]}`);
                return coordinates;
            } else {
                throw new Error('No coordinates found for this address');
            }
        } catch (error) {
            console.error('Error getting coordinates:', error);
            throw error;
        }
    }
}