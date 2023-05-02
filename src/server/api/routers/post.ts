import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const postRouter = createTRPCRouter({
      
    
    getAll: publicProcedure.query(async ({ ctx }) => {
        // Get posts, 50 at a time, ordered by most recent
        // Also do a join and return the profileData for each post
        const postList = await ctx.prisma.post.findMany({take: 50, orderBy: {createdAt: "desc"}, include: {user: true, likes: true, replies: true}});
        
        return postList;
    }),

    create: protectedProcedure.input(z.object({ content: z.string() })).mutation(async ({ ctx, input }) => {
        // Get the user id from the session
        const userId = ctx.session.user.id;

        // Create a new post
        const newPost = await ctx.prisma.post.create({data: {content: input.content, userId: userId}});

        // Return the new post
        return newPost;
    }),
    
    edit: protectedProcedure.input(z.object({ postId: z.string(), content: z.string() })).mutation(async ({ ctx, input }) => {
        
      // Get the user id from the session
      const userId = ctx.session.user.id;

      // Get the post using the post id
      const post = await ctx.prisma.post.findUniqueOrThrow({where: {id: input.postId}});

      // If the user id does not match the user id of the post then throw an error
      if (post?.userId !== userId) {
          throw new TRPCClientError("You do not have permission to edit this post");
      }

      // Update the post
      const updatedPost = await ctx.prisma.post.update({where: {id: input.postId}, data: {content: input.content, modifiedFlag: true}});

      // Return the updated post
      return updatedPost;
    }),

    delete: protectedProcedure.input(z.object({ postId: z.string() })).mutation(async ({ ctx, input }) => {
      // Get the user id from the session
      const userId = ctx.session.user.id;

      // Get the post using the post id
      const post = await ctx.prisma.post.findUniqueOrThrow({where: {id: input.postId}});

      // If the user id does not match the user id of the post then throw an error
      if (post?.userId !== userId) {
        throw new TRPCClientError("You do not have permission to delete this post");
      }

      // Delete the post
      const deletedPost = await ctx.prisma.post.delete({where: {id: input.postId}});

      // Return the deleted post
      return deletedPost;
    }),
    
   
  });