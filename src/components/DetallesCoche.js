import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class DetallesCoche extends Component {
    state = {
        coche: null
    }

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
  render() {
    return (
      <div>
        <h1>Details</h1>
        {
            this.state.coche && 
            (<div className="card" style={{width: "18rem"}}>
                <img src={this.state.coche.imagen} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h5 className="card-title">{this.state.coche.marca} {this.state.coche.modelo}</h5>
                  <p className="card-text">Conductor: {this.state.coche.conductor}</p>
                  <NavLink className="btn btn-primary" to="/">Back to List</NavLink>
                </div>
              </div>)
        }
      </div>
    )
  }
}
