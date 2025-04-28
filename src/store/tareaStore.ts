import { create } from "zustand";
import { ITask } from "../types/ITask";

interface ITaskStore {
    tareaActiva: ITask | null,
    setTareaActiva: (tarea: ITask | null) => void
    deleteTareaActiva: () => void
}

export const useTaskStore = create<ITaskStore>((set)=>({
    tareaActiva: null,
    setTareaActiva: (tarea)=> set({tareaActiva: tarea}),
    deleteTareaActiva: () => set({tareaActiva: null})
}))