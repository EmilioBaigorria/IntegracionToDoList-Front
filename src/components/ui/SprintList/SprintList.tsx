import { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { getALLSprints } from "../../../data/sprintController"
import { ISprint } from "../../../types/ISprint"

import { Button } from "../Button/Button"
import { SprintListCard } from "../SprintListCard/SprintListCard"
import styles from "./SprintList.module.css"

interface ISprintLIst {
    setCrearSprintModal: Function

    setEditarSprintModal: Function

    setVerSprintModal: Function

}
export const SprintList: FC<ISprintLIst> = ({ setCrearSprintModal, setEditarSprintModal, setVerSprintModal }) => {

    const [sprints, setSprints] = useState<ISprint[]>([])

    const getSpr = async () => {
        const sprints = await getALLSprints()
        if (sprints) {
            setSprints(sprints)
        }
    }
    useEffect(() => {
        getSpr()
    }, [sprints])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainContainer_contentContainer}>
                <div className={styles.buttonsContainer}>
                    <NavLink to="/"><Button text="Backlog" action={() => { }} /></NavLink>
                </div>
                <div className={styles.contentContainer_sprintList_buttonSection}>
                    <p>Sprints</p>
                    <Button text="Crear Sprint" action={() => { setCrearSprintModal(true) }} />
                </div>
                <div className={styles.sprintListContainer}>
                    {sprints.map((sprint) => (
                        <SprintListCard
                            key={sprint.id}
                            sprint={sprint}
                            setEditarSprintModal={setEditarSprintModal}
                            setVerSprintgModal={setVerSprintModal}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.bar}>
                {/*Barra*/}
            </div>
        </div>
    )
}
