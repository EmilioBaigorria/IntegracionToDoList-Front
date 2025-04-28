import { useState } from "react"
import { ModalCrearSprint } from "../../modals/ModalCrearSprint/modalCrearSprint"
import { ModalCrearTarea } from "../../modals/ModalCrearTarea/modalCrearTarea"
import { ModalEditarSprint } from "../../modals/ModalEditarSprint/modalEditarSprint"
import { ModalEditarTarea } from "../../modals/ModalEditarTarea/modalEditarTarea"
import { ModalVerSprint } from "../../modals/ModalVerSprint/modalVerSprint"
import { ModalVerTarea } from "../../modals/ModalVerTarea/modalVerTarea"
import { Backlog } from "../../ui/Backlog/Backlog"
import { Header } from "../../ui/Header/Header"
import { SprintList } from "../../ui/SprintList/SprintList"
import styles from "./Administration.module.css"


export const Administration = () => {

  //useState para tarea
  const [createTareaModal, setCreateTareaModal] = useState(false)
  const [editTareaModal, setEditTareaModal] = useState(false)
  const [verTareaModal, setVerTareaModal] = useState(false)

  //useState para sprint
  const [crearSprintModal, setCrearSprintModal] = useState(false)
  const [editarSprintModal, setEditarSprintModal] = useState(false)
  const [verSpringModal, setVerSprintModal] = useState(false)



  return (
    <div className={styles.mainAdminContainer}>
      {/*Modales de Tarea*/}
      <ModalCrearTarea
        isOpen={createTareaModal}
        onClose={() => setCreateTareaModal(false)}
      />
      <ModalEditarTarea
        isOpen={editTareaModal}
        onClose={() => setEditTareaModal(false)}
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
        <div>
          <Backlog
            setCreateTareaModal={setCreateTareaModal}
            setEditTareaModal={setEditTareaModal}
            setVerTareaModal={setVerTareaModal}
          />
        </div>
      </div>
    </div>
  )
}
