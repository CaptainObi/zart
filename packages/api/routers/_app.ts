/**
 * This file contains the root router of your tRPC-backend
 */
import superjson from 'superjson'
import { postRouter } from './post'

import { PrismaClient } from '@prisma/client'
import { initTRPC } from '@trpc/server'

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
})

// server/trpc.ts
type Context = {
  prisma: typeof prisma
}

export const t = initTRPC<{
  ctx: Context
}>()({
  /* optional */
  transformer: superjson,
  // errorFormatter: [...]
})

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = t.router({ post: postRouter })
/**
 * Optionally do custom error (type safe!) formatting
 * @link https://trpc.io/docs/error-formatting
 */
// .formatError(({ shape, error }) => { })

export type AppRouter = typeof appRouter
