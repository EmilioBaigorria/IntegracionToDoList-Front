import { ChangeEvent, FC, useEffect, useState } from "react";
import { VscCheck, VscChromeClose } from "react-icons/vsc";
import Select, { MultiValue } from "react-select";
import { actualizarSprint } from "../../../data/sprintController";
import { getALLTareas } from "../../../data/taskController";
import { activeSprintStore } from "../../../store/activeSprintStore";
import { ISprint } from "../../../types/ISprint";
import { ITask } from "../../../types/ITask";
import styles from "./../MGenerico/modalGenerico.module.css";

interface IModalEditarSprint {
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

export const ModalEditarSprint: FC<IModalEditarSprint> = ({ isOpen, onClose }) => {

    const sprintActivo = activeSprintStore(state => state.activeSprint)

    const [editedSprint, setEditedSprint] = useState<ISprint>(sprintActivo ?? initialValuesSprint)

    const handleChangeInputs = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setEditedSprint((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const saveNewSprint = async () => {
        await actualizarSprint(editedSprint)
        onClose()
        setEditedSprint(initialValuesSprint)
    }

    useEffect(() => {
        if (isOpen && sprintActivo) {
            setEditedSprint(sprintActivo)
        }
    }, [isOpen, sprintActivo])

    const handleCloseModal = () => {
        setEditedSprint(initialValuesSprint)
        onClose()
    }

    return (
        <div style={{ display: isOpen ? "" : "none" }} className={styles.background} onClick={handleCloseModal}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: "#887BFF" }}>Editar Sprint</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
                <form>
                    <div>
                        <div>
                            <p className={styles.fieldTitle}>Nombre:</p>
                            <input type="text" name="nombre" value={editedSprint.nombre} placeholder="Nombre:" className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha inicio:</p>
                            <input type="date" name="fechaInicio" value={editedSprint.fechaInicio} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha cierre:</p>
                            <input type="date" name="fechaCierre" value={editedSprint.fechaCierre} className={styles.fieldInput} onChange={handleChangeInputs} />
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