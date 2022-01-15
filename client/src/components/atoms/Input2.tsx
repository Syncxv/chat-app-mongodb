import React from 'react'

interface Props {
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => any
}

const Input2: React.FC<Props> = ({ placeholder, onChange }) => {
    return (
        <>
            <div className="mb-3 pt-0">
                <input
                    onChange={onChange || (() => {})}
                    type="text"
                    placeholder={placeholder}
                    className="px-3 py-3 -placeholder-text-muted -text-text-normal relative -bg-channeltextarea-background rounded text-sm border-0 shadow outline-none focus:outline-none  -ring-primary w-full focus:ring-1"
                />
            </div>
        </>
    )
}

export default Input2
