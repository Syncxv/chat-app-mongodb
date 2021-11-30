import { motion } from 'framer-motion'
import { NextPage } from 'next'
import sizes from '../styles/base/_sizes.module.scss'
interface shit {
    sizeIcon: 'sizeIcon'
    sizeLarge: 'sizeLarge'
    sizeMax: 'sizeMax'
    sizeMedium: 'sizeMedium'
    sizeMin: 'sizeMin'
    sizeSmall: 'sizeSmall'
    sizeTiny: 'sizeTiny'
    sizeXlarge: 'sizeXlarge'
}
export type _sizes =
    | 'sizeIcon'
    | 'sizeLarge'
    | 'sizeMax'
    | 'sizeMedium'
    | 'sizeMin'
    | 'sizeSmall'
    | 'sizeTiny_'
    | 'sizeXlarge'
interface ButtonProps {
    onClick?: Function
    text: string
    size: _sizes
}

type NextPageWrapper = {
    Size: typeof sizes
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
            onClick={onClick}
        >
            {text}
        </motion.button>
    )
}

Button.Size = {
    sizeIcon: 'sizeIcon',
    sizeLarge: 'sizeLarge',
    sizeMax: 'sizeMax',
    sizeMedium: 'sizeMedium',
    sizeMin: 'sizeMin',
    sizeSmall: 'sizeSmall',
    sizeTiny: 'sizeTiny',
    sizeXlarge: 'sizeXlarge'
}

export default Button
