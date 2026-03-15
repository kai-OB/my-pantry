'use client';

import { Pantry } from '@/lib/types';
import { useSavedPantries } from '@/lib/SavedPantriesContext';
import { formatDistance } from '@/lib/distance';

interface Props {
  pantry: Pantry;
  distanceMiles?: number | null;
}

export default function PantryCard({ pantry, distanceMiles }: Props) {
  const { isSaved, toggleSave } = useSavedPantries();
  const saved = isSaved(pantry.id);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${pantry.address}, ${pantry.city}, ${pantry.state} ${pantry.zip}`
  )}`;

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{ background: '#F8F5F0', border: '1px solid #DBCDB5' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h2
            className="font-semibold leading-tight"
            style={{ color: '#1F2933', fontSize: 17 }}
          >
            {pantry.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#1F2933', opacity: 0.6 }}>
            {pantry.address}, {pantry.city}, {pantry.state}
          </p>
        </div>
        <button
          onClick={() => toggleSave(pantry.id)}
          className="shrink-0 p-2 rounded-full transition-colors"
          style={{
            background: saved ? '#ED6E3A20' : 'transparent',
            color: saved ? '#ED6E3A' : '#1F2933',
            opacity: saved ? 1 : 0.4,
          }}
          aria-label={saved ? 'Unsave pantry' : 'Save pantry'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
          </svg>
        </button>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-2">
        {/* Hours pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: '#E9F4E0', color: '#6C9E4F' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
          </svg>
          {pantry.hours}
        </div>

        {/* Distance pill */}
        {distanceMiles != null && (
          <div
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: '#DBCDB5', color: '#1F2933' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
            </svg>
            {formatDistance(distanceMiles)}
          </div>
        )}
      </div>

      {pantry.description && (
        <p className="text-sm leading-relaxed" style={{ color: '#1F2933', opacity: 0.7 }}>
          {pantry.description}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        {pantry.phone && (
          <a
            href={`tel:${pantry.phone.replace(/\D/g, '')}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-sm font-semibold transition-opacity active:opacity-80"
            style={{ background: '#ED6E3A', color: '#FFFFFF', minHeight: 44 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75z" />
            </svg>
            Call
          </a>
        )}
        {pantry.email && (
          <a
            href={`mailto:${pantry.email}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-sm font-semibold transition-opacity active:opacity-80"
            style={{ background: '#F8F5F0', color: '#1F2933', border: '1.5px solid #1F2933', minHeight: 44 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            Email
          </a>
        )}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-sm font-semibold transition-opacity active:opacity-80"
          style={{ background: '#F8F5F0', color: '#1F2933', border: '1.5px solid #1F2933', minHeight: 44 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z" />
          </svg>
          Directions
        </a>
      </div>
    </div>
  );
}
