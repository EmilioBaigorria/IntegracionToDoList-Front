import { FC } from "react"
import { ITask } from "../../../types/ITask"
import { ColumTaskCard } from "../ColumTaskCard/ColumTaskCard"
import styles from "./TaskListColum.module.css"
interface ITaskListColum {
    typeText: String
    tasks: ITask[]
    setEditarTareaModal: Function
    setVerTareaModal: Function
}
export const TaskListColum: FC<ITaskListColum> = ({ typeText, tasks, setEditarTareaModal, setVerTareaModal }) => {


    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainContainer_content}>
                <p>
                    {typeText}
                </p>
                <div className={styles.tasksContainer}>
                    {tasks && tasks.length > 0 ?
                        tasks.map((el) => (
                            <ColumTaskCard
                            setEditarTareaModal={setEditarTareaModal}
                            setVerTareaModal={setVerTareaModal}
                            key={el.id} task={el} />
                        )) : <p>Ningura esta asignada a este cuadrante</p>}
                </div>
            </div>
        </div>
    )
}
