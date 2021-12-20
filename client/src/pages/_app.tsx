import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import router from 'next/router'
import SocketContextProvider from '../context/Socket/SocketContext'
function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient())
    axios.defaults.withCredentials = true
    axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            if (error.response.status === 401) {
                router.push('/login')
            }
            return error
        }
    )
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <SocketContextProvider>
                    <Component {...pageProps} />
                </SocketContextProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp
