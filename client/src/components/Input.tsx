import { NextPage } from 'next'
import React from 'react'

interface InputProps { 
    placeholder: string,
    onChange: Function,

}

const Input : NextPage<InputProps> = ({placeholder, onChange}) => {
    return (
        <>
            <div className="input-wrapper">
                <label>{placeholder}</label>
                <input onChange={(e) => onChange(e)} className="input" type="text" />
            </div>
        </>
    )
}

export default Input
