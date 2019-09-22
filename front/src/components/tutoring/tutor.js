import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/tutoriabrindada.css';
import Rating from '@material-ui/lab/Rating';
export default class tutor extends Component {
    state = {
        usuario: this.props.value.usuario,
        nombre: this.props.value.nombre,
        apellidos: this.props.value.apellidos,
        telefono: this.props.value.telefono,
        email: this.props.value.email,
        calificacion: this.props.value.calificacion

    }


    render() {
        return (
            <div >
                <Card className="tutor" >
                    <Card.Body className="tutorBody">
                        <Card.Title>
                            <strong>Tutor {this.state.nombre}</strong>
                        </Card.Title>
                        <Card.Subtitle className="text-muted">{this.state.apellidos}</Card.Subtitle>
                        <h5 className="Calificacion">{this.state.calificacion}</h5>
                        <div className="sameLine">
                            <h5 className="email" >{this.state.email}</h5>
                            <h5 className="telefono" > {this.state.telefono}</h5>
                        </div>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}
