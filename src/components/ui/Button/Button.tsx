import { FC } from "react"
import styles from "./Button.module.css"


interface IButton{
    text?:string
    action:VoidFunction
    icon?:any
}
export const Button:FC<IButton> = ({text,action,icon}) => {
    const useAction=()=>{
        action()
    }
  return (
    <div>
        <button className={styles.button} onClick={useAction}>{text}{icon}</button>
    </div>
  )
}
