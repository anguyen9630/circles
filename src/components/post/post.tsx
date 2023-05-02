//import Heart from "react-heart"

import type {Like, Post, User} from "@prisma/client";

import { AiFillHeart } from 'react-icons/ai'

import ConfettiExplosion from 'react-confetti-explosion'

import Image from 'next/image';

import { useState } from "react";

import { ContextMenu } from "./menu";

import { BsFillChatDotsFill } from 'react-icons/bs'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { api } from "~/utils/api";

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

    dayjs.extend(relativeTime);

    return (
        <div key={post.id} className={`w-full bg-gray-700 hover:bg-gray-900 duration-300 h-fit border-b-2 p-3 flex justify-between`}>
            <div className="static w-1/6 md:w-1/12 md:static flex">
                <button className=" h-10 w-10 md:h-12 md:w-12">
                    <Image src={post.user.profileImage || ""} alt="user image" width={1050} height={1050} className=" rounded-full" />
                </button>
            </div>
            <div className="w-5/6 md:w-11/12">
                <div className="flex w-full justify-between">
                    <div className="flex gap-1 items-center cursor-pointer">
                        <p className="text-gray-300 w-fit font-semibold text-sm md:text-base hover:brightness-200 duration-200">{post.user.name}
                        {window.innerWidth > 768 && <span className="text-gray-400 font-bold"> · </span>}
                        {window.innerWidth < 768 && <br/>}
                        <span className="text-gray-400 font-bold text-xs truncate">@{post.user.userTag}</span></p>
                        
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
                    <button className="flex items-start text-gray-400 gap-1 rounded-full" >
                        <AiFillHeart 
                            onClick={()=>{
                                        if (sessionUser){
                                        likeButtonFunction(like, setLike, likeCount, setLikeCount, setThrowConfetti)
                                        if (like) removeLike({likeId: post.id.concat(sessionUser.id)})
                                        else addLike({postId: post.id})}
                                }
                            } 
                            className={`relative w-4 h-4 hover:scale-125 active:scale-150 hover:text-red-500 ${like? 'text-red-500' : 'text-gray-400'} duration-100`}/>
                        {<p className={`duration-200 text-sm ${like? 'text-rose-700' : 'text-gray-400'} `}>{likeCount}</p>}
                        {throwConfetti && <ConfettiExplosion className="absolute" force={0.6} duration={2000} particleCount={10} width={200}/>}
                    </button>
                    <button><BsFillChatDotsFill className={`h-4 w-4 hover:scale-150 hover:text-violet-500 duration-200`}/></button>
                </div>

            </div>
        </div>
        
    );
};