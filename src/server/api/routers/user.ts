import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const idSchema = z.object({
  id: z.string(),
});

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const userRouter = createTRPCRouter({
  // Get all users
  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }
  ),
  // Get user by id
  getUserById: publicProcedure
    .input(idSchema)
    .query(async ({ ctx, input }) => {        
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
      return user;
    }
    ),
  // Create a new user
  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return user;
    }
    ),
  // Update a user
  updateUser: publicProcedure
    .input(userUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return user;
    }
  ),
  // Delete a user
  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input }) => {     
      const user = await ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
      return user;
    }
  )
});
