import { useState } from 'react'
import { trpc } from '../utils/trpc'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import superjson from 'superjson'

export function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new queryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      // todo add localhost
      url: `${''}/api/trpc`,

      async headers() {
        return {}
      },
      transformer: superjson,
    })
  )

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <NavigationProvider>
        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </trpc.Provider>
  )
}
