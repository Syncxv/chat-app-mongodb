import React from 'react'

interface LinkProps {
    href?: string
    onClick?: Function
}

const Link: React.FC<LinkProps> = ({ children, onClick = () => {}, href = '#' }) => {
    return (
        <a className="link" onClick={e => onClick(e)} href={href}>
            {children}
        </a>
    )
}
export const LinkP: React.FC<LinkProps> = ({ children, onClick = () => {} }) => {
    return (
        <p onClick={e => onClick(e)} className="link">
            {children}
        </p>
    )
}
export default Link
