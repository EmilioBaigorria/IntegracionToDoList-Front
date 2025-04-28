import { FC } from "react"
import styles from "./Button.module.css"

interface IButton {
    text?: string
    action: VoidFunction
    icon?: any
    className?: string
}

export const Button: FC<IButton> = ({text, action, icon, className}) => {
    const useAction = () => {
        action()
    }
    return (
        <button 
            className={`${styles.button} ${className || ''}`} 
            onClick={useAction}
        >
            {icon || text}
        </button>
    )
}
