import { FC } from "react";
import { ModalGenerico } from "../MGenerico/modalGenerico";

interface IModalVerTarea {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalVerTarea: FC<IModalVerTarea> = ({ isOpen, onClose }) => {

    return (
        <div>
            <ModalGenerico
                isOpen={isOpen}
                onClose={onClose}
                title="Ver tareas"
                fields={["titulo", "estado", "descripcion", "fechaLimite"]}
                buttons={["cancel"]}
            />
        </div>
    )
}
