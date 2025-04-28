import { FC } from "react";
import { ModalGenerico } from "../MGenerico/modalGenerico";

interface IModalCrearSprint {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalCrearSprint: FC<IModalCrearSprint> = ({ isOpen, onClose }) => {

    return (
        <div>
            <ModalGenerico
                isOpen={isOpen}
                onClose={onClose}
                title="Crear sprint"
                fields={["nombre", "fechaInicio", "fechaCierre", "listadoTareas"]}
                buttons={["cancel", "accept"]}
            />
        </div>
    );
};