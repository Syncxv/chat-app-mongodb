import { NextPage } from 'next'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFriend } from '../../../reducers/user'
import Input2 from '../../atoms/Input2'
import Text from '../../atoms/Text'

interface Props {}

const AddFriendSection: NextPage<Props> = ({}) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    return (
        <>
            <h1 className="text-2xl mb-4 mt-2">Add Friend</h1>
            <Text>ENTER A USERNAME aight</Text>
            <Input2 placeholder="hehe" onChange={e => setValue(e.target.value)} />
            <button onClick={() => console.log(value)} className="btn">
                Add Friend
            </button>
        </>
    )
}

export default AddFriendSection
