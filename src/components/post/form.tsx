import {FaPaperPlane, FaWrench} from 'react-icons/fa'
import {RxCrossCircled} from 'react-icons/rx'
import { Fragment } from 'react';

import { Dialog, Transition} from '@headlessui/react';
import { api } from '~/utils/api';

interface PostWizardProps {
    formState : boolean;
    setFormState : React.Dispatch<React.SetStateAction<boolean>>;

    editFlag : boolean;
    postID   : string;
    setPostID : React.Dispatch<React.SetStateAction<string>>;
    content  : string;
    setContent : React.Dispatch<React.SetStateAction<string>>;
};

 function resetForm (setFormState : React.Dispatch<React.SetStateAction<boolean>>, 
    setPostID : React.Dispatch<React.SetStateAction<string>>,
    setContent : React.Dispatch<React.SetStateAction<string>>) : void {
        setFormState(false);
        setTimeout(() => {
            setPostID("");
            setContent("");
        }, 200);
 };


export const CreatePostForm : React.FC<PostWizardProps> = ( {formState, setFormState, editFlag, postID, setPostID, content, setContent} ) => {

    const ctx = api.useContext();

    const { mutate: postMutate, isLoading: createIsPosting } = api.post.create.useMutation(
        {
            onSuccess: () => {
                void ctx.post.getAll.invalidate();
                resetForm(setFormState, setPostID, setContent);
            }
        });
    
    const {mutate: editMutate, isLoading: editIsPosting} = api.post.edit.useMutation(
        {
            onSuccess: () => {
                void ctx.post.getAll.invalidate();
                resetForm(setFormState, setPostID, setContent);
            }
        }
    );

    

    return (
        <Transition appear show={formState} as={Fragment}>
            <Dialog onClose={
                ()=>{
                    resetForm(setFormState, setPostID, setContent);
                }} 
                className="fixed z-50 top-0 backdrop-blur-sm h-screen w-screen flex justify-center items-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="h-fit w-9/12 md:w-7/12 rounded-2xl p-6 md:p-8 shadow-lg shadow-black bg-gray-900">
                        <Dialog.Title as="h2" className="font-bold pb-2 text-xl">{editFlag ? 'Edit post' :'Create a new post'}</Dialog.Title>
                        <textarea 
                            placeholder="Share with the world!" 
                            className="px-4 py-2 h-72 md:h-36 font-semibold bg-transparent w-full focus:outline-none"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={createIsPosting}
                        />

                        <div className="flex justify-end gap-6">
                            <button className="text-red-500 font-semibold" onClick={() => resetForm(setFormState, setPostID, setContent)}>
                                <RxCrossCircled className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-200"/>
                            </button>
                            
                            {!editFlag && 
                                <button 
                                    className="text-sky-400"
                                    disabled={createIsPosting}
                                    onClick={() => postMutate({content: content})}
                                >
                                    <FaPaperPlane className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-300"/>
                                </button>
                            }
                            
                            {editFlag && 
                                <button 
                                    className="text-sky-400"
                                    disabled={editIsPosting}
                                    onClick={() => editMutate({postId:postID, content: content})}
                                >
                                    <FaWrench className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-300"/>
                                </button>
                            }
                            
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog >
        </Transition>
    );
};
