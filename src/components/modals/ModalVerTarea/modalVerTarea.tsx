import { ChangeEvent, FC, useEffect, useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { updateTaskOnSprint } from "../../../data/sprintController";
import { actualizarTarea } from "../../../data/taskController";
import { useTaskStore } from "../../../store/tareaStore";
import { ITask, State } from "../../../types/ITask";
import styles from "./../MGenerico/modalGenerico.module.css";

interface IModalVerTarea {
    isOpen: boolean;
    onClose: () => void;
}

const initialValues = {
    id: "",
    titulo: "",
    descripcion: "",
    estado: 0,
    fechaLimite: ""
}

export const ModalVerTarea: FC<IModalVerTarea> = ({ isOpen, onClose }) => {

    const tareaActual = useTaskStore(state => state.tareaActiva)
    const [verTarea, setVerTarea] = useState<ITask>(tareaActual ?? initialValues)

    const sprintId = useParams().sprintId


    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = event.target
        const parsedValue = name === "estado" ? parseInt(value) : value;
        setVerTarea((prev) => ({ ...prev, [`${name}`]: parsedValue }))

        console.log(verTarea)
    }

    const saveEditedTarea = async () => {

        if (sprintId) {
            await updateTaskOnSprint(verTarea, sprintId)
        } else {
            await actualizarTarea(verTarea)
        }

        setVerTarea(initialValues)
        onClose()
    }

    const handleCloseModal = () => {
        setVerTarea(initialValues)
        onClose()
    }

    useEffect(() => {
        if (isOpen && tareaActual) setVerTarea(tareaActual)
    }, [isOpen, tareaActual])

    return (
        <div style={{ display: isOpen ? "" : "none" }} className={styles.background} onClick={handleCloseModal}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: "#FBFF80" }}>Ver tarea</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
                <form>

                    <div>
                        <p className={styles.fieldTitle}>Título:</p>
                        <input disabled name="titulo" value={verTarea.titulo} type="text" placeholder="Título:" className={styles.fieldInput} onChange={handleChangeInputs} />
                    </div>
                    <div>
                        <p className={styles.fieldTitle}>Descripción:</p>
                        <textarea disabled name="descripcion" value={verTarea.descripcion} placeholder="Descripción:" className={`${styles.fieldInput} ${styles.textarea}`} onChange={handleChangeInputs} />
                    </div>
                    <div>
                        <p className={styles.fieldTitle}>Estado:</p>
                        <select disabled name="estado" value={verTarea.estado} className={styles.fieldInput} onChange={handleChangeInputs} >
                            <option value={State.pendiente}>
                                Pendiente
                            </option>
                            <option value={State.activo}>
                                Activo
                            </option>
                            <option value={State.terminado}>
                                Terminado
                            </option>
                        </select>
                    </div>
                    <div>
                        <p className={styles.fieldTitle}>Fecha límite:</p>
                        <input disabled name="fechaLimite" value={verTarea.fechaLimite} type="date" className={styles.fieldInput} onChange={handleChangeInputs} />
                    </div>
                    <div className={styles.fieldButtons}>
                        <button onClick={handleCloseModal} type="button" className={styles.cancelButton}><VscChromeClose /></button>
                        <button onClick={saveEditedTarea} type="button" className={styles.acceptButton}><VscCheck /></button>
                    </div>
                </form>

            </div>

        </div>
    )
}
