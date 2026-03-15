'use client';

import { PANTRIES } from '@/lib/pantries';
import PantryCard from '@/components/PantryCard';
import { useSavedPantries } from '@/lib/SavedPantriesContext';
import { useLocation } from '@/lib/LocationContext';
import { haversineDistance } from '@/lib/distance';

export default function SavedPage() {
  const { savedIds, hydrated } = useSavedPantries();
  const { location } = useLocation();

  const savedPantries = PANTRIES.filter((p) => savedIds.has(p.id)).map((p) => ({
    ...p,
    distance: location
      ? haversineDistance(location.lat, location.lng, p.lat, p.lng)
      : null,
  }));

  return (
    <div className="pb-24" style={{ background: '#F8F5F0', minHeight: '100dvh' }}>
      <div className="px-5 pt-10 pb-4">
        <h1 className="font-bold" style={{ color: '#1F2933', fontSize: 24 }}>
          Saved
        </h1>
        <p className="text-sm mt-1" style={{ color: '#1F2933', opacity: 0.55 }}>
          {hydrated ? `${savedPantries.length} saved` : '…'}
        </p>
      </div>

      {hydrated && savedPantries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
            style={{ background: '#DBCDB5' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-8 h-8" style={{ color: '#1F2933', opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
            </svg>
          </div>
          <h2 className="font-semibold text-lg" style={{ color: '#1F2933' }}>
            No saved pantries yet
          </h2>
          <p className="text-sm mt-2 max-w-xs leading-relaxed" style={{ color: '#1F2933', opacity: 0.55 }}>
            Tap the bookmark on any pantry in the Map or Pantries tab to save it here for quick access.
          </p>
        </div>
      ) : (
        <div className="px-5 flex flex-col gap-3">
          {savedPantries.map((pantry) => (
            <PantryCard key={pantry.id} pantry={pantry} distanceMiles={pantry.distance} />
          ))}
        </div>
      )}
    </div>
  );
}
