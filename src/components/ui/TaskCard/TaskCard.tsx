import { FC } from "react"
import styles from "./TaskCard.module.css"
import { Button } from "../Button/Button"
import { ITask } from "../../../types/ITask"
interface ITaskCard{
    data:ITask
    setEditTareaModal:Function
    setVerTareaModal:Function
}
export const TaskCard:FC<ITaskCard> = ({data,setEditTareaModal,setVerTareaModal}) => {
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftDataContainer}>
        <p>
          Titulo:{data.titulo}
        </p>
        <p>
          Descripcion:{data.descripcion}
        </p>
      </div>
      <div className={styles.rightDataContainer}>
        <Button text="Enviar a" action={()=>{}}/>
        <p>dropdown</p>
        <Button action={()=>{setVerTareaModal(true)}} icon={<span className="material-symbols-outlined">visibility</span>}/>
        <Button action={()=>{setEditTareaModal(true)}} icon={<span className="material-symbols-outlined">edit</span>}/>
        <Button  action={()=>{}} icon={<span className="material-symbols-outlined">delete</span>} />
      </div>
    </div>
  )
}
