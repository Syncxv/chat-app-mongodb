import { AnimatePresence } from 'framer-motion'
import { NextPage } from 'next'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { popModal } from '../reducers/modal'
import { AppState } from '../stores/store'

interface Props {}

const ModalLayer: NextPage<Props> = () => {
    const modals = useSelector((state: AppState) => state.modalStore.modals)
    const dispatch = useDispatch()
    return (
        <div className="modalLayer">
            <AnimatePresence>
                {modals.length &&
                    (() => {
                        const Modal = modals[0].modal
                        return <Modal onClick={() => dispatch(popModal())} />
                    })()}
            </AnimatePresence>
        </div>
    )
}

export default ModalLayer
