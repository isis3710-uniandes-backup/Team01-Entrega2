import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/categoryblock.css';
import { Link } from "react-router-dom"


export default class categoryblock extends Component {
    state = {
        nombre :this.props.value.nombre,
        imagen : this.props.value.rutaFront,
        brothers : this.props.brothers,
        id : this.props.value._id,
        usuario: this.props.value.user
    }
    render() {
        return (
            <div className="col-md-4">
                <Link className="card categorias text-center" to={{  pathname: '/categories/'+this.state.nombre, 
                    state : {
                        category : this.state.nombre,
                        categories : this.state.brothers,
                        idCategory : this.state.id
                    }}}>
                <Card.Img src={this.state.imagen} alt="Card image" />
                    <Card.ImgOverlay className="categoriaBody">
                        <Card.Title id="title">
                            <strong>{this.state.nombre}</strong>
                        </Card.Title>
                    </Card.ImgOverlay>
                </Link>
            </div>
        )
    }
}
