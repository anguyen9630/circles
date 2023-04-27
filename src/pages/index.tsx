import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { BannerContent } from "~/components/banner";
import { CreatePostButton } from "~/components/post_button";
import { CreatePostForm } from "~/components/post_form";





const Home: NextPage = () => {



  return (
    <>
      <Head>
        <title>Circles</title>
        <meta name="description" content="Connect with your Circles" />
        <link rel="icon" href="/circles_logo.svg" />
      </Head>
      <main className="flex min-h-screen bg-slate-800 justify-center duration-300">
        
        <BannerContent/>
        <CreatePostButton/>
        <div className="flex min-h-screen pt-20 w-11/12 md:w-4/6 lg:w-1/2 duration-300">
          <div className="h-full w-full border-x-2">
            
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

