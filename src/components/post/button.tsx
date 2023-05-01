import { FaPencilAlt } from 'react-icons/fa'
import { signIn } from "next-auth/react";
import { User } from '@prisma/client';
import React from 'react';

interface ButtonProps 
{
    user : User | null;
    formState : boolean;
    setFormState : React.Dispatch<React.SetStateAction<boolean>>;
    setEditFlag : React.Dispatch<React.SetStateAction<boolean>>;
};

interface ProtectedContentProps
{
    user : User | null;
};


export const ButtonContent : React.FC<ProtectedContentProps> = ( {user} ) => {
    

    if ( user ) return <p className='flex gap-2 justify-center items-center'><FaPencilAlt className="w-6 h-6"/> <span>New Post</span></p>;
    else return <p>Sign In to Post</p>;
};

function ButtonClickFunction( user : User | null, formState : boolean,
    setFormState: React.Dispatch<React.SetStateAction<boolean>>, 
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>){

    if ( user ) {
        setFormState(!formState);
        setEditFlag(false);
    }
    else signIn();
};


export const CreatePostButton : React.FC<ButtonProps> = ( {user, formState, setFormState, setEditFlag} ) => {

    return (
    <button className="fixed z-20 font-bold brightness-90 hover:brightness-100 active:brightness-75 duration-200 w-40 h-16 md:bottom-4 md:right-6 md:w-52 bottom-2 right-2 rounded-full shadow-md shadow-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
    onClick={() => ButtonClickFunction(user, formState, setFormState, setEditFlag)}>
        <ButtonContent user={ user } />
    </button>
    );
};