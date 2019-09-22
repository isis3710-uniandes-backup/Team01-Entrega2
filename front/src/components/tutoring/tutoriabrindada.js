import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/tutoriabrindada.css';
import Rating from '@material-ui/lab/Rating';
export default class tutoriabrindada extends Component {
    state = {
        materia: this.props.value.materias,
        direccion: this.props.value.direccion,
        fecha: this.props.value.fecha,
        duracion: this.props.value.duracion,
        horaFinal: "",
        costo: this.props.value.costo,
        cupos : this.props.value.cuposRestantes
    }
    componentDidMount() {
        let init = this.state.fecha.split("T")[1].split(".")[0];
        let horaFina = parseInt(init.split(":")[0]);
        console.log(horaFina);
        let minutos = init.split(":")[1];
        let segundos = "00";
        horaFina += this.state.duracion;
        init = horaFina;
        let horaFinalle = "" + init + ":" + minutos + ":" + segundos;
        this.setState({
            horaFinal: horaFinalle
        })
        console.log(this.state.horaFinal)


    }
    render() {
        return (
            <div >
                <Card className="tutorias" >
                    <Card.Body className="tutoriasBody">
                        <Card.Title>
                            <strong>Monitoria de {this.state.materia}</strong>
                        </Card.Title>
                        <Card.Subtitle className="text-muted">{this.state.direccion}</Card.Subtitle>
                        <h5 className="fecha">{this.state.fecha.split("T")[0]}</h5>
                        <div className="sameLine">
                        <h5 className="hora">{this.state.fecha.split("T")[1].split(".")[0]} a {this.state.horaFinal}</h5>
                        <h5 className="costo" >${this.state.costo}</h5>
                        <h5 className="cupos" >Cupos actuales : {this.state.cupos}</h5>
                        </div>
                        <div className="stars">
                            <Rating value={3} readOnly />
                        </div>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}
