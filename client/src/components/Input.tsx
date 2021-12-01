import { NextPage } from 'next'
import React from 'react'

interface InputProps {
    label: string
    onChange: Function
    type?: React.HTMLInputTypeAttribute
    error?: { isError: boolean; message: string }
}

const Input: NextPage<InputProps> = ({ label, onChange, type, error = { isError: false } }) => {
    return (
        <>
            <div className="input-wrapper">
                <h5 className="input-label">{label}</h5>
                <input onChange={e => onChange(e)} className="input" type={type || 'text'} />
                {error.isError && <p className="error">{error.message}</p>}
            </div>
        </>
    )
}

export default Input
