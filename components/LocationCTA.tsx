'use client';

import { useLocation } from '@/lib/LocationContext';
import { useRouter } from 'next/navigation';

export default function LocationCTA() {
  const { location, loading, error, requestLocation } = useLocation();
  const router = useRouter();

  if (location) {
    return (
      <button
        onClick={() => router.push('/map')}
        className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-opacity active:opacity-80"
        style={{ background: '#E9F4E0', border: '1.5px solid #6C9E4F' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#6C9E4F' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4.5 h-4.5 w-5 h-5">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 1 0-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742zM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#6C9E4F' }}>Location active</p>
          <p className="text-xs" style={{ color: '#1F2933', opacity: 0.6 }}>Tap to see pantries on the map</p>
        </div>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={requestLocation}
        disabled={loading}
        className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-opacity active:opacity-80 disabled:opacity-50"
        style={{ background: '#F8F5F0', border: '1.5px solid #DBCDB5' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#DBCDB5' }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#1F2933', borderTopColor: 'transparent' }} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: '#1F2933' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1F2933' }}>
            {loading ? 'Finding your location…' : 'Use my current location'}
          </p>
          <p className="text-xs" style={{ color: '#1F2933', opacity: 0.55 }}>
            Filter pantries by distance
          </p>
        </div>
      </button>
      {error && (
        <p className="text-xs mt-2 px-1" style={{ color: '#A4330D' }}>
          {error}
        </p>
      )}
    </div>
  );
}
