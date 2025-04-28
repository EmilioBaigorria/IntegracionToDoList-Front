import { FC } from "react";
import { ModalGenerico } from "../MGenerico/modalGenerico";

interface IModalEditarTarea {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalEditarTarea: FC<IModalEditarTarea> = ({ isOpen, onClose }) => {

    return (
        <div>
            <ModalGenerico
                isOpen={isOpen}
                onClose={onClose}
                title="Editar tareas"
                fields={["titulo", "estado", "descripcion", "fechaLimite"]}
                buttons={["cancel", "accept"]}
            />
        </div>
    )
}
