/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { t } from './_app'

export const postRouter = t.router({
  // create
  add: t.procedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        title: z.string().min(1).max(32),
        text: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = ctx.prisma.post.create({
        data: input,
      })

      return post
    }),
  // read
  all: t.procedure.query(async ({ ctx }) =>
    ctx.prisma.post.findMany({ select: { id: true, title: true } })
  ),

  byId: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    const post = await ctx.prisma.post.findUnique({ where: { id: input } })

    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No post with id '${input}'`,
      })
    }

    return post
  }),

  // update
  edit: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: z.object({
          title: z.string().min(1).max(32),
          text: z.string().min(1),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input
      const post = await ctx.prisma.post.update({
        where: { id },
        data,
      })

      return post
    }),

  // delete
  delete: t.procedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input: id }) => {
      await ctx.prisma.post.delete({ where: { id } })

      return id
    }),
})
