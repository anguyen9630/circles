//import Heart from "react-heart"

import type {Like, Post, User} from "@prisma/client";

import { AiFillHeart } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx'

import { signIn } from "next-auth/react";

import ConfettiExplosion from 'react-confetti-explosion';

import Image from 'next/image';

import { Fragment, useState } from "react";

import { ContextMenu } from "./menu";



import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";
import { Dialog, Transition } from "@headlessui/react";

interface PostProps
{
    sessionUser  : User | null;
    post        : (Post & {user : User} & {likes : Like[]} & {replies : Post[]});

    setFormState    : React.Dispatch<React.SetStateAction<boolean>>;
    setFormFlag     : React.Dispatch<React.SetStateAction<boolean>>;
    setFormPostId   : React.Dispatch<React.SetStateAction<string>>;
    setFormInput    : React.Dispatch<React.SetStateAction<string>>;
}

function likeButtonFunction(like : boolean, setLike : React.Dispatch<React.SetStateAction<boolean>>, likeCount : number, setLikeCount : React.Dispatch<React.SetStateAction<number>>, setThrowConfetti : React.Dispatch<React.SetStateAction<boolean>>) : void{

    if (like) {
        setLike(false);
        setLikeCount(likeCount - 1);
        setThrowConfetti(false);
    }
    else {
        setLike(true);
        setLikeCount(likeCount + 1);
        setThrowConfetti(true);
    }
}

export const SinglePost : React.FC<PostProps> = ({sessionUser, post, setFormState, setFormFlag, setFormPostId, setFormInput}) => {

    const ctx = api.useContext();

    const {mutate: addLike, isLoading: likeIsCreating} = api.like.create.useMutation({
        onSuccess: () => {
            void ctx.post.getAll.invalidate();
            void ctx.like.get.invalidate();
        }}
    );

    const {mutate: removeLike, isLoading: likeIsRemoving} = api.like.delete.useMutation({
        onSuccess: () => {
            void ctx.post.getAll.invalidate();
        }}
    );

    


    const [like, setLike] = useState(post.likes.find(like=>like.userId === sessionUser?.id) ? true : false);
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [throwConfetti, setThrowConfetti] = useState(false);
    const [reply, setReply] = useState(false);
    const [replyInput, setReplyInput] = useState("");

    dayjs.extend(relativeTime);

    return (
        <div className={`w-full`}>
            <div className={`w-full relative bg-gray-700 hover:bg-gray-900 duration-300 h-fit border-b-2 p-3 flex justify-between`}>
                <div className="static w-1/6 md:w-1/12 md:static flex">
                    <button className=" h-10 w-10 md:h-12 md:w-12">
                        <Image src={post.user.profileImage || ""} alt="user image" width={1050} height={1050} className=" rounded-full" />
                    </button>
                </div>
                <div className="w-5/6 md:w-11/12">
                    <div className="flex w-full justify-between">
                        <div className="flex gap-1 items-center cursor-pointer pb-1">
                            <p> <span className="text-gray-300 w-fit font-semibold text-sm md:text-base hover:brightness-200 duration-200">{post.user.name}</span>
                            {window.innerWidth > 768 && <span className="text-gray-400 font-bold"> · </span>}
                            {window.innerWidth < 768 && <br/>}
                            <span className="text-gray-400 font-bold text-xs truncate hover:brightness-200 duration-200">@{post.user.userTag}</span></p>
                            
                        </div>

                        <div className="relative flex justify-end">
                            {sessionUser && sessionUser.id == post.userId && 
                                <ContextMenu
                                    post={post} 
                                    setFormState={setFormState}
                                    setFormFlag={setFormFlag}
                                    setFormInput={setFormInput}
                                    setFormPostId={setFormPostId}
                                />}
                        </div>
                        
                    </div>
                    <div className="w-full md:text-lg justify-end break-words">
                    {post.content}
                    </div>
                    <div className="text-gray-400 text-xs pb-2">
                        {post.modifiedFlag && <span>Modified {dayjs(post.modifiedAt).fromNow()}</span>}
                        {!post.modifiedFlag && <span>Created {dayjs(post.createdAt).fromNow()}</span>}
                    </div>

                    <div className="w-full flex gap-12 md:gap-20 lg:gap-32">
                        <div className="flex w-10 h-3 items-start fill-gray-400 gap-1 rounded-full" >
                            <AiFillHeart 
                                onClick={()=>{
                                    if (sessionUser){
                                        likeButtonFunction(like, setLike, likeCount, setLikeCount, setThrowConfetti)
                                        if (like) removeLike({likeId: post.id.concat(sessionUser.id)})
                                        else addLike({postId: post.id})}
                                    else void signIn()    
                                }}
                                className={`relative w-4 h-4 hover:scale-125 active:scale-150 cursor-pointer hover:text-red-500 ${like? 'text-red-500' : 'text-gray-400'} duration-100`}/>
                            {likeCount > 0 && <p className={`duration-200 text-sm ${like? 'text-rose-700' : 'text-gray-400'} `}>{likeCount}</p>}
                            {throwConfetti && <ConfettiExplosion className="absolute" force={0.6} duration={2000} particleCount={10} width={200}/>}
                        </div>
                        <button onClick={()=>setReply(!reply)}>
                            <BsFillChatDotsFill 
                            className={`h-4 w-4 hover:scale-125 active:scale-150 fill-gray-400 hover:fill-violet-600 duration-200`}/>
                        </button>
                    </div>
                </div>
            </div>
            
            <Transition appear 
                show={reply} 
                as={Fragment}
                enter="ease-in-out duration-200"
                enterFrom="h-0 -translate-y-full opacity-0"
                enterTo="h-fit translate-y-0 opacity-100"
                leave="ease-in-out duration-200"
                leaveFrom="h-fit translate-y-0 opacity-100"
                leaveTo="h-0 -translate-y-full opacity-0">
                <div className="w-full">
                    <div 
                        className=" w-full p-3 gap-3 bg-transparent flex justify-center items-start">
                            <div className="w-5/6 md:w-4/6 py-2 px-3 h-fit bg-gray-700 rounded-xl static">
                                {((document.getElementById("replyWizard")?.innerHTML === "") || (document.getElementById("replyWizard")?.innerHTML === "<br>")) && 
                                    <div id="replyPlaceHolder" className="absolute m-auto w-fit h-fit text-[#999999] select-none z-0">Reply to the post~</div>}
                                <div contentEditable id="replyWizard" className="absolue focus:outline-none w-full break-words align-middle z-20"/>
                                </div>

                            <div className="grid grid-cols-1 grid-rows-2 gap-3">
                                <button><FaPaperPlane className="h-7 w-7 hover:opacity-75 active:opacity-60 fill-violet-600 duration-200" onClick={()=>console.log(document.getElementById("replyWizard")?.innerText === "")}/></button>
                                <button><RxCrossCircled onClick={()=>setReply(false)} className="h-7 w-7 hover:opacity-75 active:opacity-60 text-red-500 duration-200"/></button>
                            </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
};