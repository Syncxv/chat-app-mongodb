import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import './styles/main.scss'
import pages from './pages'
import AuthContextProvider from './context/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryCache } from 'react-query'

const queryCache = new QueryCache({
    onError: error => {
        console.log(error)
    },
    onSuccess: data => {
        console.log(data)
    }
})
export const QueryCacheContext = createContext(queryCache)
const queryClient = new QueryClient()
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <QueryCacheContext.Provider value={queryCache}>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path={'/app/channels/:type/:id'}
                        element={<AuthContextProvider>{<pages.App />}</AuthContextProvider>}
                    ></Route>
                    <Route
                        path="/login"
                        element={<AuthContextProvider>{<pages.Login />}</AuthContextProvider>}
                    ></Route>
                </Routes>
            </Router>
        </QueryCacheContext.Provider>
    </QueryClientProvider>,
    document.getElementById('root')
)
