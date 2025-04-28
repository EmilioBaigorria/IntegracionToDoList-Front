import { useEffect, useState } from "react"
import styles from "./TaskListing.module.css"
import { TaskListColum } from "../TaskListColum/TaskListColum"
import { ISprint } from "../../../types/ISprint"
import { Button } from "../Button/Button"
import { useParams } from "react-router"
import { getSprintById } from "../../../data/sprintController"

export const TaskListing = () => {
    const initialValues: ISprint = {
        id: "none",
        fechaInicio: "none",
        fechaCierre: "none",
        nombre: "none",
        tareas: []
    }
    const [sprint, setSprint] = useState<ISprint>(initialValues)

    let sprintId = useParams().sprintId

    const getSprints = async (sprintId: string) => {
        try {
            if (sprintId) {
                const sprintValiue = await getSprintById(sprintId)
                if (sprintValiue) {
                    setSprint(sprintValiue)
                }
            }
        } catch (error) {
            console.log("Ocurrio un error durante la obtencion del sprint", error)
        }
    }
    useEffect(() => {
        if (sprintId) getSprints(sprintId)
    }, [sprintId])
    return (
        <div>
            {sprint.id != "none" ?
                <div className={styles.mainContainer}>
                    <div className={styles.contentContainer}>
                        <div className={styles.textButtonContainer}>
                            <p>{sprint?.nombre}</p>
                            <Button action={() => { }} text="Crear Tarea" />
                        </div>
                        <div className={styles.columsContainer}>
                            <TaskListColum typeText={"Pendiente"} tasks={sprint.tareas.filter((el) => el.estado == 0)} />
                            <TaskListColum typeText={"Activo"} tasks={sprint.tareas.filter((el) => el.estado == 1)} />
                            <TaskListColum typeText={"Terminado"} tasks={sprint.tareas.filter((el) => el.estado == 2)} />
                        </div>
                    </div>
                </div> : <p>Cargando...</p>}
        </div>
    )
}
