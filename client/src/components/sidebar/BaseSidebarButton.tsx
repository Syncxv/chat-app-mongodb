import { NextPage } from "next"
interface BaseSideButtonProps {
    className?: string,
    active: boolean
}
export const BaseSideButton : NextPage<BaseSideButtonProps> = ({className = '',children,active = false}) => {
    return (
      <>
        <div
          className={`sidebar-button flex gap-2 w-full max-h-40 p-1 rounded-md items-center ${className} ${active ? 'bg-selected' : ''}`}
        >
          {children}
        </div>
      </>
    )
  }