import { NextPage } from 'next'
import { MouseEvent, useState } from 'react'
import modalSizes from '../../styles/components/modal/sizes.module.scss'
import { Backdrop } from './Backdrop'
interface ModalProps {
    onClick: Function
    size?: string
}
export const ModalSizes = {
    Small: modalSizes.sizeSmall,
    Medium: modalSizes.sizeMedium,
    Large: modalSizes.sizeLarge
}
type modalWrapper<P = {}> = NextPage<P> & {
    Content: NextPage
    Header: NextPage
    Footer: NextPage
    Sizes: typeof ModalSizes
}
const Modal: modalWrapper<ModalProps> = ({ onClick, children, size = ModalSizes.Small }) => {
    return (
        <>
            <Backdrop onClick={(e: MouseEvent<HTMLDivElement, MouseEvent>) => onClick(e)}>
                <div
                    onClick={e =>
                        /* https://stackoverflow.com/a/10554459 */
                        e.stopPropagation()
                    }
                    className={`modal-outer`}
                >
                    <div className={`modal ${size}`}>{children}</div>
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
Modal.Sizes = ModalSizes
export default Modal
