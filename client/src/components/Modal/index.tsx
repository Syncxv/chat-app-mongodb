import { NextPage } from 'next'
import { MouseEvent, useState } from 'react'
import { X } from '../icons/X'
import { Backdrop } from './Backdrop'
interface ModalProps {
    onClick: Function
}
type modalWrapper<P = {}> = NextPage<P> & {
    Content: NextPage
    Header: NextPage
    Footer: NextPage
}
const Modal: modalWrapper<ModalProps> = ({ onClick, children }) => {
    return (
        <>
            <Backdrop onClick={(e: MouseEvent<HTMLDivElement, MouseEvent>) => onClick(e)}>
                <div
                    onClick={e =>
                        /* https://stackoverflow.com/a/10554459 */
                        e.stopPropagation()
                    }
                    className="modal-outer"
                >
                    {children}
                </div>
            </Backdrop>
        </>
    )
}
const Content: NextPage = ({ children }) => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}
const Header: NextPage = ({ children }) => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}
const Footer: NextPage = ({ children }) => {
    return (
        <>
            <div>{children}</div>
        </>
    )
}
Modal.Content = Content
Modal.Header = Header
Modal.Footer = Footer
export default Modal
