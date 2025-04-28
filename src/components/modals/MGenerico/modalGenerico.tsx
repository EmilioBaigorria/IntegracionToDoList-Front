import { FC, useEffect } from "react"
import { VscCheck, VscChromeClose } from "react-icons/vsc"
import styles from "./modalGenerico.module.css"

interface IModalGenerico {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    fields: ("titulo" | "descripcion" | "estado" | "fechaLimite" | "nombre" | "fechaInicio" | "fechaCierre" | "listadoTareas")[]
    buttons: ("cancel" | "accept")[]
}

const tareasGenericas = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3"]

export const ModalGenerico: FC<IModalGenerico> = ({ isOpen, onClose, title, fields, buttons }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null

    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <form>
                    {fields.includes("titulo") && (
                        <>
                            <p className={styles.fieldTitle}>Título:</p>
                            <input type="text" placeholder="Título:" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("descripcion") && (
                        <>
                            <p className={styles.fieldTitle}>Descripción:</p>
                            <textarea placeholder="Descripción:" className={`${styles.fieldInput} ${styles.textarea}`} />
                        </>)}
                    {fields.includes("estado") && (
                        <>
                            <p className={styles.fieldTitle}>Estado:</p>
                            <input type="text" placeholder="Estado:" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("fechaLimite") && (
                        <>
                            <p className={styles.fieldTitle}>Fecha límite:</p>
                            <input type="date" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("nombre") && (
                        <>
                            <p className={styles.fieldTitle}>Nombre:</p>
                            <input type="text" placeholder="Nombre:" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("fechaInicio") && (
                        <>
                            <p className={styles.fieldTitle}>Fecha inicio:</p>
                            <input type="date" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("fechaCierre") && (
                        <>
                            <p className={styles.fieldTitle}>Fecha cierre:</p>
                            <input type="date" className={styles.fieldInput} />
                        </>)}
                    {fields.includes("listadoTareas") && (
                        <>
                            <p className={styles.fieldTitle}>Listado tareas:</p>
                            <select className={styles.fieldInput} >
                                {tareasGenericas.map((tarea, index) => (
                                    <option key={index} value={tarea}>
                                        {tarea}
                                    </option>
                                ))}
                            </select>
                        </>)}
                </form>
                <div className={styles.fieldButtons}>
                    {buttons.includes("cancel") && (
                        <button onClick={onClose} className={styles.cancelButton}><VscChromeClose /></button>
                    )}
                    {buttons.includes("accept") && (
                        <button onClick={onClose} className={styles.acceptButton}><VscCheck /></button>
                    )}
                </div>



            </div>

        </div>
    )
}
