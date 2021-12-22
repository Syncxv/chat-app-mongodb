import { NextPage } from 'next'
import { MouseEvent, useState } from 'react'
import modalSizes from '../../styles/components/modal/sizes.module.scss'
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
                    className={`modal-outer ${modalSizes.sizeSmall}`}
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
            <div className="modal-content">{children}</div>
        </>
    )
}
const Header: NextPage = ({ children }) => {
    return (
        <>
            <div className="modal-header">{children}</div>
        </>
    )
}
const Footer: NextPage = ({ children }) => {
    return (
        <>
            <div className="modal-footer">{children}</div>
        </>
    )
}
Modal.Content = Content
Modal.Header = Header
Modal.Footer = Footer
export default Modal
