import { useState } from 'react'

const useModal = (init: boolean): { isOpen: boolean; close: Function; open: Function; setOpen: Function } => {
    const [isOpen, setOpen] = useState(init)
    const close = () => setOpen(false)
    const open = () => setOpen(true)
    return { isOpen, setOpen, close, open }
}

export default useModal
