import { NextPage } from 'next'
import React from 'react'
import { createContext } from 'react'

interface ParamsContext {
    params: {
        cid: string
    }
}
export const ParamsContext = createContext<ParamsContext>({ params: { cid: '' } })
const ParamsProvider: NextPage<{ params: { cid: string } }> = ({ params, children }) => {
    return <ParamsContext.Provider value={{ params }}>{children}</ParamsContext.Provider>
}

export default ParamsProvider
