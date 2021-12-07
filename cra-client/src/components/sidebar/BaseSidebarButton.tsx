interface BaseSideButtonProps {
    className?: string
    active: boolean
}
export const BaseSideButton: React.FC<BaseSideButtonProps> = ({
    className = '',
    children,
    active = false
}) => {
    return (
        <>
            <div className={`sidebar-button ${className} ${active ? 'bg-selected' : ''}`}>{children}</div>
        </>
    )
}
