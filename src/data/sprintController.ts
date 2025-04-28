
import axios from "axios";
import { putSprint } from "../http/sprintRequest";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";
import { ITask, State } from "../types/ITask";

const apiUrl = import.meta.env.VITE_APIURL

export const getALLSprints = async (): Promise<ISprint[] | undefined> => {
    try {
        const response = await axios.get<ISprintList>(`${apiUrl}/sprintList`)
        return response.data.sprints

    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los sprints", error)
    }
}
export const getSprintById = async (sprintId: String): Promise<ISprint | undefined> => {
    try {
        const sprints = await getALLSprints()
        if (sprints) {
            const newSprintList = sprints.filter((el) =>
                el.id == sprintId
            )
            return newSprintList[0]
        }
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion del sprint de id", sprintId, error)
    }
}
export const crearSprint = async (newSprint: ISprint) => {
    try {
        newSprint.id = crypto.randomUUID()
        const sprints = await getALLSprints()
        if (sprints) {
            await putSprint([...sprints, newSprint])
        } else {
            await putSprint([newSprint])
        }
        return newSprint
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un nuevo sprint", error)
    }
}
export const eliminarSprintByID = async (sprintId: String) => {
    try {
        const sprints = await getALLSprints()
        if (sprints) {
            const newSprintList = sprints.filter((el) =>
                el.id !== sprintId
            )

            await putSprint(newSprintList)
            return newSprintList
        }
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un sprint", error)
    }
}
export const actualizarSprint = async (sprintActualizado: ISprint) => {
    try {
        const sprints = await getALLSprints()
        if (sprints) {
            const newSprintList = sprints.map((sprint) =>
                sprint.id == sprintActualizado.id ? { ...sprint, ...sprintActualizado } : sprint
            )
            await putSprint(newSprintList)
            return newSprintList
        }
        return null

    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un sprint", error)
    }

}
export const addTaskToSprint = async (newTask: ITask, sprintId: String) => {
    try {
        const sprint = await getSprintById(sprintId)
        if (sprint) {
            sprint.tareas.push(newTask)
            return await actualizarSprint(sprint)
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el añadido de una nueva tarea al sprint de id:", sprintId, error)
    }
}
export const updateTaskOnSprint = async (updatedTask: ITask, sprintId: String) => {
    try {
        const sprint = await getSprintById(sprintId)
        if (sprint) {
            const updatedTaskList = sprint.tareas.map((task) =>
                task.id == updatedTask.id ? { ...task, ...updatedTask } : task
            )
            sprint.tareas = updatedTaskList
            return await actualizarSprint(sprint)
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el añadido de una nueva tarea al sprint de id:", sprintId, error)
    }
}
export const deleteTaskInSprintById = async (taskId: String, sprintId: String) => {
    try {
        const sprint = await getSprintById(sprintId)
        if (sprint) {
            const updatedTaskList = sprint.tareas.filter((el) =>
                el.id !== taskId
            )
            sprint.tareas = updatedTaskList
            return await actualizarSprint(sprint)
        }
        return null
    } catch (error) {

    }
}
//Me di cuenta que esta funcion es redundante, updateTaskOnSprint hace lo mismo, la voy a dejar solo porque puede ser conveniente
export const changeTaskStateOnSprint = async (newState: State, taskToChange: ITask, sprintId: String) => {
    try {
        const sprint = await getSprintById(sprintId)
        if (sprint) {
            taskToChange.estado = newState
            const newTaskList = sprint.tareas.map((task) =>
                task.id == taskToChange.id ? { ...task, ...taskToChange } : task
            )
            sprint.tareas = newTaskList
            return await actualizarSprint(sprint)
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el añadido de una nueva tarea al sprint de id:", sprintId, error)
    }
}