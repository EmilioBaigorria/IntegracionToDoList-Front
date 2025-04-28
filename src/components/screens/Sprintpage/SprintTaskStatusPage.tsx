import { useState } from "react"
import { ModalCrearSprint } from "../../modals/ModalCrearSprint/modalCrearSprint"
import { ModalCrearTarea } from "../../modals/ModalCrearTarea/modalCrearTarea"
import { ModalEditarSprint } from "../../modals/ModalEditarSprint/modalEditarSprint"
import { ModalEditarTarea } from "../../modals/ModalEditarTarea/modalEditarTarea"
import { ModalVerSprint } from "../../modals/ModalVerSprint/modalVerSprint"
import { ModalVerTarea } from "../../modals/ModalVerTarea/modalVerTarea"
import { Header } from "../../ui/Header/Header"
import { SprintList } from "../../ui/SprintList/SprintList"
import { TaskListing } from "../../ui/TaskListing/TaskListing"
import styles from "./SprintTaskStatusPage.module.css"

export const SprintTaskStatusPage = () => {

    //UseState para Sprints
    const [crearSprintModal, setCrearSprintModal] = useState(false)
    const [editarSprintModal, setEditarSprintModal] = useState(false)
    const [verSpringModal, setVerSprintModal] = useState(false)

    //UseState para Tareas
    const [crearTareaModal, setCrearTareaModal] = useState(false)
    const [editarTareaModal, setEditarTareaModal] = useState(false)
    const [verTareaModal, setVerTareaModal] = useState(false)

    return (
        <div className={styles.mainAdminContainer}>
            {/*Modales de de columnas*/}
            <ModalCrearTarea
                isOpen={crearTareaModal}
                onClose={() => setCrearTareaModal(false)}
            />
            <ModalEditarTarea
                isOpen={editarTareaModal}
                onClose={() => setEditarTareaModal(false)}
            />
            <ModalVerTarea
                isOpen={verTareaModal}
                onClose={() => setVerTareaModal(false)}
            />

            {/*Modales de sprint*/}
            <ModalCrearSprint
                isOpen={crearSprintModal}
                onClose={() => setCrearSprintModal(false)}
            />
            <ModalEditarSprint
                isOpen={editarSprintModal}
                onClose={() => setEditarSprintModal(false)}
            />
            <ModalVerSprint
                isOpen={verSpringModal}
                onClose={() => setVerSprintModal(false)}
            />
            <div>
                <Header />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.contentContainer_sprintList}>
                    <SprintList
                        setCrearSprintModal={setCrearSprintModal}
                        setEditarSprintModal={setEditarSprintModal}
                        setVerSprintModal={setVerSprintModal}
                    />
                </div>
                <div className={styles.contentContainer_taskListing}>
                    <TaskListing
                        setCrearTareaModal={setCrearTareaModal}
                        setEditarTareaModal={setEditarTareaModal}
                        setVerTareaModal={setVerTareaModal}
                    />
                </div>
            </div>
        </div>
    )
}
