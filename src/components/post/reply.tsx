import {Transition} from '@headlessui/react'
import { Fragment } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx'



interface ReplyWizardProps {
    replyState : boolean;
    setReplyState : React.Dispatch<React.SetStateAction<boolean>>;
    replyInput : string;
    setReplyInput : React.Dispatch<React.SetStateAction<string>>;
}

export const ReplyWizard : React.FC<ReplyWizardProps> = ( {replyState, setReplyState, replyInput, setReplyInput} ) => {
    
    return (
        <Transition appear 
            show={replyState} 
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="h-0 -translate-y-1/2 opacity-0"
            enterTo="h-fit translate-y-0 opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="h-fit translate-y-0 opacity-100"
            leaveTo="h-0 -translate-y-1/2 opacity-0">
            <div className=" w-full p-3 gap-3 bg-transparent flex justify-center items-start">
                    <div className="w-5/6 md:w-4/6 py-2 px-3 h-fit bg-gray-700 rounded-xl relative">
                        {(replyInput === "") && 
                            <div id="replyPlaceHolder" className="absolute pointer-events-none text-[#999999]">Reply to the post~</div>}
                        <div contentEditable 
                            className="focus:outline-none h-fit min-h-[3.25rem] break-words align-middle"
                            onInput={(e)=>{setReplyInput(e.currentTarget.textContent || '')}}/>
                        </div>

                    <div className="grid grid-cols-1 grid-rows-2 gap-3">
                        <button><FaPaperPlane className="h-7 w-7 hover:opacity-75 active:opacity-60 fill-violet-600 duration-200"/></button>
                        <button><RxCrossCircled onClick={()=>setReplyState(false)} className="h-7 w-7 hover:opacity-75 active:opacity-60 text-red-500 duration-200"/></button>
                    </div>
            </div>
        </Transition>);
}