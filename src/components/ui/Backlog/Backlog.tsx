import { useEffect, useState } from "react"
import { ModalCrearTarea } from "../../modals/ModalCrearTarea/modalCrearTarea"
import { Button } from "../Button/Button"
import { TaskCard } from "../TaskCard/TaskCard"
import styles from "./Backlog.module.css"
import { getALLTareas } from "../../../data/taskController"
import { ITask } from "../../../types/ITask"
import { ModalEditarTarea } from "../../modals/ModalEditarTarea/modalEditarTarea"
import { ModalVerTarea } from "../../modals/ModalVerTarea/modalVerTarea"


export const Backlog = () => {
    /*Use 3 use state para el manejo de los modales pero creo que valdria la pena consirar cambarlo por un unico use state que contenga un objeto,
    este objeto contendria la informacion del estados de los modales */
    const [createTareaModal, setCreateTareaModal] = useState(false)
    const [editTareaModal, setEditTareaModal] = useState(false)
    const [verTareaModal, setVerTareaModal] = useState(false)

    const [taskList,setTaskList]=useState<ITask[]>([])

    const getTareas=async()=>{
        const task=await getALLTareas()
        if(task){
            setTaskList(task)
        }
    }
    useEffect(()=>{
        getTareas()
    },[])
    return (
        <div className={styles.mainBacklogContainer}>
            <ModalCrearTarea
                isOpen={createTareaModal}
                onClose={()=>setCreateTareaModal(false)}
            />
            <ModalEditarTarea
                isOpen={editTareaModal}
                onClose={()=>setEditTareaModal(false)}
            />
            <ModalVerTarea
                isOpen={verTareaModal}
                onClose={()=>setVerTareaModal(false)}
            />
            <div>
                <div>
                    Backlog
                </div>
                <div className={styles.buttonContainer}>
                    <div>
                        Tareas
                    </div>
                    <Button text="Crear Tarea" action={()=>setCreateTareaModal(true)} />
                </div>
            </div>
            <div className={styles.taskListContainer}>
                {taskList.map((el) => (
                    <TaskCard data={el} key={el.id} 
                    setEditTareaModal={setEditTareaModal} 
                    setVerTareaModal={setVerTareaModal} />
                ))}
            </div>
        </div>
    )
}
