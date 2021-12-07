import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Landing'
import './styles/main.scss'
import pages from './pages'

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            {Object.values(pages).map(Page => {
                console.log(pages)
                return <Route key={Page.name} path={Page.name.toLowerCase()} element={<Page />} />
            })}
        </Routes>
    </Router>,
    document.getElementById('root')
)
