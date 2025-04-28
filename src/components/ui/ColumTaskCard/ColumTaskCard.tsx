import { FC } from "react"
import styles from "./ColumTaskCard.module.css"
import { ITask } from "../../../types/ITask"
import { Button } from "../Button/Button"
interface IColumTaskCard {
    task: ITask
}
export const ColumTaskCard: FC<IColumTaskCard> = ({ task }) => {

    return (

        <div className={styles.mainContainer}>
            <div className={styles.textContainer}>
                <p>{task.titulo}</p>
                <p>{task.descripcion}</p>
                <p>{task.fechaLimite}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.buttonsContainer_collection}>
                <Button action={()=>{}} text="mover a backlog"/>
                <Button action={()=>{}} text={
                    task.estado==0?
                    "mover a en proceso":
                    task.estado==1?
                    "mover a terminado":
                    "Eliminar"
                }/>
                </div>
                <div className={styles.buttonsContainer_collection}>
                <Button action={()=>{}} icon={
                    <span className="material-symbols-outlined">
                    visibility
                    </span>
                }/>
                <Button action={()=>{}} icon={
                    <span className="material-symbols-outlined">
                    edit
                    </span>
                }/>
                <Button action={()=>{}} icon={
                    <span className="material-symbols-outlined">
                    delete
                    </span>
                }/>
                </div>
            </div>
        </div>

    )
}
