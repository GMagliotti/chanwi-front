import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import './MapBox.css'

import 'mapbox-gl/dist/mapbox-gl.css';
import ReceiverCard from '../ReceiverCard/ReceiverCard';
import { dummyPosts, dummyProducers } from '../../dummies';


const MapBox: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    mapboxgl.accessToken = 'pk.eyJ1IjoibmNhc2VsbGEiLCJhIjoiY204dTZkb3F6MGhoNjJtcTJjYTliYnVoMiJ9.ZwkXviox2SXgZc0gofm9Eg'

    const [showReceiverCard, setShowReceiverCard] = useState(false);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-58.40644, -34.64013], // Default coordinates (Longitude, Latitude)
                zoom: 13,
                maxBounds: [
                    [-58.50771, -34.66746],
                    [-58.29396, -34.58712]
                ],
                minZoom: 8,
                maxZoom: 16,
            });


            // Once the map is loaded, add markers
            mapRef.current.on('load', () => {
                // Create a marker at a specific [lng, lat] coordinate
                const marker = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([-58.40158, -34.64100])
                    .addTo(mapRef.current!);

                marker.getElement().addEventListener('click', () => {
                    setShowReceiverCard(true);
                    console.log(showReceiverCard);
                });

                // Add another marker
                new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat([-58.40632, -34.64175])
                    .addTo(mapRef.current!);
            });

            mapRef.current.on('dragstart', () => {
                setShowReceiverCard(false);
            });
            mapRef.current.on('zoomstart', () => {
                setShowReceiverCard(false);
            });

        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);


    return (
        <>
            <div id='map-container' ref={mapContainerRef}>
                {showReceiverCard && (
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
                    className="sliding" id="slider">
                        <ReceiverCard producer={dummyProducers[0]} posts={dummyPosts} />
                    </div>
                )}
            </div>

        </>
    )
}

export default MapBox