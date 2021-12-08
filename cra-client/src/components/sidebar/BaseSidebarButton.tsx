interface BaseSideButtonProps {
    className?: string
    active: boolean
    onClick?: any
}
export const BaseSideButton: React.FC<BaseSideButtonProps> = ({
    className = '',
    children,
    active = false,
    onClick = () => {}
}) => {
    return (
        <>
            <div onClick={onClick} className={`sidebar-button ${className} ${active ? 'bg-selected' : ''}`}>
                {children}
            </div>
        </>
    )
}
