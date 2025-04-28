import { FC } from "react"
import { useNavigate } from "react-router"
import { activeSprintStore } from "../../../store/activeSprintStore"
import { ISprint } from "../../../types/ISprint"
import { Button } from "../Button/Button"
import styles from "./SprintListCard.module.css"
import Swal from "sweetalert2"
import { eliminarSprintByID } from "../../../data/sprintController"



interface ISprintListCard {
    sprint: ISprint
    setEditarSprintModal: Function
    setVerSprintgModal: Function
}
export const SprintListCard: FC<ISprintListCard> = ({ sprint, setEditarSprintModal, setVerSprintgModal }) => {
    const navigate = useNavigate()
    const setActiveSprint = activeSprintStore(state => state.setActiveSprint)

    const handleNavigate = () => {
        navigate(`/sprints/${sprint.id}`)
        setActiveSprint(sprint)
    }
    
    const handleDelete =() => {
        Swal.fire({
            title: "¿Seguro?",
            text: "Esta accion no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText:"Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarSprintByID(sprint.id)
                Swal.fire({
                    title: "¡Eliminado exitosamente!",
                    text: "El sprint fue eliminado exitosamente",
                    icon: "success",
                });
            }
        });
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
                <Button action={() => { setVerSprintgModal(true) }} icon={<span className="material-symbols-outlined">visibility</span>} />
                <Button action={() => { setEditarSprintModal(true) }} icon={<span className="material-symbols-outlined">edit</span>} />
                <Button action={handleDelete} icon={<span className="material-symbols-outlined">delete</span>} />
            </div>
        </div>
    )
}
