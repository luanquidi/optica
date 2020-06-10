import React, { Fragment } from 'react';
import InformacionUsuario from './InformacionUsuario';
const ModalUser = ({usuario, fecha}) => {

    // const {id, name, email, rol, phone, document, type_document} = usuario;

    

    return ( 
        <Fragment>
            
            <div className="modal fade" id={`modal-user-${usuario.id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div>
                            <div className="d-flex justify-content-center m-4 border align-items-center">
                                <h4 className="mb-0 p-4">Detalles del Usuario</h4>
                            </div>
                        </div>
                        <div className="modal-body">
                            <InformacionUsuario fecha={fecha} usuario={usuario}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary btn-block" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ModalUser;