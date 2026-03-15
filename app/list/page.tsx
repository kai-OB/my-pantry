'use client';

import { useState } from 'react';
import { PANTRIES } from '@/lib/pantries';
import PantryCard from '@/components/PantryCard';
import { useLocation } from '@/lib/LocationContext';
import { haversineDistance } from '@/lib/distance';

const RADIUS_OPTIONS = [
  { label: 'All', value: null },
  { label: '5 mi', value: 5 },
  { label: '10 mi', value: 10 },
  { label: '25 mi', value: 25 },
] as const;

export default function ListPage() {
  const { location, loading, requestLocation } = useLocation();
  const [radiusMiles, setRadiusMiles] = useState<number | null>(null);

  const withDist = PANTRIES.map((p) => ({
    ...p,
    distance: location
      ? haversineDistance(location.lat, location.lng, p.lat, p.lng)
      : null,
  }));

  const filtered =
    location && radiusMiles
      ? withDist.filter((p) => p.distance !== null && p.distance <= radiusMiles)
      : withDist;

  const sorted = location
    ? [...filtered].sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
    : filtered;

  return (
    <div className="pb-24" style={{ background: '#F8F5F0', minHeight: '100dvh' }}>
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <h1 className="font-bold" style={{ color: '#1F2933', fontSize: 24 }}>
          Food Pantries
        </h1>
        <p className="text-sm mt-1" style={{ color: '#1F2933', opacity: 0.55 }}>
          {sorted.length} location{sorted.length !== 1 ? 's' : ''}{location ? ' near you' : ''}
        </p>
      </div>

      {/* Filter bar */}
      <div className="px-5 mb-5 flex items-center gap-2 overflow-x-auto">
        {!location && (
          <button
            onClick={requestLocation}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shrink-0 disabled:opacity-50"
            style={{ background: '#ED6E3A', color: '#FFFFFF' }}
          >
            {loading ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
              </svg>
            )}
            {loading ? 'Locating…' : 'Near me'}
          </button>
        )}

        {RADIUS_OPTIONS.map((opt) => {
          const active = radiusMiles === opt.value;
          const disabled = !location && opt.value !== null;
          return (
            <button
              key={String(opt.value)}
              onClick={() => setRadiusMiles(opt.value)}
              disabled={disabled}
              className="px-3 py-2 rounded-full text-xs font-semibold shrink-0 disabled:opacity-30"
              style={{
                background: active ? '#1F2933' : '#F8F5F0',
                color: active ? '#F8F5F0' : '#1F2933',
                border: '1.5px solid #DBCDB5',
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="px-5 flex flex-col gap-3">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="font-semibold" style={{ color: '#1F2933' }}>No pantries in this radius</p>
            <p className="text-sm mt-1" style={{ color: '#1F2933', opacity: 0.55 }}>Try expanding your distance filter.</p>
          </div>
        ) : (
          sorted.map((pantry) => (
            <PantryCard key={pantry.id} pantry={pantry} distanceMiles={pantry.distance} />
          ))
        )}
      </div>
    </div>
  );
}
