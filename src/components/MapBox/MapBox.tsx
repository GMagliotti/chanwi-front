import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Typography } from 'antd'
const { Text } = Typography;
import { getLocation } from '../../services/UserProfilingService';
import { getProducers } from '../../services/ProducerService';

import './MapBox.css'

import 'mapbox-gl/dist/mapbox-gl.css';
import ReceiverCard from '../ReceiverCard/ReceiverCard';
import { dummyPosts, dummyProducers } from '../../dummies';
import { Avatar, Checkbox, CheckboxProps } from 'antd';
import { useTranslation } from 'react-i18next';

const MapBox: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const [producerOn, setProducerOn] = useState(true)
    const [receiverOn, setReceiverOn] = useState(true)
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number }>({
        latitude: -34.64013, // Default coordinates
        longitude: -58.40644
    });
    const [locationLoaded, setLocationLoaded] = useState(false);

    const { t } = useTranslation();

    mapboxgl.accessToken = 'pk.eyJ1IjoibmNhc2VsbGEiLCJhIjoiY204dTZkb3F6MGhoNjJtcTJjYTliYnVoMiJ9.ZwkXviox2SXgZc0gofm9Eg'

    const [showReceiverCard, setShowReceiverCard] = useState(false);
    const [producers, setProducers] = useState<Producer[]>();

    // Step 1: Get user location first
    useEffect(() => {
        const getUserLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLocationLoaded(true);
                    console.log("Got user location:", position.coords);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    // Use default location if there's an error
                    setLocationLoaded(true);
                    console.log("Using default location");
                }
            );
        };

        getUserLocation();
    }, []);

    // Step 2: Initialize map after we have the location
    useEffect(() => {
        if (!locationLoaded || !mapContainerRef.current || mapRef.current) {
            return; // Wait until location is loaded and map container is available
        }

        console.log("Initializing map with location:", userLocation);

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 13,
            maxBounds: [
                [userLocation.longitude - 0.1, userLocation.latitude - 0.1],
                [userLocation.longitude + 0.1, userLocation.latitude + 0.1],
            ],
            minZoom: 8,
            maxZoom: 16,
        });

        // Add a marker for user's location
        new mapboxgl.Marker({ color: "blue" })
            .setLngLat([userLocation.longitude, userLocation.latitude])
            .addTo(mapRef.current);

        mapRef.current.on("load", async () => {
            try {
                // Get producers data
                const producersData = await getProducers(userLocation.latitude, userLocation.longitude);

                setProducers(producersData); // Updates state, but we don't rely on it immediately

                // Add markers for each producer using the fetched data directly
                producersData.forEach(producer => {
                    if (producer && producer.longitude && producer.latitude) {
                        const marker = new mapboxgl.Marker({ color: "green" })
                            .setLngLat([producer.longitude, producer.latitude])
                            .addTo(mapRef.current!);

                        marker.getElement().addEventListener("click", () => {
                            setShowReceiverCard(true);
                            console.log("Clicked on producer:", producer.business_name);
                        });
                    } else {
                        console.log("Skipping producer with invalid coordinates:", producer);
                    }
                });
            } catch (error) {
                console.error("Error fetching or processing producers:", error);
            }
        });


        mapRef.current.on("dragstart", () => {
            setShowReceiverCard(false);
        });

        mapRef.current.on("zoomstart", () => {
            setShowReceiverCard(false);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [locationLoaded, userLocation]);

    // Update markers when filter changes
    useEffect(() => {
        if (!mapRef.current || !locationLoaded) return;

        // Here you can add logic to update markers based on producerOn and receiverOn states
        console.log("Filters changed, producers:", producerOn, "receivers:", receiverOn);

        // You would remove existing markers and add new ones based on filters

    }, [producerOn, receiverOn, locationLoaded]);

    const onChangeVendors: CheckboxProps['onChange'] = (e) => {
        setProducerOn(e.target.checked);
    };

    const onChangeReceivers: CheckboxProps['onChange'] = (e) => {
        setReceiverOn(e.target.checked);
    };

    return (
        <>
            <div id='map-container' ref={mapContainerRef}>
                {showReceiverCard && (
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
                        className="sliding" id="slider">
                        <ReceiverCard producer={producers[0]} />
                    </div>
                )}
            </div>
            <div style={{ position: 'absolute', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='top-bar'>
                    <Avatar src={'./chanwi.svg'} style={{ marginRight: '8px' }} />
                    <Text style={{ fontWeight: 'bold', fontSize: '18px' }}>{t("chanwi")}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', marginTop: '6px' }}>
                    <Checkbox className="pill-checkbox" checked={producerOn} onChange={onChangeVendors}>{t("producers")}</Checkbox>
                    <Checkbox className="pill-checkbox" checked={receiverOn} onChange={onChangeReceivers}>{t("receivers")}</Checkbox>
                </div>
            </div>
        </>
    )
}

export default MapBox