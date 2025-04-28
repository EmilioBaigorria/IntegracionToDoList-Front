import { FC } from "react";
import { ModalGenerico } from "../MGenerico/modalGenerico";

interface IModalCrearTarea {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalCrearTarea: FC<IModalCrearTarea> = ({ isOpen, onClose }) => {

    return (
        <div>
            <ModalGenerico
                isOpen={isOpen}
                onClose={onClose}
                title="Crear tareas"
                fields={["titulo", "estado", "descripcion", "fechaLimite"]}
                buttons={["cancel", "accept"]}
            />
        </div>
    )
}
