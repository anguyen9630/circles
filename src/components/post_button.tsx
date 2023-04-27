import { FaPencilAlt } from 'react-icons/fa'


export const CreatePostButton = () => {
    return (<button className="fixed flex gap-2 font-bold brightness-90 hover:brightness-100 active:brightness-75 duration-200 justify-center items-center w-40 h-16 md:bottom-4 md:right-6 md:w-52 bottom-2 right-2 rounded-full shadow-md shadow-black bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
        <FaPencilAlt className="w-6 h-6"/> <span>New Post</span>
    </button>);
};