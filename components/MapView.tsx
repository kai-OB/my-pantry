'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Pantry } from '@/lib/types';
import { useSavedPantries } from '@/lib/SavedPantriesContext';
import { Coords } from '@/lib/LocationContext';
import { haversineDistance, formatDistance } from '@/lib/distance';

function makePin(color: string, saved: boolean) {
  const bookmarkIcon = saved
    ? `<path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />`
    : `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.507c0-1.47 1.073-2.756 2.57-2.93a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507z" />`;

  return L.divIcon({
    className: '',
    html: `<div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);background:${color};
      border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);
      display:flex;align-items:center;justify-content:center;">
      <div style="transform:rotate(45deg);display:flex;align-items:center;justify-content:center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="${saved ? 'white' : 'none'}" stroke="${saved ? 'none' : 'white'}"
          stroke-width="1.5" width="16" height="16">
          ${bookmarkIcon}
        </svg>
      </div>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  });
}

const userPin = L.divIcon({
  className: '',
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#3b82f6;border:3px solid white;
    box-shadow:0 0 0 4px rgba(59,130,246,0.25),0 2px 6px rgba(0,0,0,0.3);">
  </div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function RecenterMap({ coords }: { coords: Coords }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([coords.lat, coords.lng], 13, { duration: 1.2 });
  }, [map, coords.lat, coords.lng]);
  return null;
}

interface Props {
  pantries: Pantry[];
  userLocation: Coords | null;
  radiusMiles: number | null;
}

export default function MapView({ pantries, userLocation, radiusMiles }: Props) {
  const { isSaved, toggleSave } = useSavedPantries();

  const visiblePantries =
    userLocation && radiusMiles
      ? pantries.filter(
          (p) =>
            haversineDistance(userLocation.lat, userLocation.lng, p.lat, p.lng) <= radiusMiles
        )
      : pantries;

  return (
    <MapContainer
      center={[41.8781, -87.6298]}
      zoom={12}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && <RecenterMap coords={userLocation} />}

      {userLocation && radiusMiles && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={radiusMiles * 1609.34}
          pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.06, weight: 1.5 }}
        />
      )}

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userPin}>
          <Popup>
            <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>You are here</p>
          </Popup>
        </Marker>
      )}

      {visiblePantries.map((pantry) => {
        const saved = isSaved(pantry.id);
        const dist =
          userLocation
            ? haversineDistance(userLocation.lat, userLocation.lng, pantry.lat, pantry.lng)
            : null;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          `${pantry.address}, ${pantry.city}, ${pantry.state} ${pantry.zip}`
        )}`;

        return (
          <Marker
            key={pantry.id}
            position={[pantry.lat, pantry.lng]}
            icon={makePin(saved ? '#ED6E3A' : '#6C9E4F', saved)}
          >
            <Popup maxWidth={260}>
              <div style={{ fontFamily: 'system-ui, sans-serif', padding: '4px 2px' }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: '0 0 2px', lineHeight: 1.3 }}>
                  {pantry.name}
                </p>
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 2px' }}>
                  {pantry.address}, {pantry.city}
                </p>
                {dist !== null && (
                  <p style={{ fontSize: 12, color: '#3b82f6', margin: '0 0 2px', fontWeight: 500 }}>
                    {formatDistance(dist)} away
                  </p>
                )}
                <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 10px' }}>
                  {pantry.hours}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {pantry.phone && (
                    <a
                      href={`tel:${pantry.phone.replace(/\D/g, '')}`}
                      style={{ padding: '5px 10px', background: '#f0fdf4', color: '#15803d', borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
                    >
                      Call
                    </a>
                  )}
                  {pantry.email && (
                    <a
                      href={`mailto:${pantry.email}`}
                      style={{ padding: '5px 10px', background: '#eff6ff', color: '#1d4ed8', borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
                    >
                      Email
                    </a>
                  )}
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '5px 10px', background: '#faf5ff', color: '#7e22ce', borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}
                  >
                    Directions
                  </a>
                  <button
                    onClick={() => toggleSave(pantry.id)}
                    style={{ padding: '5px 10px', background: saved ? '#16a34a' : '#f3f4f6', color: saved ? '#fff' : '#374151', borderRadius: 8, fontSize: 12, fontWeight: 500, border: 'none', cursor: 'pointer' }}
                  >
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
