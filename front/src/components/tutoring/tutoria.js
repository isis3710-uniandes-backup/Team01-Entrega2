import React, { Component } from 'react'
import { Card } from 'react-bootstrap';
import '../../styles/tutoria.css'
const url = "https://tutofinder.herokuapp.com";

export default class tutoria extends Component {
    state = {
        materia: this.props.value.materia,
        direccion: this.props.value.direccion,
        fecha: this.props.value.fecha,
        costo: this.props.value.costo,
        tipo: this.props.value.tipo,
        cupos: this.props.value.cuposRestantes,
        duracion: this.props.value.duracion,
        inscrito : false,
        student: this.props.usuario,
        id: this.props.value._id
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
        });
    }

    añadirEstudianteEnMonitoria = () => {
        fetch(url+`/users/students/${this.state.student}/monitorias/${this.state.id}`, {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => this.setState({inscrito: true}));
        //fetch(url+`/`)
    };

    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>
                            <div className="row">
                                <div className="col-8">
                                    <strong>Monitoria de {this.state.materia}</strong>
                                </div>
                                <div className="col-4">
                                    {this.state.inscrito == false ? <a href="#" onClick={this.añadirEstudianteEnMonitoria}>
                                        <i className="fas fa-plus-circle"></i>
                                        <p>Inscribirse</p>
                                    </a> :
                                        <p>Inscrito</p>
                                    }
                                </div>
                            </div>
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
