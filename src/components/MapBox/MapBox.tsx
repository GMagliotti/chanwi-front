import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { Typography } from 'antd'
const { Text } = Typography;
import { getProducers } from '../../services/ProducerService';
import { getReceivers } from '../../services/ReceiverService';

import './MapBox.css'

import 'mapbox-gl/dist/mapbox-gl.css';
import ReceiverCard from '../ReceiverCard/ReceiverCard';
import { Avatar, Checkbox, CheckboxProps } from 'antd';
import { useTranslation } from 'react-i18next';

const MapBox: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const producerMarkersRef = useRef<mapboxgl.Marker[]>([]);
    const receiverMarkersRef = useRef<mapboxgl.Marker[]>([]);

    const [producerOn, setProducerOn] = useState(true)
    const [receiverOn, setReceiverOn] = useState(true)
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number }>({
        latitude: -34.64013, // Default coordinates
        longitude: -58.40644
    });
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [showProducerCard, setShowProducerCard] = useState(false);
    const [showReceiverCard, setShowReceiverCard] = useState(false);

    const [producers, setProducers] = useState<Producer[]>([]);
    const [receivers, setReceivers] = useState<Receiver[]>([]);
    const [selectedProducer, setSelectedProducer] = useState<Producer>(null);
    const [selecterReceiver, setSelectedReceiver] = useState<Receiver>(null);

    const { t } = useTranslation();

    mapboxgl.accessToken = 'pk.eyJ1IjoibmNhc2VsbGEiLCJhIjoiY204dTZkb3F6MGhoNjJtcTJjYTliYnVoMiJ9.ZwkXviox2SXgZc0gofm9Eg'

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
                console.log("Producers data received:", producersData);

                if (Array.isArray(producersData)) {
                    setProducers(producersData);

                    // Add markers for each producer using the fetched data directly
                    producersData.forEach(producer => {
                        if (producer && producer.longitude && producer.latitude) {
                            const marker = new mapboxgl.Marker({ color: "#22c55e" }) // Green color
                                .setLngLat([producer.longitude, producer.latitude])
                                .addTo(mapRef.current!);

                            marker.getElement().addEventListener("click", () => {
                                setSelectedProducer(producer);
                                setShowReceiverCard(false);
                                setShowProducerCard(true);
                                console.log("Clicked on producer:", producer.business_name);
                            });

                            // Store the marker reference for toggling visibility later
                            producerMarkersRef.current.push(marker);
                        } else {
                            console.log("Skipping producer with invalid coordinates:", producer);
                        }
                    });
                } else {
                    console.error("Producers data is not an array:", producersData);
                }

                // Fetch receivers
                const receiversData = await getReceivers(userLocation.latitude, userLocation.longitude);
                console.log("Receivers data received:", receiversData);

                if (Array.isArray(receiversData)) {
                    setReceivers(receiversData);

                    // Add receiver markers
                    receiversData.forEach(receiver => {
                        if (receiver && receiver.longitude && receiver.latitude) {
                            const marker = new mapboxgl.Marker({ color: "#f97316" }) // Orange color
                                .setLngLat([receiver.longitude, receiver.latitude])
                                .addTo(mapRef.current!);

                            marker.getElement().addEventListener("click", () => {
                                setSelectedReceiver(receiver);
                                setShowReceiverCard(true);
                                setShowProducerCard(false);
                                console.log("Clicked on receiver:", receiver.organization_name);
                            });

                            receiverMarkersRef.current.push(marker);
                        } else {
                            console.log("Skipping receiver with invalid coordinates:", receiver);
                        }
                    });
                } else {
                    console.error("Receivers data is not an array:", receiversData);
                }
            } catch (error) {
                console.error("Error fetching or processing data:", error);
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
            // Clear marker references
            producerMarkersRef.current = [];
            receiverMarkersRef.current = [];
        };
    }, [locationLoaded, userLocation]);

    // Update markers visibility when filter changes
    useEffect(() => {
        if (!mapRef.current || !locationLoaded) return;

        // Toggle producer markers visibility
        producerMarkersRef.current.forEach(marker => {
            const element = marker.getElement();
            if (producerOn) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });

        // Toggle receiver markers visibility
        receiverMarkersRef.current.forEach(marker => {
            const element = marker.getElement();
            if (receiverOn) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });

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
                {showProducerCard && selectedProducer && (
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
                        className="sliding" id="slider">
                        <ReceiverCard producer={selectedEntity} />
                    </div>
                )}
                {showReceiverCard && selecterReceiver && (
                    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
                        className="sliding" id="slider">
                        <ReceiverCard2 producer={selectedEntity} />
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