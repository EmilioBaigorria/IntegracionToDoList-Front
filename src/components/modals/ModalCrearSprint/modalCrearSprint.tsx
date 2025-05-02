import { ChangeEvent, FC, useEffect, useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import Select, { MultiValue } from "react-select";
import { crearSprint } from "../../../data/sprintController";
import { getALLTareas } from "../../../data/taskController";
import { ISprint } from "../../../types/ISprint";
import { ITask } from "../../../types/ITask";
import styles from "./../MGenerico/modalGenerico.module.css";

interface IModalCrearSprint {
    isOpen: boolean;
    onClose: () => void;
}

interface OptionType {
    value: string;
    label: string;
}

const initialValuesSprint = {
    id: "",
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
    tareas: []
}

export const ModalCrearSprint: FC<IModalCrearSprint> = ({ isOpen, onClose }) => {

    const [newSprint, setNewSprint] = useState<ISprint>(initialValuesSprint)
    const [tareas, setTareas] = useState<ITask[]>([])

    const getTasks = async () => {
        const tasks: ITask[] = await getALLTareas() ?? []
        setTareas(tasks)
        console.log(tareas)
    }

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setNewSprint((prev) => ({ ...prev, [`${name}`]: value }))
        console.log(newSprint)
    }

    const saveNewSprint = async () => {
        const result = await crearSprint(newSprint)
        console.log(result)
        onClose()
        setNewSprint(initialValuesSprint)
    }

    useEffect(() => {
        getTasks()
    }, [isOpen])

    const handleCloseModal = () => {
        setNewSprint(initialValuesSprint)
        onClose()
    }


    return (
        <div style={{ display: isOpen ? "" : "none" }} className={styles.background} onClick={handleCloseModal}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: "#7BFF98" }}>Crear Sprint</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
                <form>
                    <div>
                        <div>
                            <p className={styles.fieldTitle}>Nombre:</p>
                            <input type="text" name="nombre" value={newSprint.nombre} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha inicio:</p>
                            <input type="date" name="fechaInicio" value={newSprint.fechaInicio} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha cierre:</p>
                            <input type="date" name="fechaCierre" value={newSprint.fechaCierre} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        
                    </div>
                    <div className={styles.fieldButtons}>
                        <button onClick={handleCloseModal} type="button" className={styles.cancelButton}><VscChromeClose /></button>
                        <button onClick={saveNewSprint} type="button" className={styles.acceptButton}><VscCheck /></button>

                    </div>
                </form>
            </div>
        </div>
    );
};