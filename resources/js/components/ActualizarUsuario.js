import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const ActualizarUsuario = ({usuario, setConsultar, id}) => {

    const [name, setName] = useState(usuario.name);
    const [email, setEmail] = useState(usuario.email);
    const [phone, setPhone] = useState(usuario.phone);
    const [document, setDocument] = useState(usuario.document);
    const [type_document, setTypeDocument] = useState(usuario.type_document);

    useEffect(() => {
        
       console.log('effect')
    }, [])

    
    


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
        
        $(`#actualizar-user-${id}`).modal('hide');
        $('.form').trigger('reset');
        validar(null, 'clear')
    }

    const updateUsuario = async (e) => {
        
        e.preventDefault();

        
        const usuario = {
            name,
            email,
            document,
            phone,
            type_document
        }


        if(usuario.type_document === ''){
            usuario.type_document = 'CC';
        }


        const respuesta = await axios.put(`/api/v1/users/${id}`, usuario);
        
        if(respuesta.data.statusServer === 422){

            const form = $(`#form-actualizar-${id}`)[0];

            const elementosForm = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                document: form.document,
                type_document: form.type_document,
            }

            const elementosSpan = {
                name: form.children[1],
                email: form.children[3],
                phone: form.children[5],
                document: form.children[6].children[0].children[1]
            }

            $.each(respuesta.data[0], (i, val)=>{
                $.each(elementosSpan, (index, value)=>{
                    if(i === index){
                        value.innerHTML = val;
                    }
                })
            });

            $.each(respuesta.data[0], (i, val)=>{
                $.each(elementosForm, (index, value)=>{
                    console.log('each')
                    
                    if(i === index ){
                        console.log('pk')
                        console.log(value);
                        value.classList.add('is-invalid');
                    }
                    
                });
            });
        }else if(respuesta.data.status === 200) {

            Swal.fire('¡Hecho!', respuesta.data.menssage ,'success');
            limpiarModal();
            setConsultar(true);
        }else{

            Swal.fire('¡Upss!', respuesta.data.menssage ,'error');
            limpiarModal();
        }
    }


    return ( 
        <Fragment>
            
            <div className="modal fade" id={`actualizar-user-${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title modal-titulo" id="exampleModalLabel">Editar Usuario</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form" id={`form-actualizar-${id}`}>
                                <input className="form-control mb-2" name="name" value={name} type="text" placeholder="Ingresa el nombre" onChange={ (e)=> {validar(e);setName(e.target.value)}}/>
                                <span className="invalid-feedback" id="name"></span>

                                <input className="form-control mb-2" name="email" value={email} type="text" placeholder="E-mail" onChange={ (e)=> {validar(e);setEmail(e.target.value)}}/>
                                <span  className="invalid-feedback" id="email"></span>

                                <input className="form-control mb-2" name="phone" value={phone} type="text" placeholder="Teléfono" onChange={ (e)=> {validar(e);setPhone(e.target.value)}}/>
                                <span  className="invalid-feedback" id="phone"></span>

                                <div className="form-row">
                                    <div className="col-md-7">
                                        <input className="form-control mb-2" value={document} name="document" type="text" placeholder="Documento" onChange={ (e)=> {validar(e);setDocument(e.target.value)}}/>
                                        <span  className="invalid-feedback" id="document"></span>
                                    </div>
                                    <div className="col-md-5">
                                        <select  name="type_document" value={type_document} className="form-control" onChange={(e)=>{setTypeDocument(e.target.value)}}>
                                            <option disabled>Tipo de Documento</option>
                                            <option value="CC">Cédula de ciudadanía</option>
                                            <option value="TI">Tarjeta de identidad</option>
                                            <option value="AS">Adulto sin identidad</option>
                                        </select>
                                        <span  className="invalid-feedback" id="type_document"></span>
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={limpiarModal}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={updateUsuario}>Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default ActualizarUsuario;