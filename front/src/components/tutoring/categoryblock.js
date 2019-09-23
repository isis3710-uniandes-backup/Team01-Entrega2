import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/categoryblock.css';
import { Link } from "react-router-dom"


export default class categoryblock extends Component {
    state = {
        nombre :this.props.value.name,
        imagen : this.props.value.imagen
    }
    render() {
        return (
            <div class="col-4">
                <Link className="card categorias text-center" to={{  pathname: '/users/'+this.state.usuario, 
                    state : {
                        user : this.state.usuario
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
