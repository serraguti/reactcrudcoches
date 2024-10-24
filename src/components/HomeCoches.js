import React, { Component } from 'react'
import axios from 'axios'
import Global from './Global'
import { NavLink } from 'react-router-dom'

export default class HomeCoches extends Component {
    state = {
        coches: []
    }

    loadCoches = () => {
        let request = "api/coches";
        let url = Global.apiUrlCoches + request;
        axios.get(url).then(response => {
            console.log("Leyendo coches")
            this.setState({
                coches: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadCoches();
    }

    deleteCoche = (idCoche) => {
        console.log("Id coche: " + idCoche);
        let request = "api/coches/deletecoche/" + idCoche;
        let url = Global.apiUrlCoches + request;
        axios.delete(url).then(response => {
            console.log("Delete coche");
            this.loadCoches();
        })
    }

  render() {
    return (
    <div>
        <h1>Home Coches</h1>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Coche</th>
                    <th>Imagen</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.coches.map((car, index) => {
                        return (<tr key={index}>
                            <td>{car.marca} {car.modelo}</td>
                            <td>
                                <img src={car.imagen}
                                style={{width: "90px", height: "90px"}}/>
                            </td>
                            <td>
                                <NavLink to={"/details/" + car.idCoche} 
                                className="btn btn-success">
                                    Details
                                </NavLink>
                                <NavLink to={"/update/" + car.idCoche} 
                                className="btn btn-info">
                                    Update
                                </NavLink>
                                <button className='btn btn-danger'
                                onClick={() => {
                                    this.deleteCoche(car.idCoche);
                                }}>
                                    Delete
                                </button>                        
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
    )
  }
}
