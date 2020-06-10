import React, { Fragment } from 'react';
import moment from 'moment';

//Components
import ModalUser from './ModalUser';
import axios from 'axios';
import Swal from 'sweetalert2';
import ActualizarUsuario from './ActualizarUsuario';

const Usuario = ({usuario, setConsultar}) => {

    const {id, name, email, rol, created_at} = usuario;
    
    let fecha = moment(created_at, "YYYY-MM-DD hh:mm:ss").locale('es').fromNow();
    console.log(fecha)
    
    const handleAccion = async (id, accion) => {

        switch (accion) {
            case 'show':
                console.log(accion);
                break;

            case 'edit':
                console.log(accion);
                break;

            case 'delete':
                console.log(accion);

                Swal.fire({
                    title: '¿Estás seguro de eliminar este Usuario?',
                    text: "¡Una vez eliminado no se puede recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡Si, eliminar!'
                  }).then((result) => {
                    if (result.value) {
                        axios.delete(`/api/v1/users/${id}`).then((res)=> {
                            Swal.fire(
                                '¡Eliminado!',
                                res.data.message,
                                'success'
                            )
                        });

                        setConsultar(true);
                    }
                  })
                
                break;

            default:
                break;
        }
    }

    return ( 
        <Fragment>
            <ul className="list-group mb-2">
                <li className="list-group-item text-center">
                    <p>{fecha}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h5><b>Nombre Usuario:</b> {name}</h5>
                    </div>

                    <div>
                        <button className="btn btn-success mr-2" onClick={()=>{handleAccion(id, 'show')}} data-toggle="modal" data-target={`#modal-user-${id}`}><i className="fas fa-eye"></i></button>
                        <button className="btn btn-info mr-2" onClick={()=>{handleAccion(id, 'edit')}} data-toggle="modal" data-target={`#actualizar-user-${id}`}><i className="fas fa-pen"></i></button>
                        <button className="btn btn-danger" onClick={()=>{handleAccion(id, 'delete')}}><i className="fas fa-trash-alt"></i></button>
                    </div>
                </li>
            </ul>
            <ModalUser usuario={usuario} fecha={fecha} id={id}/>
            <ActualizarUsuario usuario={usuario} setConsultar={setConsultar} id={id}/>
        </Fragment>
    );
}
 
export default Usuario;