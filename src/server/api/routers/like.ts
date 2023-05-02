import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const likeRouter = createTRPCRouter({

    get: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
      // Get the user id from the session
      const userId = ctx.session.user.id;

      // Find the like with the post id and user id
      const like = await ctx.prisma.like.findFirst({where: {postId: input.postId, userId: userId}});

      // Return the like
      return like;
    }),

    create: protectedProcedure.input(z.object({ postId: z.string() })).mutation(async ({ ctx, input }) => {
        // Get the user id from the session
        const userId = ctx.session.user.id;

        // Create a new like with the post id and user id. Id of like is the post id concatenated with the user id
        const newLike = await ctx.prisma.like.create({data: {id: input.postId.concat(userId), postId: input.postId, userId: userId}});
    }),

    delete: protectedProcedure.input(z.object({ likeId: z.string() })).mutation(async ({ ctx, input }) => {

      // Delete the like using the id
      const deletedLike = await ctx.prisma.like.delete({where: {id: input.likeId}});
    }),
    
   
  });