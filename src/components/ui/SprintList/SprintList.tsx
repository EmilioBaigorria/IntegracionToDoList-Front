
import { useEffect, useState } from "react"
import { ISprint } from "../../../types/ISprint"
import { Button } from "../Button/Button"
import { SprintListCard } from "../SprintListCard/SprintListCard"
import styles from "./SprintList.module.css"
import { getALLSprints } from "../../../data/sprintController"
import { ModalCrearSprint } from "../../modals/ModalCrearSprint/modalCrearSprint"
import {ModalEditarSprint} from "../../modals/ModalEditarSprint/modalEditarSprint"
import { ModalVerSprint } from "../../modals/ModalVerSprint/modalVerSprint"
import { NavLink } from "react-router-dom"



export const SprintList = () => {

    const [crearSprintModal,setCrearSprintModal]=useState(false)
    const [editarSprintModal,setEditarSprintModal]=useState(false)
    const [verSpringModal,setVerSprintgModal]=useState(false)

    const [sprints,setSprints]=useState<ISprint[]>([])

    const getSpr=async()=>{
        const sprints=await getALLSprints()
        if(sprints){
            setSprints(sprints)
        }
    }
    useEffect(()=>{
        getSpr()
    },[])
    

  return (
    <div className={styles.mainContainer}>
        <ModalCrearSprint
        isOpen={crearSprintModal}
        onClose={()=>setCrearSprintModal(false)}
        />
        <ModalEditarSprint
        isOpen={editarSprintModal}
        onClose={()=>setEditarSprintModal(false)}
        />
        <ModalVerSprint
        isOpen={verSpringModal}
        onClose={()=>setVerSprintgModal(false)}
        />
        <div className={styles.mainContainer_contentContainer}>
            <div className={styles.buttonsContainer}>
                <NavLink to="/"><Button text="Backlog"  action={()=>{}}/></NavLink>
            </div>
            <div className={styles.contentContainer_sprintList_buttonSection}>
                <p>Sprints</p>
                <Button text="CrearSprint" action={()=>{setCrearSprintModal(true)}}/>
            </div>
            <div className={styles.sprintListContainer}>
            {sprints.map((sprint)=>(
                    <SprintListCard key={sprint.id}
                    sprint={sprint} 
                    setEditarSprintModal={setEditarSprintModal} 
                    setVerSprintgModal={setVerSprintgModal}/>
            ))}
            </div>
        </div>
        <div className={styles.bar}>
            {/*Barra*/}
        </div>
    </div>
  )
}
