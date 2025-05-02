import axios from "axios";
import { putTask } from "../http/taskRequest";
import { IBacklog } from "../types/IBacklog";
import { ITask } from "../types/ITask";

const apiUrl=import.meta.env.VITE_APIURL

export const getALLTareas=async():Promise<ITask[]|undefined>=>{
    try {
        const response =await axios.get(`${apiUrl}/backlog`)
        return response.data[0].tareas
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las tareas",error)
    }
}
export const crearTarea=async(newTask:ITask)=>{
    try {
        let response
        if(!newTask._id){
            response =await axios.post(`${apiUrl}/task`,newTask)
        }else{
            response=await axios.get(`${apiUrl}/task/byId/${newTask._id}`)
        }
        
        const backlogResponse=await axios.put(`${apiUrl}/backlog/addTask/${response.data._id}`,response.data)
        if(response && backlogResponse){
            return response.data
        }
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una nueva tarea",error)
    }
}
export const eliminarTareaByID=async(taskId:string)=>{
    try {
        const response =await axios.delete<IBacklog>(`${apiUrl}/backlog/deleteTask/${taskId}`)
        if(response){
            return response.data
        } 
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una tarea",error)
    }
}

export const actualizarTarea=async(tareaActualizada:ITask)=>{
    try {
        const response =await axios.put<ITask>(`${apiUrl}/task/updateById/${tareaActualizada._id}`,tareaActualizada)
        if(response){
            return response.data
        }else{
            return null
        }
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de una tarea",error)
    }
    
}