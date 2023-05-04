import { BiDotsHorizontalRounded, BiTrash } from 'react-icons/bi'
import { FaWrench } from 'react-icons/fa'

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import type { Post } from "@prisma/client";
import { api } from '~/utils/api';

interface ContextMenuProps
{
    post : Post;

    setFormFlag     : React.Dispatch<React.SetStateAction<boolean>>;
    setFormState    : React.Dispatch<React.SetStateAction<boolean>>;
    setFormPostId   : React.Dispatch<React.SetStateAction<string>>;
    setFormInput    : React.Dispatch<React.SetStateAction<string>>;
}


export const ContextMenu : React.FC<ContextMenuProps> = ({post, setFormState, setFormFlag, setFormPostId, setFormInput}) => {
    
    const ctx = api.useContext();
    
    const {mutate: deleteMutate, isLoading: deleteIsPosting} = api.post.delete.useMutation({
        onSuccess: () => {
            void ctx.post.getAll.invalidate();
        }
    });

    return (
        
        

        <Menu as="div">
            <Menu.Button className="hover:brightness-50 duration-200">
                <BiDotsHorizontalRounded className="h-4 w-4"/>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                
                <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-slate-100 rounded-md bg-slate-800 shadow-lg ring-1 ring-black z-30 ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-violet-600' : 'bg-transparent'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 gap-2`}
                                onClick={()=>
                                {
                                    setFormFlag(true);
                                    setFormPostId(post.id);
                                    setFormInput(post.content);
                                    setFormState(true);
                                }}>
                                <FaWrench className="text-amber-400 w-4 h-4"/>
                                <p>Edit</p>
                            </button>
                        )}
                        </Menu.Item>
                        <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${
                                active ? 'bg-violet-600' : 'bg-transparent'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm duration-200 gap-2`}
                                onClick={()=>deleteMutate({postId:post.id})}
                                disabled={deleteIsPosting}>
                                <BiTrash className="text-red-500 w-4 h-4"/>
                                <p>Delete</p>
                            </button>
                        )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
};