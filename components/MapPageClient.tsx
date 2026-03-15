'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { PANTRIES } from '@/lib/pantries';
import { useLocation } from '@/lib/LocationContext';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: '#F8F5F0' }}>
      <div className="flex flex-col items-center gap-3" style={{ color: '#1F2933', opacity: 0.45 }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#ED6E3A', borderTopColor: 'transparent' }} />
        <span className="text-sm font-medium">Loading map…</span>
      </div>
    </div>
  ),
});

const RADIUS_OPTIONS = [
  { label: 'All', value: null },
  { label: '5 mi', value: 5 },
  { label: '10 mi', value: 10 },
  { label: '25 mi', value: 25 },
] as const;

export default function MapPageClient() {
  const { location, loading, error, requestLocation, clearLocation } = useLocation();
  const [radiusMiles, setRadiusMiles] = useState<number | null>(null);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 64px)' }}>
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 shrink-0 overflow-x-auto"
        style={{ background: '#F8F5F0', borderBottom: '1px solid #DBCDB5' }}
      >
        {/* Locate button */}
        {location ? (
          <button
            onClick={clearLocation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shrink-0"
            style={{ background: '#6C9E4F', color: '#FFFFFF' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 1 0-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
            </svg>
            Located ×
          </button>
        ) : (
          <button
            onClick={requestLocation}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shrink-0 disabled:opacity-50"
            style={{ background: '#F8F5F0', color: '#1F2933', border: '1.5px solid #DBCDB5' }}
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1F2933', borderTopColor: 'transparent' }} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
              </svg>
            )}
            {loading ? 'Locating…' : 'Use My Location'}
          </button>
        )}

        <div className="w-px h-5 shrink-0" style={{ background: '#DBCDB5' }} />

        {/* Radius filters */}
        <div className="flex gap-1.5 shrink-0">
          {RADIUS_OPTIONS.map((opt) => {
            const active = radiusMiles === opt.value;
            const disabled = !location && opt.value !== null;
            return (
              <button
                key={String(opt.value)}
                onClick={() => setRadiusMiles(opt.value)}
                disabled={disabled}
                className="px-3 py-2 rounded-full text-xs font-semibold transition-opacity disabled:opacity-30"
                style={{
                  background: active ? '#ED6E3A' : '#F8F5F0',
                  color: active ? '#FFFFFF' : '#1F2933',
                  border: active ? 'none' : '1.5px solid #DBCDB5',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 text-xs font-medium" style={{ background: '#F9E0DB', color: '#A4330D' }}>
          ⚠ {error}
        </div>
      )}

      {/* Map */}
      <div className="flex-1">
        <MapView pantries={PANTRIES} userLocation={location} radiusMiles={radiusMiles} />
      </div>
    </div>
  );
}
