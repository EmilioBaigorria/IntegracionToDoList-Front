import { FC } from "react";
import { ModalGenerico } from "../MGenerico/modalGenerico";

interface IModalEditarTarea {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalEditarSprint: FC<IModalEditarTarea> = ({ isOpen, onClose }) => {

    return (
        <div>
            <ModalGenerico
                isOpen={isOpen}
                onClose={onClose}
                title="Editar sprint"
                fields={["nombre", "fechaInicio", "fechaCierre", "listadoTareas"]}
                buttons={["cancel", "accept"]}
            />
        </div>
    );
};