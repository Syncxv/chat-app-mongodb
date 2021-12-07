import { motion } from 'framer-motion'
import React, { MouseEvent } from 'react'
import sizes from '../styles/base/_sizes.module.scss'
import { _Sizes, _sizes } from '../types'

interface ButtonProps {
    onClick?: Function
    text: string
    size: _sizes
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset' | undefined
    className?: string
}

export type NextPageWrapper = {
    Size: _Sizes
} & React.FC<ButtonProps>

const Button: NextPageWrapper = ({
    children,
    text,
    size,
    disabled,
    className = '',
    onClick = () => {},
    type = 'button'
}) => {
    return (
        <motion.button
            className={`btn ${sizes[size]} ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => onClick(e)}
            disabled={disabled || false}
            type={type}
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
