import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { AuthContextProvider } from '../context/Auth/AuthContext'
import { wrapper } from '../context/Auth/AuthReducer'

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <AuthContextProvider>
                    <Component {...pageProps} />
                </AuthContextProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
export default wrapper.withRedux(MyApp)
