import React, { Fragment, useState } from "react";
import axios from "axios";
import InformacionUsuario from "./InformacionUsuario";
import moment from "moment";


const BusquedaUser = () => {

    const [usuario, setUsuario] = useState({});
    const [documento, setDocumento] = useState('');
    const [fecha, setFecha] = useState('');

   

    const consultar = e => {

        e.preventDefault();

        axios.get(`/api/v1/search/${documento}`).then(res => {
            if(res.data.status === 200){
                
                setUsuario(res.data.data[0]);
                setFecha(moment(res.data.data[0].created_at, "YYYY-MM-DD hh:mm:ss").locale('es').fromNow());
            }
        });
    };

    return (
        <Fragment>
            <div className="form-row m-4 mt-0">
                <div className="col-md-7">
                    <input className="form-control" placeholder="Buscar Usuario por Documento" onChange={(e)=> {setDocumento(e.target.value)}}/>
                </div>
                <div className="col-md-5">
                    <button className="btn btn-success btn-block" onClick={consultar} ><i className="fas fa-search"></i></button>
                </div>

                
            </div>

            {(usuario.name != undefined)
            ?   (
                    <div className="row m-4 mt-0 d-flex justify-content-center">
                        <div className="col-md-6 border border-success shadow text-center p-4">
                            <InformacionUsuario usuario={usuario} fecha={fecha}></InformacionUsuario>
                            <button className="btn btn-outline-success btn-block"  onClick={()=>{setUsuario({})}}>Cerrar</button>
                        </div>
                    </div>
                )
            : null
            }
        </Fragment>
    );
};

export default BusquedaUser;
