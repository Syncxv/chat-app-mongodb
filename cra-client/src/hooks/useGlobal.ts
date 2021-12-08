import { useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalStateContext'

export const useGlobal = () => {
    return useContext(GlobalStateContext)
}
