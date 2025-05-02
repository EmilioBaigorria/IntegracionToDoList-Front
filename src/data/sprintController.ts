
import axios from "axios";
import { putSprint } from "../http/sprintRequest";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";
import { ITask, State } from "../types/ITask";

const apiUrl = import.meta.env.VITE_APIURL

export const getALLSprints = async (): Promise<ISprint[] | undefined> => {
    try {
        const response = await axios.get<ISprint[]>(`${apiUrl}/sprints`)
        return response.data

    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todos los sprints", error)
    }
}
export const getSprintById = async (sprintId: String): Promise<ISprint | undefined> => {
    try {
        const response = await axios.get<ISprint>(`${apiUrl}/sprints/byId/${sprintId}`)
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion del sprint de id", sprintId, error)
    }
}
export const crearSprint = async (newSprint: ISprint) => {
    try {
        const response = await axios.post<ISprint>(`${apiUrl}/sprints`,newSprint)
        if(response){
            return response.data
        }
        return "Ocurrio un error"
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de un nuevo sprint", error)
    }
}
export const eliminarSprintByID = async (sprintId: String) => {
    try {
        const response = await axios.delete<ISprint>(`${apiUrl}/sprints/deleteById/${sprintId}`)
        if (response) {
            return response.data
        }
        return "Ocurrio un error"
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de un sprint", error)
    }
}
export const actualizarSprint = async (sprintActualizado: ISprint) => {
    try {
        const response = await axios.put<ISprint>(`${apiUrl}/sprints/updateById/${sprintActualizado._id}`,sprintActualizado)
        if (response) {
            return response.data
        }
        return null

    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de un sprint", error)
    }

}
export const addTaskToSprint = async (newTask: ITask, sprintId: String) => {
    try {
        const response = await axios.put<ISprint>(`${apiUrl}/sprints/${sprintId}/addTask/${newTask._id}`,newTask)
        if (response) {
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el añadido de una nueva tarea al sprint de id:", sprintId, error)
    }
}
export const updateTaskOnSprint = async (updatedTask: ITask, sprintId: String) => {
    try {
        const response = await axios.put<ITask>(`${apiUrl}/task/updateById/${updatedTask._id}`,updatedTask)
        if (response) {
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el añadido de una nueva tarea al sprint de id:", sprintId, error)
    }
}
export const deleteTaskInSprintById = async (taskId: String, sprintId: String) => {
    try {
        const response = await axios.delete<ISprint>(`${apiUrl}/sprints/${sprintId}/deleteTask/${taskId}`)
        if (response) {
            return response.data
        }
        return null
    } catch (error) {

    }
}
//Me di cuenta que esta funcion es redundante, updateTaskOnSprint hace lo mismo, la voy a dejar solo porque puede ser conveniente
export const changeTaskStateOnSprint = async (newState: string, taskToChange: ITask, sprintId: String) => {
    try {
        console.log(`${apiUrl}/sprints/changeTaskState/${taskToChange._id}/${newState}`)
        const response = await axios.put<ITask>(`${apiUrl}/sprints/changeTaskState/${taskToChange._id}/${newState}`,taskToChange)
        if (response) {
            return response.data
        }
        return null
    } catch (error) {
        console.log("Ocurrio un error durante el cambio de estado de una tarea:", error)
    }
}