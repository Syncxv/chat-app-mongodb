import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import './styles/main.scss'
import pages from './pages'
import AuthContextProvider from './context/AuthContext'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/app"
                    element={<AuthContextProvider>{<pages.App />}</AuthContextProvider>}
                ></Route>
                <Route
                    path="/login"
                    element={<AuthContextProvider>{<pages.Login />}</AuthContextProvider>}
                ></Route>
            </Routes>
        </Router>
    </QueryClientProvider>,
    document.getElementById('root')
)
