import { ITask } from "./ITask";

export interface ISprint{
    _id?:string,
    id:string,
    nombre:string,
    fechaInicio:string,
    fechaCierre:string,
    tareas:ITask[]
}