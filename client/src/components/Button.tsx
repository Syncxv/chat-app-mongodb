import { motion } from 'framer-motion'
import { NextPage } from 'next'
import sizes from '../styles/base/_sizes.module.scss'
import { _Sizes, _sizes } from '../types'

interface ButtonProps {
    onClick?: Function
    text: string
    size: _sizes
}

export type NextPageWrapper = {
    Size: _Sizes
} & NextPage<ButtonProps>

const Button: NextPageWrapper = ({
    children,
    text,
    size,
    onClick = () => {}
}) => {
    console.log(sizes)
    return (
        <motion.button
            className={`btn ${sizes[size]}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => onClick(e)}
        >
            {text}
        </motion.button>
    )
}

Button.Size = {
    Icon: 'sizeIcon',
    Large: 'sizeLarge',
    Max: 'sizeMax',
    Medium: 'sizeMedium',
    Min: 'sizeMin',
    Small: 'sizeSmall',
    Tiny: 'sizeTiny',
    Xlarge: 'sizeXlarge'
}

export default Button
