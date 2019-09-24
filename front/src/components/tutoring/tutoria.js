import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

export default class tutoria extends Component {
    state = {
        materia: this.props.value.materia,
        direccion: this.props.value.direccion,
        fecha: this.props.value.fecha,
        costo: this.props.value.costo,
        tipo: this.props.value.tipo,
        cupos: this.props.value.cuposRestantes,
        duracion: this.props.value.duracion
    }
    componentDidMount() {
        let init = this.state.fecha.split("T")[1].split(".")[0];
        let horaFina = parseInt(init.split(":")[0]);
        let minutos = init.split(":")[1];
        let segundos = "00";
        horaFina += this.state.duracion;
        init = horaFina;
        let horaFinalle = "" + init + ":" + minutos + ":" + segundos;
        this.setState({
            horaFinal: horaFinalle
        })
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <strong>Monitoria de {this.state.materia}</strong>
                        </Card.Title>
                        <Card.Subtitle className="text-muted">{this.state.direccion}</Card.Subtitle>
                        <h5 className="fecha">{this.state.fecha.split("T")[0]}</h5>
                        <div className="sameLine">
                            <h5 className="hora">{this.state.fecha.split("T")[1].split(".")[0]} a {this.state.horaFinal}</h5>
                            <h5 className="costo" >${this.state.costo}</h5>
                            <h5 className="cupos" >Cupos restantes : {this.state.cupos}</h5>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
