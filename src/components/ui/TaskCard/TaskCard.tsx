import { FC, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { addTaskToSprint, getALLSprints } from "../../../data/sprintController"
import { eliminarTareaByID } from "../../../data/taskController"
import { useTaskStore } from "../../../store/tareaStore"
import { ISprint } from "../../../types/ISprint"
import { ITask } from "../../../types/ITask"
import { Button } from "../Button/Button"
import styles from "./TaskCard.module.css"

interface ITaskCard {
  data: ITask
  setEditTareaModal: Function
  setVerTareaModal: Function
}

export const TaskCard: FC<ITaskCard> = ({ data, setEditTareaModal, setVerTareaModal }) => {
  let date=new Date()
  const setActiveTask=useTaskStore(state=> state.setTareaActiva)
  const [sprints, setSprints] = useState<ISprint[]>([])
  const [selectedSprint, setSelectedSprint] = useState<string>("")
  const[color,setColor]=useState("")

  const setTaskActiva = useTaskStore(state => state.setTareaActiva)

  const getSprints = async () => {
    const sprintsList = await getALLSprints()
    if (sprintsList) {
      setSprints(sprintsList)
    }
  }

  useEffect(() => {
    getSprints()
    handleDateSignature()
  }, [sprints])

  const handleSprintChange = async (sprintId: string) => {
    setSelectedSprint(sprintId)
    if (sprintId) {
      await addTaskToSprint(data, sprintId)
      await eliminarTareaByID(data.id)
    }
  }
  const handleDelete = () => {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta accion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTareaByID(data.id)
        Swal.fire({
          title: "¡Eliminado exitosamente!",
          text: "La tarea fue eliminado exitosamente",
          icon: "success",
        });
      }
    });
  }
  const handleDateSignature=()=>{
    const dataDay=new Date(data.fechaLimite)
    const msPorDia=1000 * 60 * 60 * 24;
    const dateDiferenceMs=date.getTime()-dataDay.getTime()
    const dateDiference=Math.ceil(dateDiferenceMs/msPorDia)
    if(Math.abs(dateDiference)<3){
      setColor("#803D3D")
    }
  }

  return (
    <div style={{backgroundColor:color}} className={styles.mainContainer}>
      <div className={styles.leftDataContainer}>
        <p>
          Titulo: {data.titulo}
        </p>
        <p>
          Descripcion: {data.descripcion}
        </p>
      </div>
      <div className={styles.rightDataContainer}>
        <select
          value={selectedSprint}
          onChange={(e) => handleSprintChange(e.target.value)}
          className={styles.sprintSelector}
        >
          <option value="">Seleccionar Sprint</option>
          {sprints.map((sprint) => (
            <option key={sprint.id} value={sprint.id}>
              {sprint.nombre}
            </option>
          ))}
        </select>
        <Button action={() => { setVerTareaModal(true)
          setActiveTask(data)
         }} icon={<span className="material-symbols-outlined">visibility</span>} />
        <Button action={() => { setTaskActiva(data), setEditTareaModal(true)  }} icon={<span className="material-symbols-outlined">edit</span>} />
        <Button action={handleDelete} icon={<span className="material-symbols-outlined">delete</span>} />
      </div>
    </div>
  )
}
