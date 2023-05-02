    

import {Like, Post, User} from "@prisma/client";


import { SinglePost } from './post';



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
    

    return (
    <div className="h-full w-full border-x-2">
        {posts.map((post) => (
            <SinglePost key={post.id} post={post} sessionUser={sessionUser} setFormState={setFormState} setFormFlag={setFormFlag} setFormPostId={setFormPostId} setFormInput={setFormInput}/>
        ),)}
    </div>
    );
};