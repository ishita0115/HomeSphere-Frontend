'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from "react-redux";
import SearchFilters from './SearchFilters';
import UserNav from './userNavbar';
import { usePathname } from 'next/navigation'
import AddPropertyButton from './AddPropertyButton';

const Navbar = () => {
    const pathname = usePathname()
    const isDetailHome = pathname === '/DetailHome';
    const userId = useSelector((state :any)=>state.auth.token.uid)
    return (
        <>
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.jpg"
                            alt="logo"
                            width={95}
                            height={20}
                        />
                    </Link>
                     

                    <div className="flex space-x-6">

                    {isDetailHome && <SearchFilters />}
                        {!isDetailHome && 
                            <>
                                <Link className="text-sm md:text-base hover:text-blue-800 " href="/">Home</Link>
                                <Link className="text-sm md:text-base hover:text-blue-800 " href="/contactus">Contact</Link>
                                <Link className="text-sm md:text-base hover:text-blue-800 " href="/aboutus">About</Link>
                            </>
                        }
                    </div>

                    <div className="flex items-center space-x-3 sm:text-base">
                         <AddPropertyButton 
                            userId={userId}
                        /> 
                     
                        <UserNav 
                           userId={userId}
                        /> 
                    </div>
                </div>
            </div>
        </nav>
         </>
    )
}

export default Navbar;