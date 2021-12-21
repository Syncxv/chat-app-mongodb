import { motion } from 'framer-motion'
import { NextPage } from 'next'

interface BackdropProps {
    onClick: Function
}
export const Backdrop: NextPage<BackdropProps> = ({ children, onClick }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={e => onClick(e)}
        >
            {children}
        </motion.div>
    )
}
