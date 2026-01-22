import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { CitationLocation } from '@/types/citations';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icon with cyber theme
const createCustomIcon = (count: number) => {
  const size = Math.min(30 + count * 2, 50);
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: #33CC66;
        border: 2px solid #0A0A0A;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #0A0A0A;
        font-weight: bold;
        font-size: ${size > 35 ? '12px' : '10px'};
        box-shadow: 0 0 10px rgba(51, 204, 102, 0.5);
      ">
        ${count}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

interface MapBoundsProps {
  locations: CitationLocation[];
}

const MapBounds: React.FC<MapBoundsProps> = ({ locations }) => {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude, loc.longitude] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  
  return null;
};

interface CitationMapProps {
  locations: CitationLocation[];
}

const CitationMap: React.FC<CitationMapProps> = ({ locations }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Default center (world view)
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  if (locations.length === 0) {
    return (
      <div className="w-full h-[500px] bg-cyber-grey rounded-lg border border-cyber-green/20 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-cyber-green/30 mx-auto mb-4" />
          <p className="text-gray-400">No citation locations available</p>
          <p className="text-sm text-gray-500 mt-2">Run the fetch-citations script to populate data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-cyber-green/20 relative">
      <style>{`
        .leaflet-container {
          background: #121212;
          color: #fff;
        }
        .leaflet-popup-content-wrapper {
          background: #222222;
          color: #fff;
          border: 1px solid #33CC66;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: #222222;
          border: 1px solid #33CC66;
        }
        .leaflet-popup-content {
          margin: 12px;
          color: #fff;
        }
        .leaflet-popup-content h3 {
          color: #33CC66;
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        .leaflet-popup-content p {
          margin: 4px 0;
          font-size: 14px;
          color: #ccc;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-zoom a {
          background: #222222;
          color: #33CC66;
          border: 1px solid #33CC66;
        }
        .leaflet-control-zoom a:hover {
          background: #33CC66;
          color: #0A0A0A;
        }
      `}</style>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds locations={locations} />
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={createCustomIcon(location.count)}
          >
            <Popup>
              <div className="text-white">
                <h3 className="text-cyber-green font-semibold mb-2">
                  {location.city || location.country}
                </h3>
                <p className="text-sm mb-2">
                  <span className="text-cyber-green font-medium">{location.count}</span> citation{location.count !== 1 ? 's' : ''}
                </p>
                {location.affiliations.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1">Affiliation{location.affiliations.length > 1 ? 's' : ''}:</p>
                    <ul className="text-xs space-y-1">
                      {location.affiliations.slice(0, 3).map((aff, i) => (
                        <li key={i} className="text-gray-300">• {aff}</li>
                      ))}
                      {location.affiliations.length > 3 && (
                        <li className="text-gray-500">+{location.affiliations.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CitationMap;
