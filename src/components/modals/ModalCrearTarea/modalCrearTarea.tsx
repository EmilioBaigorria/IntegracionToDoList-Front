import { ChangeEvent, FC, useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { addTaskToSprint } from "../../../data/sprintController";
import { crearTarea } from "../../../data/taskController";
import { ITask, State } from "../../../types/ITask";
import styles from "./../MGenerico/modalGenerico.module.css";

interface IModalCrearTarea {
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

export const ModalCrearTarea: FC<IModalCrearTarea> = ({ isOpen, onClose }) => {

    const [newTarea, setNewTarea] = useState<ITask>(initialValues)

    const sprintId = useParams().sprintId

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = event.target
        const parsedValue = name === "estado" ? parseInt(value) : value;
        setNewTarea((prev) => ({ ...prev, [`${name}`]: parsedValue }))

        console.log(newTarea)
    }

    const saveNewTarea = async () => {

        if (sprintId){
            const newerTask=newTarea
            newerTask.id=crypto.randomUUID()
            await addTaskToSprint(newerTask, sprintId)
        } else {
            await crearTarea(newTarea)
        }

        setNewTarea(initialValues)
        onClose()
    }

    const handleCloseModal = () => {
        setNewTarea(initialValues)
        onClose()
    }

    return (
        <div style={{ display: isOpen ? "" : "none" }} className={styles.background} onClick={handleCloseModal}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: "#7BFF98" }}>Crear tarea</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
                <form>

                    <div>
                        <p className={styles.fieldTitle}>Título:</p>
                        <input name="titulo" value={newTarea.titulo} type="text" placeholder="Título:" className={styles.fieldInput} onChange={handleChangeInputs} />
                    </div>
                    <div>
                        <p className={styles.fieldTitle}>Descripción:</p>
                        <textarea name="descripcion" value={newTarea.descripcion} placeholder="Descripción:" className={`${styles.fieldInput} ${styles.textarea}`} onChange={handleChangeInputs} />
                    </div>
                    <div>
                        <p className={styles.fieldTitle}>Estado:</p>
                        <select name="estado" value={newTarea.estado} className={styles.fieldInput} onChange={handleChangeInputs} >
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
                        <input name="fechaLimite" value={newTarea.fechaLimite} type="date" className={styles.fieldInput} onChange={handleChangeInputs} />
                    </div>
                    <div className={styles.fieldButtons}>
                        <button onClick={handleCloseModal} type="button" className={styles.cancelButton}><VscChromeClose /></button>
                        <button onClick={saveNewTarea} type="button" className={styles.acceptButton}><VscCheck /></button>
                    </div>
                </form>

            </div>

        </div>
    )
}
