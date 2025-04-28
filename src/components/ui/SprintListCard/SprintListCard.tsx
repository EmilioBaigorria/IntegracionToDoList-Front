import { FC } from "react"
import { ISprint } from "../../../types/ISprint"
import styles from "./SprintListCard.module.css"
import { Button } from "../Button/Button"
import { activeSprintStore } from "../../../store/activeSprintStore"
import { useNavigate } from "react-router"



interface ISprintListCard{
    sprint:ISprint
    setEditarSprintModal:Function
    setVerSprintgModal:Function
}
export const SprintListCard:FC<ISprintListCard> = ({sprint,setEditarSprintModal,setVerSprintgModal}) => {
    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate(`/sprints/${sprint.id}`)
    }
  return (
    <div className={styles.mainContainer} onClick={handleNavigate}>
        <div className={styles.mainContainer_sprintInfoContainer}>
            <div>{/*Nombre del sprint*/}
                <p>{sprint.nombre}</p>
            </div>
            <div>{/*Fecha de inicio y fin*/}
                <p>{sprint.fechaInicio}</p>
                <p>{sprint.fechaCierre}</p>
            </div>
        </div>
        <div className={styles.mainContainer_buttonContainer}>{/*Botones*/}
            <Button action={()=>{setVerSprintgModal(true)}} icon={<span className="material-symbols-outlined">visibility</span>}/>
            <Button action={()=>{setEditarSprintModal(true)}} icon={<span className="material-symbols-outlined">edit</span>}/>
            <Button  action={()=>{}} icon={<span className="material-symbols-outlined">delete</span>} />
        </div>
    </div>
  )
}
