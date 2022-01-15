import { NextPage } from 'next'
import React from 'react'
import Text from '../../atoms/Text'

interface Props {}

const AddFriendSection: NextPage<Props> = ({}) => {
    return (
        <>
            <h1 className="text-2xl mb-4 mt-2">Add Friend</h1>
            <Text>ENTER A USERNAME aight</Text>
        </>
    )
}

export default AddFriendSection
