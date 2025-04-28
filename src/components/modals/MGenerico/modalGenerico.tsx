import { FC, useEffect } from "react"
import { VscCheck, VscChromeClose } from "react-icons/vsc"
import styles from "./modalGenerico.module.css"

interface IModalGenerico {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    fields: ("titulo" | "descripcion" | "estado" | "fechaLimite" | "nombre" | "fechaInicio" | "fechaCierre" | "listadoTareas")[],
    buttons: ("cancel" | "accept")[],
    modo: "crear" | "editar" | "ver"
}

const tareasGenericas = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3"]

export const ModalGenerico: FC<IModalGenerico> = ({ isOpen, onClose, title, fields, buttons, modo }) => {


    console.log("ModalGenerico -> Prop 'buttons' recibida:", buttons);

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

    let colorMode

    switch (modo) {
        case "crear":
            colorMode = "#7BFF98" // verde
            break
        case "editar":
            colorMode = "#887BFF" // azul
            break
        case "ver":
            colorMode = "#FBFF80" // amarillo
            break
        default:
            colorMode = "#FFFFFF" // blanco
            break
    }

    if (!isOpen) return null

    console.log("ModalGenerico -> ¿Incluye 'cancel'?", buttons.includes("cancel"));
    console.log("ModalGenerico -> ¿Incluye 'accept'?", buttons.includes("accept"));

    return (
        <div className={styles.background} onClick={onClose}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: colorMode }}>{title}</h2>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <form>
                    
                        <div>
                            <p className={styles.fieldTitle}>Título:</p>
                            <input type="text" placeholder="Título:" className={styles.fieldInput} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Descripción:</p>
                            <textarea placeholder="Descripción:" className={`${styles.fieldInput} ${styles.textarea}`} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Estado:</p>
                            <input type="text" placeholder="Estado:" className={styles.fieldInput} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha límite:</p>
                            <input type="date" className={styles.fieldInput} />
                        </div>
                        






                        
                        <div>
                            <p className={styles.fieldTitle}>Nombre:</p>
                            <input type="text" placeholder="Nombre:" className={styles.fieldInput} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha inicio:</p>
                            <input type="date" className={styles.fieldInput} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha cierre:</p>
                            <input type="date" className={styles.fieldInput} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Listado tareas:</p>
                            <select className={styles.fieldInput} >
                                {tareasGenericas.map((tarea, index) => (
                                    <option key={index} value={tarea}>
                                        {tarea}
                                    </option>
                                ))}
                            </select>
                        </div>
                </form>
                <div className={styles.fieldButtons}>
                        <button onClick={onClose} className={styles.cancelButton}><VscChromeClose /></button>
                        <button onClick={onClose} className={styles.acceptButton}><VscCheck /></button>
                    
                </div>
            </div>
        </div>
    )
}
