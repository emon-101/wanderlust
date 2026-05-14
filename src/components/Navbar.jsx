"use client";
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const {
        data: session,
    } = authClient.useSession();
    const user = session?.user;

    const handleSignout = async() => {
        await authClient.signOut();
    }
    return (
        <nav className='flex flex-col lg:flex-row justify-between items-center p-5'>
            <div className="flex-1">
                <ul className='flex items-center gap-4'>
                    <li><Link href={'/'}>home</Link></li>
                    <li><Link href={'/destinations'}>Destinations</Link></li>
                    <li><Link href={'/my-bookings'}>My Bookings</Link></li>
                    <li><Link href={'/admin'}>Admin</Link></li>
                    <li><Link href={'/add-destination'}>Add Destination</Link></li>
                </ul>
            </div>
            <div className="hidden lg:flex">
                <h3 className='text-3xl lg:text-4xl text-blue-600 font-bold'>Wanderlust</h3>
            </div>
            <div className="flex-1">
                <ul className='flex items-center gap-4 justify-end'>
                    <li><Link href={'/profile'}>Profile</Link></li>
                    {
                        user?
                        <>
                            <Image
                            className='rounded-full h-8 w-8 object-contain'
                            alt={user?.name}
                            src={user?.image}
                            height={40}
                            width={40}
                            />
                            <Button onClick={handleSignout} variant='outline' className={'rounded-none text-red-500'}>Logout</Button>
                        </> :
                        <>
                            <li><Link href={'/login'}>Login</Link></li>
                            <li><Link href={'/signup'}>Sign Up</Link></li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;