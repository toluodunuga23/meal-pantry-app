import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const pantryRouter = createTRPCRouter({
  getIngredients: publicProcedure.query(async ({ ctx }) => {
    const pantry = await ctx.db.ingredient.findMany();
    return pantry;
  }),
});
