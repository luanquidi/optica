import React, { Fragment } from "react";

const InformacionUsuario = ({usuario, fecha}) => {

    const {id, name, email, phone, document, type_document, rol} = usuario;
    
    
    return (
        <Fragment>
            <div className="text-center">
                <p>
                    <b>Usuario ID:</b> {id}
                </p>
                <p>
                    <b>Nombre del Usuario:</b> {name}
                </p>
                <p>
                    <b>E-mail del Usuario:</b> {email}
                </p>
                <p>
                    <b>Teléfono Usuario:</b> {phone}
                </p>
                <p>
                    <b>Documento Usuario:</b> {type_document} - {document}
                </p>
                <p>
                    <b>Tipo de Usuario:</b> {rol}
                </p>
                <p>
                    <b>Creacion del Usuario:</b> {fecha}
                </p>
            </div>
        </Fragment>
    );
};

export default InformacionUsuario;
