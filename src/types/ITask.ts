export enum State{
    "pendiente",
    "activo",
    "terminado"
}

export interface ITask{
    id: string,
    titulo:string,
    descripcion:string,
    estado:State,
    fechaLimite:string
}