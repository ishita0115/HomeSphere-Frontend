'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from "react-redux";
import SearchFilters from './SearchFilters';
import UserNav from './userNavbar';
import { usePathname } from 'next/navigation'
import AddPropertyButton from './AddPropertyButton';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const pathname = usePathname()
    const isDetailHome = pathname === '/DetailHome';
    const userId = useSelector((state: any) => state.auth.token.uid)
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-navbar py-3'
                : 'bg-white/80 backdrop-blur-sm py-4'
        }`}>
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/images/logo.jpg"
                            alt="HomeSphere"
                            width={90}
                            height={30}
                            className="rounded-lg"
                        />
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {isDetailHome ? (
                            <SearchFilters />
                        ) : (
                            <>
                                <NavLink href="/">Home</NavLink>
                                <NavLink href="/DetailHome">Listings</NavLink>
                                <NavLink href="/contactus">Contact</NavLink>
                                <NavLink href="/aboutus">About</NavLink>
                            </>
                        )}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <AddPropertyButton userId={userId} />
                        <UserNav userId={userId} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-slate-50 group"
    >
        {children}
        <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
    </Link>
)

export default Navbar;
