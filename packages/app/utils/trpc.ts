import { createReactQueryHooks, createReactQueryHooksProxy } from '@trpc/react'
import type { AppRouter } from '@zart/api/routers/_app'

export const trpc = createReactQueryHooks<AppRouter>()
export const proxy = createReactQueryHooksProxy(trpc)
