import {FaPaperPlane} from 'react-icons/fa'
import {RxCrossCircled} from 'react-icons/rx'

export const CreatePostForm = () => {
    return (
        <div className="fixed h-screen w-screen z-50 flex justify-center items-center">
            <div className="h-fit w-9/12 md:w-7/12 rounded-2xl p-6 md:p-8 shadow-lg shadow-black bg-gray-900">
                <h1 className="font-bold text-xl pb-2">Create a New Post</h1>
                <textarea placeholder="Share with the world!" className="px-4 py-2 h-72 md:h-36 font-semibold bg-transparent w-full focus:outline-none"/>
                <div className="flex justify-end gap-6">
                <button className="text-red-500 font-semibold"><RxCrossCircled className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-200"/></button>
                <button className="text-sky-400"><FaPaperPlane className="h-6 w-6 md:h-8 md:w-8 hover:brightness-75 active:brightness-50 duration-300"/></button>
                </div>
            </div>
        </div>
    );
};

