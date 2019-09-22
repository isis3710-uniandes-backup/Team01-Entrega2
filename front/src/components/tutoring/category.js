import React, { Component } from 'react'
import { Col, Row, Card, Modal, Button, FormGroup } from 'react-bootstrap';
import '../../styles/dashboardtutor.css';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import TutoriaBrindada from './tutoriabrindada';
import Chart from 'chart.js';


export default class categoria extends Component {

    state = {
        modalShow: false,

        category: "",
        course: "",
        costo: "$",
        cupos: 0,
        grupal: false,
        materia: this.props.value,
        tutores : []
    }
    underline = {
        '&:after': {
            borderBottom: '2px solid #25d1a9'
        }
    }
    suggestions = [{
        label: 'Matematicas'
    }
    ];

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    };

    setCategory = evento => {
        this.setState({
            category: evento.target.value
        })
    }






    componentDidMount() {
        fetch('https://radiant-hollows-88985.herokuapp.com/users/fjgonzalez')
            .then(res => res.json())
            .then(json => {
                    let idsTutores = json[0].tutores;
                let tempTutor = this.state.tutores;
                    for (let index = 0; index < idsTutores.length; index++)
                    {
                        let monit = idsTutores[index];
                        fetch('https://radiant-hollows-88985.herokuapp.com/categorias/'+monit)
                            .then(res => res.json())
                            .then(json => {
                                tempTutor.push(json[0]);
                            })

                    }
                    this.setState({
                        tutores: tempTutor
                    })

                }
            );
    }




    render() {

        return (
            <div id="dashboard">
                <Row className="principal">
                    <Col md={5}>
                        <Row className="secundaria">
                            <Col>
                                <Card >
                                    <Card.Body className="text-right">
                                        <img onClick={this.setModalShow} className="img-fluid float-left rounded-circle shadow " alt="Nueva tutoria" id="plus" src="/plusIcon.svg" />
                                        <strong id="nueva">Nueva</strong>
                                        <br></br>
                                        <strong id="tutoria">Tutoría</strong>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="stats" >
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Col className="text-center">
                                                <strong >Calificaciones</strong>
                                                <br></br>
                                                <canvas id="reporte" alt="Reporte de calificaciones"></canvas>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="text-center">
                                                <strong >Materias</strong>
                                                <br></br>
                                                <canvas id="reporteClie" alt="Reporte de tipos de cliente"></canvas>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={7} className="text-center">
                        <strong id="tutores">Tutores</strong>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tutores.map((e,i) => <tutor key={i} value={e}/>)}
                        </div>
                    </Col>
                </Row>
                <this.MyVerticallyCenteredModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
            </div>
        )
    }
}
