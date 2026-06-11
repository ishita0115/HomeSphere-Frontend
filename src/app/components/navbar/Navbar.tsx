'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import UserNav from './userNavbar';
import { usePathname } from 'next/navigation';
import AddPropertyButton from './AddPropertyButton';
import { useEffect, useState } from 'react';
import useSearchModal from '@/app/redux/hooks/useSearchModel';

const NAV_LINKS = [
  { href: '/',          label: 'Home'     },
  { href: '/DetailHome',label: 'Listings' },
  { href: '/aboutus',   label: 'About'    },
  { href: '/contactus', label: 'Contact'  },
];

export default function Navbar() {
  const pathname  = usePathname();
  const userId    = useSelector((state: any) => state.auth.token.uid);
  const isAuth    = useSelector((state: any) => state.auth.isAuthenticated);
  const searchModal = useSearchModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <nav className={`navbar-floating ${
      scrolled || !isHome ? 'navbar-solid' : 'navbar-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm overflow-hidden ${scrolled || !isHome ? 'bg-white' : 'bg-white/15 backdrop-blur-sm'}`}>
              <Image src="/images/logo.jpg" alt="HomeSphere" width={36} height={36} className="object-cover" />
            </div>
            <span className={`font-heading font-bold text-lg tracking-tight hidden sm:block transition-colors duration-300 ${scrolled || !isHome ? 'text-primary' : 'text-white'}`}>
              Home<span className="text-accent">Sphere</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    active
                      ? scrolled || !isHome
                        ? 'text-primary bg-navy-50'
                        : 'text-white bg-white/15'
                      : scrolled || !isHome
                        ? 'text-navy-600 hover:text-primary hover:bg-navy-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-accent rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Search trigger */}
            <button
              onClick={() => searchModal.open('location')}
              className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                scrolled || !isHome
                  ? 'bg-navy-50 hover:bg-navy-100 text-navy-700 border border-navy-100'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <span>Search</span>
            </button>

            <AddPropertyButton userId={userId} />

            <UserNav userId={userId} />

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${scrolled || !isHome ? 'text-primary hover:bg-navy-50' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-navy-100 py-4 px-2 space-y-1 rounded-b-2xl shadow-card">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-primary text-white'
                    : 'text-navy-700 hover:bg-navy-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-navy-100">
              <button
                onClick={() => { setMobileOpen(false); searchModal.open('location'); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-navy-700 hover:bg-navy-50 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Search Properties
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
