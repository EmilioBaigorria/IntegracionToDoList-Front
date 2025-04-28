import { FC, useEffect, useState } from "react"
import { getALLTareas } from "../../../data/taskController"
import { ITask } from "../../../types/ITask"
import { Button } from "../Button/Button"
import { TaskCard } from "../TaskCard/TaskCard"
import styles from "./Backlog.module.css"
interface IBacklog{
    setCreateTareaModal:Function
    setEditTareaModal:Function
    setVerTareaModal:Function
}
export const Backlog:FC<IBacklog> = ({setCreateTareaModal,setEditTareaModal,setVerTareaModal}) => {
    const [taskList, setTaskList] = useState<ITask[]>([])

    const getTareas = async () => {
        const task = await getALLTareas()
        if (task) {
            setTaskList(task)
        }
    }

    useEffect(() => {
        getTareas()
    }, [taskList])

    return (
        <div className={styles.mainBacklogContainer}>
            
            <div className={styles.headerContainer}>
                <h1 className={styles.title}>Backlog</h1>
                <div className={styles.buttonContainer}>
                    <span className={styles.sectionTitle}>Tareas</span>
                    <Button 
                        text="Crear Tarea" 
                        action={() => setCreateTareaModal(true)} 
                        className={styles.createButton}
                    />
                </div>
            </div>

            <div className={styles.taskListContainer}>
                {taskList.map((task) => (
                    <TaskCard 
                        key={task.id}
                        data={task}
                        setEditTareaModal={setEditTareaModal}
                        setVerTareaModal={setVerTareaModal}
                    />
                ))}
            </div>
        </div>
    )
}
