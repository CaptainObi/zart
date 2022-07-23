import { createReactQueryHooks } from '@trpc/react'
import type { AppRouter } from '@zart/api/routers/_app'

export const trpc = createReactQueryHooks<AppRouter>()
