import React from 'react'
import { useDispatch } from 'react-redux'
import { clearError, ErrorType } from '../../reducers/user'

interface Props {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
    error?: ErrorType
}

const Input2: React.FC<Props> = ({ placeholder, onChange, error }) => {
    const dispatch = useDispatch()
    const isAddFriendError = error?.feild === 'add-friend'
    return (
        <>
            <div className="mb-3 pt-0">
                <input
                    onChange={e => {
                        if (isAddFriendError) dispatch(clearError())
                        onChange(e)
                    }}
                    type="text"
                    placeholder={placeholder}
                    className={`input2 ${
                        isAddFriendError ? 'ring-1 ring-red-500' : '-ring-primary'
                    }  w-full focus:ring-1`}
                />
                {error && <p className="text-sm font-light text-red-500 mt-2">{error.message}</p>}
            </div>
        </>
    )
}

export default Input2
