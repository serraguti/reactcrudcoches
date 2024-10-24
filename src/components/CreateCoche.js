import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom';

export default class CreateCoche extends Component {
    state = {
        status: false
    }

    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    insertCoche = (e) => {
        e.preventDefault();
        let marca = this.cajaMarca.current.value;
        let modelo = this.cajaModelo.current.value;
        let conductor = this.cajaConductor.current.value;
        let imagen = this.cajaImagen.current.value;
        let coche =   {
            idCoche: 1,
            marca: marca,
            modelo: modelo,
            conductor: conductor,
            imagen: imagen
        }
        let request = "api/coches/insertcoche";
        let url = Global.apiUrlCoches + request;
        axios.post(url, coche).then(response => {
            console.log("Insertado")
            this.setState({
                status: true
            })
        })
    }

  render() {
    return (
    <div>
        {
            this.state.status == true &&
            (<Navigate to="/"/>)
        }
        <h1>Create Coche</h1>
        <form>
            <label>Marca</label>
            <input type="text" className='form-control' ref={this.cajaMarca}/>
            <label>Modelo</label>
            <input type="text" className='form-control' ref={this.cajaModelo}/>
            <label>Conductor</label>
            <input type="text" className='form-control' ref={this.cajaConductor}/>
            <label>Imagen</label>
            <input type="text" className='form-control' ref={this.cajaImagen}/>
            <button onClick={this.insertCoche} className='btn btn-dark'>
                Insertar coche
            </button>
        </form>
    </div>
    )
  }
}
