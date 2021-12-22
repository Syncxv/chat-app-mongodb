import { NextPage } from 'next'
import ReactDOM from 'react-dom'
import React from 'react'
import { AnimatePresence } from 'framer-motion'
const ModalWrapper: NextPage<{ root: Element; Elem: NextPage<{ onClick: Function }> }> = ({ Elem, root }) => {
    return (
        <AnimatePresence initial={false} exitBeforeEnter={true}>
            <Elem onClick={() => ReactDOM.unmountComponentAtNode(root)} />
        </AnimatePresence>
    )
}
export const open = (Elem: NextPage<{ onClick: Function }>) => {
    if (typeof window !== undefined) {
        const root = document.querySelector('.modal-stuff-yk')
        ReactDOM.render(<ModalWrapper Elem={Elem} root={root!} />, root)
    }
}
