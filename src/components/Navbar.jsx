import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-5'>
            <div className="flex-1">
                <ul className='flex items-center gap-4'>
                    <li><Link href={'/'}>home</Link></li>
                    <li><Link href={'/destinations'}>Destinations</Link></li>
                    <li><Link href={'/my-bookings'}>My Bookings</Link></li>
                    <li><Link href={'/admin'}>Admin</Link></li>
                </ul>
            </div>
            <div className="">
                <h3 className='text-3xl lg:text-4xl text-blue-600 font-bold'>Wanderlust</h3>
            </div>
            <div className="flex-1">
                <ul className='flex items-center gap-4 justify-end'>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    <li><Link href={'/login'}>Login</Link></li>
                    <li><Link href={'/signup'}>Sign Up</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;