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
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

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
        setSelectedOptions([]);
    }

    useEffect(() => {
        getTasks()
    }, [isOpen])

    const handleCloseModal = () => {
        setNewSprint(initialValuesSprint)
        setSelectedOptions([]);
        onClose()
    }

    const selectOptions = tareas.map(t => ({
        value: t.id,
        label: t.titulo
    }));

    return (
        <div style={{ display: isOpen ? "" : "none" }} className={styles.background} onClick={handleCloseModal}>
            <div className={styles.modalGlobal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.modalTitle} style={{ color: "#7BFF98" }}>Crear Sprint</h2>
                <button className={styles.closeButton} onClick={handleCloseModal}>✖</button>
                <form>
                    <div>
                        <div>
                            <p className={styles.fieldTitle}>Nombre:</p>
                            <input type="text" name="nombre" value={newSprint.nombre} placeholder="Nombre:" className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha inicio:</p>
                            <input type="date" name="fechaInicio" value={newSprint.fechaInicio} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Fecha cierre:</p>
                            <input type="date" name="fechaCierre" value={newSprint.fechaCierre} className={styles.fieldInput} onChange={handleChangeInputs} />
                        </div>
                        <div>
                            <p className={styles.fieldTitle}>Listado tareas:</p>
                            <Select
                                options={selectOptions}
                                isMulti
                                value={selectedOptions}
                                onChange={(selected) => {
                                    setSelectedOptions(selected);
                                    const tareasSeleccionadas = tareas.filter(t =>
                                        selected.some(option => option.value === t.id)
                                    );
                                    setNewSprint(prev => ({
                                        ...prev,
                                        tareas: tareasSeleccionadas
                                    }));
                                }}
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: '#2b2b2b',
                                        border: state.isFocused ? '1px solid #888' : '1px solid #444',
                                        borderRadius: '0.2rem',
                                        boxShadow: 'none',
                                        color: 'white',
                                        minHeight: '38px',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#1b1b1b',
                                        border: '1px solid #444',
                                        borderRadius: '0.2rem',
                                        zIndex: 9999,
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isFocused
                                            ? '#333'
                                            : state.isSelected
                                                ? '#364875' // celeste pastel apagado
                                                : '#1b1b1b',
                                        color: state.isSelected ? '#ffffff' : '#e0e0e0',
                                        cursor: 'pointer',
                                    }),
                                    multiValue: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#364875', // celeste pastel apagado
                                    }),
                                    multiValueLabel: (provided) => ({
                                        ...provided,
                                        color: '#fff',
                                    }),
                                    multiValueRemove: (provided) => ({
                                        ...provided,
                                        color: '#fff',
                                        ':hover': {
                                            backgroundColor: '#4a7a91',
                                            color: '#fff',
                                        },
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'white',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'white',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#aaa',
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: '#333',
                                        primary: '#6c9db7',
                                    },
                                })}
                            />


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