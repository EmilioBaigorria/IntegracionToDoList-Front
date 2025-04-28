import axios from "axios";
import { ISprintList } from "../types/ISprintList";
import { ISprint } from "../types/ISprint";

const apiUrl=import.meta.env.VITE_APIURL

export const putSprint=async(sprints:ISprint[])=>{
    try {
        const response=await axios.put<ISprintList>(`${apiUrl}/sprintList`,{sprints:sprints})  
        return response.data
    } catch (error) {
        console.log("Ocurrio un error añadiendo las sprints",error)
    }
}