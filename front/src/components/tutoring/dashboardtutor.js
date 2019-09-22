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


export default class dashboardtutor extends Component {

    state = {
        modalShow: false,
        selectedDate: new Date(),
        selectedAddress: "Kra 8a #153-51",
        category: "",
        course: "",
        costo: "$",
        cupos: 0,
        grupal: false,
        tutor: this.props.value,
        monitoriasBrindadas : []
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
    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        })
    };
    setSelectedAddress = evento => {
        this.setState({
            selectedAddress: evento.target.value
        })
    }
    setCategory = evento => {
        this.setState({
            category: evento.target.value
        })
    }
    setCourseNewTutoria = evento => {
        this.setState({
            course: evento.target.value
        })
    }
    setCost = evento => {
        this.setState({
            costo: evento.target.value
        })
    }
    setCupos = evento => {
        this.setState({
            cupos: evento.target.value
        })
    }
    setGrupal = () => {
        this.setState({
            grupal: !this.state.grupal
        })
    }
    crearTutoria = () => {

        let json = {
            "tipo": this.state.grupal ? "Grupal" : "Individual",
            "costo": this.state.costo.replace("$", ""),
            "materias": [this.state.course],
            "direccion": this.state.selectedAddress,
            "fecha": this.state.selectedDate,
            "duracion": 2,
            "descripcion": "lorem5",
            "cuposRestantes": this.state.cupos
        };
        fetch("https://radiant-hollows-88985.herokuapp.com/users/fjgonzalez/monitorias",
            {
                method: 'POST',
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.text())
            .then(response =>
                console.log("Success" + response))
            .catch(error =>
                console.log("Error" + error)
            );
    }

    componentDidMount() {
        
        fetch('https://radiant-hollows-88985.herokuapp.com/users/fjgonzalez')
            .then(res => res.json())
            .then(json => { 
                let idsMonitorias = json[0].monitoriasOfrecidas;
                let tempMonitorias = this.state.monitoriasBrindadas;
                for (let index = 0; index < idsMonitorias.length; index++) 
                {
                    let monit = idsMonitorias[index];
                    fetch('https://radiant-hollows-88985.herokuapp.com/monitorias/'+monit)
                    .then(res => res.json())
                    .then(json => {
                        tempMonitorias.push(json[0]);
                    })
                    
                }
                this.setState({
                    monitoriasBrindadas: tempMonitorias
                })

            }
            );
    }


    MyVerticallyCenteredModal = (props) => {
        const selectedDate = this.state.selectedDate;
        const setSelectedDate = this.setSelectedDate;

        const selectedAddress = this.state.selectedAddress;
        const setSelectedAddress = this.setSelectedAddress;

        const course = this.state.course;
        const setCourseNewTutoria = this.setCourseNewTutoria;

        const costo = this.state.costo;
        const setCosto = this.setCost;

        const cupos = this.state.cupos;
        const setCupos = this.setCupos;

        const grupal = this.state.grupal;
        const setGrupal = this.setGrupal;

        const crearTutoria = this.crearTutoria;

        const showModal = this.state.modalShow;
        return (
            <Modal show={showModal}
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Modal.Title className="text-center" id="contained-modal-title-vcenter">
                        Crear una nueva tutoría.
              </Modal.Title>
                    <Row>
                        <Col md={6} xs={6}>
                            <TextField
                                required
                                id="standard-required"
                                label="Materia"
                                defaultValue={course}
                                onChange={setCourseNewTutoria}
                                className="materia"
                                margin="normal"
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">

                                    <KeyboardDateTimePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Fecha"
                                        disablePast="true"
                                        format="MM/dd/yyyy HH:mm"
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                </Grid>
                            </MuiPickersUtilsProvider>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={grupal}
                                            onChange={setGrupal}
                                            value="grupal"
                                        />
                                    }
                                    label="Grupal"
                                    margin="normal"

                                />
                            </FormGroup>

                        </Col>
                        <Col md={6} xs={6}>
                            <TextField
                                required
                                id="standard-required"
                                label="Dirección"
                                defaultValue={selectedAddress}
                                onChange={setSelectedAddress}
                                className="address"
                                margin="normal"
                            />
                            <TextField
                                id="adornment-amount"
                                value={costo}
                                onChange={setCosto}
                                label="Costo"
                                margin="normal"
                            />
                            {this.state.grupal ? <TextField
                                id="cupos"
                                value={cupos}
                                onChange={setCupos}
                                label="Cupos"
                                margin="normal"
                                type="number"
                            /> : false}

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" className="modalButtons" onClick={crearTutoria}>Guardar cambios</Button>
                    <Button variant="outline-success" className="modalButtons" onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
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

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={7} className="text-center">
                        <strong id="mistutorias">Mis tutorias</strong>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.monitoriasBrindadas.map((e,i) => <TutoriaBrindada key={i} value={e}/>)}
                        </div>
                    </Col>
                </Row>
                <this.MyVerticallyCenteredModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
            </div>
        )
    }
}
