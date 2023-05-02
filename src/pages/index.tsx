import { type NextPage } from "next";

import { useState, useEffect } from "react";

import Head from "next/head";

import { LoadingSpinnerPage } from "~/components/loading";


import { api } from "~/utils/api";
import { BannerContent } from "~/components/banner";
import { CreatePostButton } from "~/components/post/button";
import { CreatePostForm } from "~/components/post/form";
import { PostViewer } from "~/components/post/viewer";
import { TRPCClientError } from "@trpc/client";

const ImageLinkList = ["https://i.ibb.co/qW4kmZT/image.png"
                        , "https://i.ibb.co/kq43mvk/1.png"
                        , "https://i.ibb.co/rmBSp2y/2.png"
                        , "https://i.ibb.co/NKbfwRP/3.png"
                        , "https://i.ibb.co/nrf2BnX/4.png"
                        , "https://i.ibb.co/9VWR1Fx/5.png"
                        , "https://i.ibb.co/4fn5P6d/6.png"
                        , "https://i.ibb.co/yFHNB9n/7.png"
                        , "https://i.ibb.co/Xsy1Mh0/8.png"
                        , "https://i.ibb.co/cN58JbY/9.png"]



const Home: NextPage = () => {

  const [postWizard, setPostWizard] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postId, setPostId] = useState("");

  //useEffect(() => {
  
  // Get user
  const { data : user, isLoading : userIsLoading } = api.user.getUser.useQuery();

  // Get posts
  const { data : posts, isLoading : postIsLoading } = api.post.getAll.useQuery();

  //console.log(user)
  if (postIsLoading) return <LoadingSpinnerPage/>;

  if (user && (!user.profileImage || !user.userTag)) throw new TRPCClientError("User has not been properly initialized!");

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
        
        <BannerContent user={user || null}/>
        <CreatePostButton user={user || null} formState={postWizard} setFormState={setPostWizard} setEditFlag={setEditPost} />
        <div className="flex min-h-screen pt-20 w-11/12 md:w-4/6 lg:w-1/2 duration-300 overflow-auto">
          <PostViewer 
            sessionUser={user || null} 
            posts={posts || []}
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

