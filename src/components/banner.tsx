import Logo from '/public/circles_logo.svg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { User } from '@prisma/client';

import { signIn, signOut } from "next-auth/react";

interface ProtectedContentProps
{
    user : User | null;
};

export const BannerContent : React.FC<ProtectedContentProps> = ( {user} ) => {



    return (
        <header className="fixed top-0 left-0 right-0 backdrop-blur flex w-full h-20 shadow-sm shadow-black">
            <div className="flex w-1/3 items-center justify-start pl-3">
                <button className='p-3 hover:bg-slate-600 rounded-2xl items-center justify-center active:bg-slate-700 duration-200'>
                    <GiHamburgerMenu className='w-8 h-8'/>
                </button>
            </div>
            <div className="flex w-1/3 items-center justify-center">
                <button className='shadow-md  shadow-black rounded-full'>
                    <Logo className='w-14 h-14 invert'/>
                </button>
            </div>
            <div className="flex w-1/3 justify-end items-center pr-3  ">
                <button 
                    className='hover:bg-slate-600 w-20 h-14 rounded-2xl font-bold active:bg-slate-700 duration-200'
                    onClick={user ? () => void signOut() : () => void signIn()}>
                    {user ? "Sign out" : "Sign in"}
                </button>
                
            </div>
        </header>
    );
};