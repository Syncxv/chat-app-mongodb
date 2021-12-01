import { NextPage } from 'next'
import React from 'react'

interface LinkProps {
    href?: string
    onClick?: Function
}

const Link: NextPage<LinkProps> = ({ children, onClick = () => {}, href = '#' }) => {
    return (
        <a className="link" onClick={e => onClick(e)} href={href}>
            {children}
        </a>
    )
}
export const LinkP: NextPage<LinkProps> = ({ children, onClick = () => {} }) => {
    return (
        <p onClick={e => onClick(e)} className="link">
            {children}
        </p>
    )
}
export default Link
