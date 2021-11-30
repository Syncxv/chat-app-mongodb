import { NextPage } from 'next'
import React from 'react'

interface InputProps { 
    label: string,
    onChange: Function,
    type?: React.HTMLInputTypeAttribute,

}

const Input : NextPage<InputProps> = ({label: placeholder, onChange, type}) => {
    return (
        <>
            <div className="input-wrapper">
                <label>{placeholder}</label>
                <input onChange={(e) => onChange(e)} className="input" type={type || "text"} />
            </div>
        </>
    )
}

export default Input
