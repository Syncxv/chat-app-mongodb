import React from 'react'
import Main from '../../../components/Main'
import useSocket from '../../../hooks/useSocket'

const index = () => {
    const [_, socket] = useSocket()
    return <Main socket={socket} />
}

export default index
