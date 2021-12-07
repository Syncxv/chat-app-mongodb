import React, { useRef } from 'react'

interface InputProps {
    label: string
    onChange?: Function
    type?: React.HTMLInputTypeAttribute
    error?: { isError: boolean; message: string }
    ref?: any
}

const Input: React.FC<InputProps> = ({
    label,
    ref,
    onChange = () => {},
    type,
    error = { isError: false }
}) => {
    return (
        <>
            <div className="input-wrapper">
                <h5 className="input-label">{label}</h5>
                <input ref={ref} onChange={e => onChange(e)} className="input" type={type || 'text'} />
                {error.isError && <p className="error">{error.message}</p>}
            </div>
        </>
    )
}

export default Input
