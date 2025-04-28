import { FC } from "react"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { changeTaskStateOnSprint, deleteTaskInSprintById } from "../../../data/sprintController"
import { useTaskStore } from "../../../store/tareaStore"
import { ITask, State } from "../../../types/ITask"
import { Button } from "../Button/Button"
import styles from "./ColumTaskCard.module.css"
import { crearTarea } from "../../../data/taskController"
interface IColumTaskCard {
    task: ITask
    setEditarTareaModal: Function
    setVerTareaModal: Function
}
export const ColumTaskCard: FC<IColumTaskCard> = ({ task, setEditarTareaModal, setVerTareaModal }) => {
    
    let sprintId = useParams().sprintId

    const setTareaActiva = useTaskStore(state => state.setTareaActiva)

    const handleDelete = () => {
        Swal.fire({
            title: "¿Seguro?",
            text: "Esta accion no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed && sprintId) {
                deleteTaskInSprintById(task.id, sprintId)
                Swal.fire({
                    title: "¡Eliminado exitosamente!",
                    text: "La tarea fue eliminado exitosamente",
                    icon: "success",
                });
            }
        });
    }
    const handelChangeState = () => {
        if (task.estado !== State.terminado && sprintId) {
            changeTaskStateOnSprint(task.estado + 1, task, sprintId)
        }
        if (task.estado == State.terminado && sprintId) {
            deleteTaskInSprintById(task.id, sprintId)
        }
    }
    const handleMoveToBacklog=async ()=>{
        try {
            if(sprintId){
                const newtask=await crearTarea(task)
                console.log(newtask)
                await deleteTaskInSprintById(task.id,sprintId)
            }
        } catch (error) {
            console.log("Ocurrio un error al mover la tarea al backlog",error)
        }
    }
    return (

        <div className={styles.mainContainer}>
            <div className={styles.textContainer}>
                <p>{task.titulo}</p>
                <p>{task.descripcion}</p>
                <p>{task.fechaLimite}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <div className={styles.buttonsContainer_collection}>
                    <Button action={handleMoveToBacklog} text="mover a backlog" />
                    <Button action={handelChangeState} text={
                        task.estado == 0 ?
                            "mover a en proceso" :
                            task.estado == 1 ?
                                "mover a terminado" :
                                "Eliminar"
                    } />
                </div>
                <div className={styles.buttonsContainer_collection}>
                    <Button action={() => {
                        setTareaActiva(task)
                        setVerTareaModal(true)
                    }} icon={
                        <span className="material-symbols-outlined">
                            visibility
                        </span>
                    } />
                    <Button action={() => {
                        setTareaActiva(task)
                        setEditarTareaModal(true)
                    }} icon={
                        <span className="material-symbols-outlined">
                            edit
                        </span>
                    } />
                    <Button action={handleDelete} icon={
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                    } />
                </div>
            </div>
        </div>

    )
}
