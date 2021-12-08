import React, { createContext, useState } from 'react'
interface Foo {
    [key: string]: number
}
const initVal = new Map()
export const GlobalStateContext = createContext<Map<any, any>>(initVal)
const GlobalStateContextProvider: React.FC = ({ children }) => {
    return <GlobalStateContext.Provider value={initVal}>{children}</GlobalStateContext.Provider>
}

export default GlobalStateContextProvider
