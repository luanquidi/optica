import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const CrearUsuario = ({setConsultar}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [phone, setPhone] = useState('');
    const [document, setDocument] = useState('');
    const [type_document, setTypeDocument] = useState('');


    const validar = (e, tipo) => {
        if(tipo == 'clear'){
            $('.is-invalid').each((index, element)=> {
                if(element.classList.contains('is-invalid')){
                    element.classList.remove('is-invalid');
                }
            });
            $('.invalid-feedback').each((index, element)=> {
                element.innerHTML = '';
            });
            
        }else{

            if(e.target.classList.contains('is-invalid')){
                e.target.classList.remove('is-invalid');
                $(`#${e.target.name}`)[0].innerHTML = '';
            }
        }
    }

    const limpiarModal = () => {
        $('#exampleModal').modal('hide');
        $('.form').trigger('reset');
        validar(null, 'clear')
    }

    const crearUsuario = async (e) => {
        
        e.preventDefault();
        const usuario = {
            name,
            email,
            password,
            document,
            phone,
            type_document,
            password_confirmation: confirmar
        }


        if(usuario.type_document === ''){
            usuario.type_document = 'CC';
        }

        const respuesta = await axios.post('/api/v1/users', usuario);
        
        if(respuesta.data.statusServer === 422){
           
            const form = $('.form')[0];
            
            const elementosForm = {
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                document: form.document,
                type_document: form.type_document,
                passwordConfirmed: form.passwordConfirm,
                rol: form.rol
            }

            $.each(respuesta.data[0], (i, val)=>{
                $.each(elementosForm, (index, value)=>{
                    
                    
                    if(i === index ){
                        $(`#${i}`)[0].innerHTML = val;
                        value.classList.add('is-invalid');
                    }
                    
                });
            });
        }else if(respuesta.data.status === 200) {

            Swal.fire('¡Hecho!', respuesta.data.mensagge ,'success');
            limpiarModal();
            setConsultar(true);
        }else{

            Swal.fire('¡Upss!', respuesta.data.mensagge ,'error');
            limpiarModal();
        }
    }


    return ( 
        <Fragment>
            <button type="button" className="btn btn-success btn-block mb-5" data-toggle="modal" data-target="#exampleModal">
                <i className="fas fa-plus"></i>
            </button>

            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title modal-titulo" id="exampleModalLabel">Nuevo Usuario</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" id="form">
                                <input className="form-control mb-2" name="name" type="text" placeholder="Ingresa el nombre" onChange={ (e)=> {validar(e);setName(e.target.value)}}/>
                                <span className="invalid-feedback" id="name"></span>

                                <input className="form-control mb-2" name="email" type="text" placeholder="E-mail" onChange={ (e)=> {validar(e);setEmail(e.target.value)}}/>
                                <span  className="invalid-feedback" id="email"></span>

                                <input className="form-control mb-2" name="phone" type="text" placeholder="Teléfono" onChange={ (e)=> {validar(e);setPhone(e.target.value)}}/>
                                <span  className="invalid-feedback" id="phone"></span>

                                <div className="form-row">
                                    <div className="col-md-7">
                                        <input className="form-control mb-2" name="document" type="text" placeholder="Documento" onChange={ (e)=> {validar(e);setDocument(e.target.value)}}/>
                                        <span  className="invalid-feedback" id="document"></span>
                                    </div>
                                    <div className="col-md-5">
                                        <select  name="type_document" className="form-control" onChange={(e)=>{setTypeDocument(e.target.value)}}>
                                            <option disabled>Tipo de Documento</option>
                                            <option value="CC">Cédula de ciudadanía</option>
                                            <option value="TI">Tarjeta de identidad</option>
                                            <option value="AS">Adulto sin identidad</option>
                                        </select>
                                        <span  className="invalid-feedback" id="type_document"></span>
                                        {/* <input className="form-control mb-2" name="phone" type="text" placeholder="Teléfono" onChange={ (e)=> {validar(e);setPhone(e.target.value)}}/>
                                        <span  className="invalid-feedback" id="phone"></span> */}
                                    </div>
                                </div>

                                <input className="form-control mb-2" name="password" type="password" placeholder="Contraseña" onChange={ (e)=> {validar(e);setPassword(e.target.value)}}/>
                                <span  className="invalid-feedback" id="password"></span>

                                <input  className="form-control mb-2" name="passwordConfirm" type="password" placeholder="Confirmar contraseña" onChange={ (e)=> {validar(e);setConfirmar(e.target.value)}}/>
                                <span  className="invalid-feedback" id="password-confirm"></span>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={limpiarModal}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={crearUsuario}>Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default CrearUsuario;