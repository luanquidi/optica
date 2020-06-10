import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

//Components
import Usuario from './Usuario';
import CrearUsuario from './CrearUsuario';
import BusquedaUser from './BusquedaUser';

const ListaUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [consultar, setConsultar] = useState(false);

    
    useEffect(()=>{
        
        const consultarApi = async () => {
            
            if(usuarios.length === 0 || consultar){
                
                const respuesta = await Axios.get('/api/v1/users');
                
                console.log('if')
                setUsuarios(respuesta.data.data);
            }
            console.log('outif');
            
        }
        console.log('ok')
        setConsultar(false);
        console.log('pk')
        
        consultarApi();

    },[consultar])


    return ( 
        <Fragment>
            <div className="row">

                <div className="col-md-12 m-4">
                    <div className="jumbotron mb-0">
                        <p className="text-center display-4">Lista Usuarios</p>
                        <p className="text-center">Usuarios Registrados - <span className="badge badge-pill badge-dark">{usuarios.length}</span></p>
                    </div>
                    <div className="d-flex justify-content-center">
                            <CrearUsuario setConsultar={setConsultar}/>
                    </div>

                    {(usuarios.length > 0) 
                        ? (
                            <BusquedaUser/>
                        )
                        : null
                    }
                    
                    {(usuarios.length > 0) 
                    ?
                        usuarios.map((user) => (
                            <Usuario usuario={user}  key={user.id} setConsultar={setConsultar}/>
                        )) 
                    : (
                        <p className="text-center text-dark alert alert-info">No hay registros de Usuarios.</p>
                    )}

                </div>
            </div>
        </Fragment>
    );
}
 
export default ListaUsuarios;

if (document.getElementById('lista-usuarios')) {
    ReactDOM.render(<ListaUsuarios />, document.getElementById('lista-usuarios'));
}