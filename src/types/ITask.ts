export enum State{
    "pendiente",
    "activo",
    "terminado"
}

export interface ITask{
    _id?:string,
    id: string,
    titulo:string,
    descripcion:string,
    estado:State,
    fechaLimite:string
}