import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { Navigate } from 'react-router-dom'

export default class UpdateCoche extends Component {
    state = {
        status: false,
        coche: null
    }

    cajaId = React.createRef();
    cajaMarca = React.createRef();
    cajaModelo = React.createRef();
    cajaConductor = React.createRef();
    cajaImagen = React.createRef();

    findCoche = () => {
        let idcoche = this.props.idcoche;
        let request = "api/coches/findcoche/" + idcoche;
        let url = Global.apiUrlCoches + request;
        axios.get(url).then(response => {
            console.log("Detalles coche");
            this.setState({
                coche: response.data
            })
        })
    }

    componentDidMount = () => {
        this.findCoche();
    }

    updateCoche = (e) => {
        e.preventDefault();
        let idcoche = parseInt(this.cajaId.current.value);
        let marca = this.cajaMarca.current.value;
        let modelo = this.cajaModelo.current.value;
        let conductor = this.cajaConductor.current.value;
        let imagen = this.cajaImagen.current.value;
        let coche =   {
            idCoche: idcoche,
            marca: marca,
            modelo: modelo,
            conductor: conductor,
            imagen: imagen
        }
        let request = "api/coches/updatecoche";
        let url = Global.apiUrlCoches + request;
        axios.put(url, coche).then(response => {
            console.log("Updated")
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
        <h1>Update Coche {this.props.idcoche}</h1>
        {
            this.state.coche && 
            (<form>
                <input type="text" className='form-control' ref={this.cajaId}
                value={this.state.coche.idCoche} disabled/>
                <label>Marca</label>
                <input type="text" className='form-control' ref={this.cajaMarca}
                defaultValue={this.state.coche.marca}/>
                <label>Modelo</label>
                <input type="text" className='form-control' ref={this.cajaModelo}
                defaultValue={this.state.coche.modelo}/>
                <label>Conductor</label>
                <input type="text" className='form-control' ref={this.cajaConductor}
                defaultValue={this.state.coche.conductor}/>
                <label>Imagen</label>
                <input type="text" className='form-control' ref={this.cajaImagen}
                defaultValue={this.state.coche.imagen}/>
                <button onClick={this.updateCoche} className='btn btn-info'>
                    Update coche
                </button>
            </form>)
        }
      </div>
    )
  }
}
