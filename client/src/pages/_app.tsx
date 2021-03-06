import '../styles/main.scss'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import axios from 'axios'
import router from 'next/router'
import SocketContextProvider from '../context/Socket/SocketContext'
import { Wrapper } from './login'
import { Provider } from 'react-redux'
import store from '../stores/store'
import SocketClient from '../context/Socket/SocketClient'
import ModalLayer from '../components/ModalLayer'

export const socketClient = new SocketClient()
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
            return Promise.reject(error)
        }
    )
    const isNotApp = (Component as Wrapper).isNotApp || false
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Provider store={store}>
                    {isNotApp ? (
                        <Component {...pageProps} />
                    ) : (
                        <SocketContextProvider>
                            <Component {...pageProps} />
                        </SocketContextProvider>
                    )}
                    <ModalLayer />
                </Provider>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp
