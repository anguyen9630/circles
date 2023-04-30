import { User } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const postRouter = createTRPCRouter({
    hello: publicProcedure
      .input(z.object({ text: z.string() }))
      .query(({ input }) => {
        return {
          greeting: `Hello ${input.text}`,
        };
      }),
      
    
    getAll: publicProcedure.query(async ({ ctx }) => {
        // Get posts, 50 at a time, ordered by most recent
        // Also do a join and return the profileData for each post
        const postList = await ctx.prisma.post.findMany({take: 50, orderBy: {createdAt: "desc"}, include: {user: true}});

        
        //console.log("Post List: ", postList);
        
        // const posts : PostDataReturn[] = [];

        // for(const post of postList){
        //     // Get the profile data for the post
        //     const profileData = await ctx.prisma.profile.findUnique({where: {id: post.profileId}});

        //     // Add the post and profile data to the return array
        //     posts.push({PostData: post, ProfileData: profileData!});
        // }

        
        return postList;
    }),

    createPost: protectedProcedure.input(z.object({ text: z.string() })).mutation(async ({ ctx, input }) => {
        // Get the user id from the session
        const userId = ctx.session.user.id;

        // Create a new post
        const newPost = await ctx.prisma.post.create({data: {content: input.text, userId: userId}});

        // Return the new post
        return newPost;
    }),
    
    
   
  });