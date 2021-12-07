import axios, { AxiosRequestConfig } from 'axios'
import router from 'next/router'
import { useContext } from 'react'
import { apiUrl } from '../../constants'
import { AuthContext } from '../../context/Auth/AuthContext'

const useRequest = async (path: string, options: AxiosRequestConfig = { method: 'GET' }) => {
    const { token } = useContext(AuthContext)
    console.log(token)
    if (!token) {
        return router.push('/login')
    }
    const res = await axios({
        url: `${apiUrl}/${path}`,
        headers: {
            Authorization: token
        },
        ...options
    })
    return res.data
}

export default useRequest
