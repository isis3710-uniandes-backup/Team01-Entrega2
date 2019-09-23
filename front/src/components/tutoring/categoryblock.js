import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/categoryblock.css';

export default class categoryblock extends Component {
    state = {
        nombre : "",
        imagen : ""
    }
    render() {
        return (
            <div>
                <Card className="categorias" onClick={this.updateTutoria}>
                <Card.Img src={this.state.imagen} alt="Card image" />
                    <Card.ImgOverlay className="categoriaBody">
                        <Card.Title className="text-center">
                            <strong>{this.state.nombre}</strong>
                        </Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </div>
        )
    }
}
