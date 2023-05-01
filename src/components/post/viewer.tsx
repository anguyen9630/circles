    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'

import {Like, Post, User} from "@prisma/client";

import Image from 'next/image';

import { ContextMenu } from "./menu";



interface PostViewerProps
{
    sessionUser  : User | null;
    posts        : (Post & {user : User} & {likes : Like[]} & {replies : Post[]})[];

    setFormState    : React.Dispatch<React.SetStateAction<boolean>>;
    setFormFlag     : React.Dispatch<React.SetStateAction<boolean>>;
    setFormPostId   : React.Dispatch<React.SetStateAction<string>>;
    setFormInput    : React.Dispatch<React.SetStateAction<string>>;
};


export const PostViewer : React.FC<PostViewerProps> = ( {posts, sessionUser, setFormState, setFormFlag, setFormPostId, setFormInput} ) => {
    
    dayjs.extend(relativeTime);

    return (
    <div className="h-full w-full border-x-2">
        {posts.map((post) => (
            <div key={post.id} className={`w-full bg-gray-700 hover:bg-gray-900 duration-300 h-fit border-b-2 p-3 flex gap-3`}>
            <button className="h-14 w-14">
                <Image src={post.user.profileImage || ""} alt="user image" width={1050} height={1050} className=" rounded-full" />
            </button>
            <div className="w-full">
                <div className="flex w-full justify-between">
                    <div className="flex gap-1 items-center cursor-pointer ">
                        <p className="text-gray-300 font-semibold hover:brightness-200 duration-200">{post.user.name}</p>
                        <p className="text-gray-400 font-bold">·</p>
                        <p className="text-gray-400 text-sm hover:brightness-200 duration-200">@{post.user.userTag}</p>
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
                <div className="w-full text-lg">
                {post.content}
                </div>
                <div className="text-gray-400 text-xs pb-2">
                    {post.modifiedFlag && <span>Modified {dayjs(post.modifiedAt).fromNow()}</span>}
                    {!post.modifiedFlag && <span>Created {dayjs(post.createdAt).fromNow()}</span>}
                </div>

                <div className="w-full flex gap-12 md:gap-20 lg:gap-32">
                    <button className="flex items-start gap-1 hover:text-rose-700">
                         
                        <AiOutlineHeart className="h-4 w-4 hover:scale-150 duration-200"/>
                        {<p className="duration-200 text-sm">{post.likes.length}</p>}
                    </button>
                    <button><BsFillChatDotsFill className="h-4 w-4 hover:scale-150 hover:text-violet-500 duration-200"/></button>
                </div>

            </div>
            </div>
        ),)}
    </div>
    );
};

// post.likes.find(like => like.userId === sessionUser?.id)? 'liked' : 'not liked'