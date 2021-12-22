import { NextPage } from 'next'
import ReactDOM from 'react-dom'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
import useModal from '../hooks/useModal'
const ModalWrapper: NextPage<{ root: Element; Elem: NextPage<{ onClick: Function }> }> = ({ Elem, root }) => {
    const { isOpen, close } = useModal(true)
    return (
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => ReactDOM.unmountComponentAtNode(root)}
        >
            {isOpen && <Elem onClick={() => close()} />}
        </AnimatePresence>
    )
}
export const open = (Elem: NextPage<{ onClick: Function }>) => {
    if (typeof window !== undefined) {
        const root = document.querySelector('.modal-stuff-yk')
        ReactDOM.render(<ModalWrapper Elem={Elem} root={root!} />, root)
    }
}
