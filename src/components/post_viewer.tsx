    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

import {Post, User} from "@prisma/client";

import Image from 'next/image';


interface PostViewerProps
{
    sessionUser  : User | null;
    posts        : (Post & {user : User})[];
};


export const PostViewer : React.FC<PostViewerProps> = ( {posts, sessionUser} ) => {
    dayjs.extend(relativeTime);

    return (
    <div className="h-full w-full border-x-2">
        {posts.map((post) => (
            <div key={post.id} className="w-full bg-gray-700 hover:bg-gray-900 duration-300 h-fit border-b-2 p-3 flex gap-3">
            <button className="h-14 w-14">
                <Image src={post.user.profileImage || ""} alt="user image" width={1050} height={1050} className=" rounded-full" />
            </button>
            <div className="w-full">
                <div className="flex gap-1 items-center cursor-pointer w-full">
                    <p className="text-gray-300 font-semibold hover:brightness-200 duration-200">{post.user.name}</p>
                    <p className="text-gray-400 font-bold">·</p>
                    <p className="text-gray-400 text-sm hover:brightness-200 duration-200">@{post.user.userTag}</p>
                </div>
                <div className="w-full text-lg">
                {post.content}
                </div>
                <div className="text-gray-400 text-xs pb-2">
                    {post.modifiedFlag && <span>Modified {dayjs(post.modifiedAt).fromNow()}</span>}
                    {!post.modifiedFlag && <span>Created {dayjs(post.createdAt).fromNow()}</span>}
                </div>
                <div className="w-full flex">
                <div className="w-2/3 flex gap-12 md:gap-20 lg:gap-32">
                    <button><AiOutlineHeart className="h-4 w-4 hover:scale-150 hover:text-rose-700 duration-200"/></button>
                    <button><BsFillChatDotsFill className="h-4 w-4 hover:scale-150 hover:text-violet-500 duration-200"/></button>
                </div>
                <div className="w-1/3 flex justify-end">
                    {sessionUser && sessionUser.id == post.userId && <button><BiDotsHorizontalRounded className="h-4 w-4"/></button>}
                </div>
                </div>
            </div>
            </div>
        ),)}
    </div>
    );
};