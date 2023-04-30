import {FaPaperPlane} from 'react-icons/fa'
import {RxCrossCircled} from 'react-icons/rx'
import React from 'react';

import { Dialog, Transition} from '@headlessui/react';

interface PostWizardProps 
{
    formState : boolean;
    setFormState : React.Dispatch<React.SetStateAction<boolean>>;
};

function createNewPost()
{

};

export const CreatePostForm : React.FC<PostWizardProps> = ( {formState, setFormState} ) => {
    return (
        <Transition appear show={formState} as={React.Fragment}>
            <Dialog onClose={setFormState} className="fixed z-50 top-0 backdrop-blur-sm h-screen w-screen flex justify-center items-center">
                <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="h-fit w-9/12 md:w-7/12 rounded-2xl p-6 md:p-8 shadow-lg shadow-black bg-gray-900">
                        <Dialog.Title as="h2" className="font-bold pb-2 text-xl">Create a New Post</Dialog.Title>
                        <textarea placeholder="Share with the world!" className="px-4 py-2 h-72 md:h-36 font-semibold bg-transparent w-full focus:outline-none"/>
                        <div className="flex justify-end gap-6">
                            <button className="text-red-500 font-semibold" onClick={() => setFormState(!formState)}>
                                <RxCrossCircled className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-200"/>
                            </button>
                            <button className="text-sky-400"><FaPaperPlane className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-300"/></button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog >
        </Transition>
    );
};
