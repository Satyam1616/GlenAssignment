import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  listings: Array<{
    id: string;
    title: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    price: number;
  }>;
  onMarkerClick: (listingId: string) => void;
}

const Map: React.FC<MapProps> = ({ listings, onMarkerClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.5, 40], // Default center
      zoom: 9
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each listing
    listings.forEach(listing => {
      const el = document.createElement('div');
      el.className = `marker ${selectedListing === listing.id ? 'selected' : ''}`;
      el.innerHTML = `
        <div class="marker-content">
          <span class="price">$${listing.price}</span>
        </div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([listing.coordinates.lng, listing.coordinates.lat])
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedListing(listing.id);
        onMarkerClick(listing.id);
      });

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (listings.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      listings.forEach(listing => {
        bounds.extend([listing.coordinates.lng, listing.coordinates.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [listings, selectedListing, onMarkerClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      <style jsx>{`
        .marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: white;
          border: 2px solid #4f46e5;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .marker:hover {
          transform: scale(1.1);
        }

        .marker.selected {
          background-color: #4f46e5;
          color: white;
        }

        .marker-content {
          font-size: 12px;
          font-weight: 600;
        }

        .price {
          color: #4f46e5;
        }

        .marker.selected .price {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Map; 