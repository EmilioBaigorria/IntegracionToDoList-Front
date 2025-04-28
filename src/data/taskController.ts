import axios from "axios";
import { ITask } from "../types/ITask";
import { putTask } from "../http/taskRequest";
import { IBacklog } from "../types/IBacklog";

const apiUrl=import.meta.env.VITE_APIURL

export const getALLTareas=async():Promise<ITask[]|undefined>=>{
    try {
        const response =await axios.get<IBacklog>(`${apiUrl}/backlog`)
        return response.data.tareas
        
    } catch (error) {
        console.log("Ocurrio un error durante la obtencion de todas las tareas",error)
    }
}
export const crearTarea=async(newTask:ITask)=>{
    try {
        const tareas=await getALLTareas()
        if(tareas){
            await putTask([...tareas,newTask])
        }else{
            await putTask([newTask])
        }
        return newTask
    } catch (error) {
        console.log("Ocurrio un error durante la creacion de una nueva tarea",error)
    }
}
export const eliminarTareaByID=async(taskId:string)=>{
    try {
        const tareas=await getALLTareas()
        if(tareas){
            const newBacklog=tareas.filter((el)=>
                el.id!==taskId
            )
            
            await putTask(newBacklog)
            return newBacklog
        } 
    } catch (error) {
        console.log("Ocurrio un error durante la eliminacion de una tarea",error)
    }
}

export const actualizarTarea=async(tareaActualizada:ITask)=>{
    try {
        const tareas=await getALLTareas()
        if(tareas){
            const newBacklog=tareas.map((tarea)=>
                tarea.id==tareaActualizada.id ? {...tarea,...tareaActualizada}: tarea
            )
            await putTask(newBacklog)
            return newBacklog
        }else{
            return null
        }
    } catch (error) {
        console.log("Ocurrio un error durante la actualizacion de una tarea",error)
    }
    
}