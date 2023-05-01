import { type NextPage } from "next";

import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";


import { api } from "~/utils/api";
import { BannerContent } from "~/components/banner";
import { CreatePostButton } from "~/components/post/button";
import { CreatePostForm } from "~/components/post/form";
import { PostViewer } from "~/components/post/viewer";



const Home: NextPage = () => {

  
  
  const user = api.user.getUser.useQuery().data || null;
  const [postWizard, setPostWizard] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postId, setPostId] = useState("");

  const posts = api.post.getAll.useQuery().data || [];

  //console.log(user)
  
  if (user && (!user.profileImage || !user.userTag)) throw new Error("User has not been properly initialized!");

  return (
    <>
      <Head>
        <title>Circles</title>
        <meta name="description" content="Connect with your Circles" />
        <link rel="icon" href="/circles_logo.svg" />
      </Head>
      <main className="flex min-h-screen bg-slate-800 justify-center duration-300">

        <CreatePostForm 
          formState={postWizard} 
          setFormState={setPostWizard} 
          editFlag={editPost} 
          content={postContent} 
          setContent={setPostContent} 
          postID={postId} 
          setPostID={setPostId}
        />
        
        <BannerContent user={user}/>
        <CreatePostButton user={user} formState={postWizard} setFormState={setPostWizard} setEditFlag={setEditPost} />
        <div className="flex min-h-screen pt-20 w-11/12 md:w-4/6 lg:w-1/2 duration-300 overflow-auto">
          <PostViewer 
            sessionUser={user} 
            posts={posts}
            setFormState={setPostWizard} 
            setFormFlag={setEditPost}
            setFormPostId={setPostId}
            setFormInput={setPostContent}
          />
        </div>
      </main>
    </>
  );
};

export default Home;

