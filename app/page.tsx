import Link from 'next/link';
import LocationCTA from '@/components/LocationCTA';
import { PANTRIES } from '@/lib/pantries';

const quickLinks = [
  {
    href: '/map',
    label: 'Map View',
    description: 'Browse pantries on an interactive map',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z" />
      </svg>
    ),
  },
  {
    href: '/list',
    label: 'Browse All Pantries',
    description: 'Search and filter the full list',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z" />
      </svg>
    ),
  },
  {
    href: '/saved',
    label: 'Saved Pantries',
    description: 'Quickly find places you\'ve bookmarked',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="pb-24" style={{ background: '#F8F5F0', minHeight: '100dvh' }}>
      {/* Hero */}
      <div className="px-6 pt-14 pb-8">
        <p
          className="text-sm font-semibold mb-3 uppercase tracking-wide"
          style={{ color: '#6C9E4F' }}
        >
          Free &amp; Confidential
        </p>
        <h1
          className="font-bold leading-tight mb-2"
          style={{ color: '#1F2933', fontSize: 26, lineHeight: 1.25 }}
        >
          You are not alone.
        </h1>
        <p className="text-base mb-8" style={{ color: '#1F2933', opacity: 0.65, lineHeight: 1.55 }}>
          Let's find free food near you. No judgment, no barriers — just help.
        </p>

        {/* Primary CTA */}
        <Link
          href="/map"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold text-base transition-opacity active:opacity-85"
          style={{ background: '#ED6E3A', color: '#FFFFFF', minHeight: 52 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
          </svg>
          Find free food near me
        </Link>
      </div>

      {/* Location CTA card */}
      <div className="px-6 mb-6">
        <LocationCTA />
      </div>

      {/* Stats strip */}
      <div className="mx-6 grid grid-cols-2 gap-3 mb-8">
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: '#DBCDB5' }}
        >
          <p className="text-2xl font-bold" style={{ color: '#1F2933' }}>
            {PANTRIES.length}
          </p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: '#1F2933', opacity: 0.65 }}>
            Pantries Available
          </p>
        </div>
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: '#DBCDB5' }}
        >
          <p className="text-2xl font-bold" style={{ color: '#1F2933' }}>
            Free
          </p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: '#1F2933', opacity: 0.65 }}>
            Always
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="px-6">
        <h2 className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: '#1F2933', opacity: 0.5 }}>
          Quick access
        </h2>
        <div className="flex flex-col gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 p-4 rounded-2xl transition-opacity active:opacity-80"
              style={{ background: '#DBCDB5' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: '#F8F5F0', color: '#1F2933' }}
              >
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm" style={{ color: '#1F2933' }}>
                  {link.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#1F2933', opacity: 0.6 }}>
                  {link.description}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 shrink-0" style={{ color: '#1F2933', opacity: 0.35 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
