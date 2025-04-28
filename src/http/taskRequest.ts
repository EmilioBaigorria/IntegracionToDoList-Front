import axios from "axios";
import { ITask } from "../types/ITask";
import { IBacklog } from "../types/IBacklog";

const apiUrl=import.meta.env.VITE_APIURL

export const putTask=async(tareas:ITask[])=>{
    try {
        const response=await axios.put<IBacklog>(`${apiUrl}/backlog`,{tareas:tareas})  
        return response.data
    } catch (error) {
        console.log("Ocurrio un error añadiendo las tareas",error)
    }
}