import { useContext } from 'react'
import { AuthContext } from '../context/Auth/AuthContext'
// IS ERROR BECASUE HOOKS CANT BE USED OUTSIDE REACT COMPONENTS
export const getAcessToken = () => {
    const { accessToken } = useContext(AuthContext)
    return accessToken || false
}
