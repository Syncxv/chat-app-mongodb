import React from 'react'

interface Props {}

const Text: React.FC<Props> = ({ children }) => {
    return <div className="text-text-normal">{children}</div>
}

export default Text
