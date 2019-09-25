import React, { Component } from 'react'
import { Col, Row, Card, Modal, Button, FormGroup } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
const url = "https://tutofinder.herokuapp.com";


export default class dashboardtutor extends Component {

    state = {
        modalShow: false,
        selectedDate: new Date(),
        selectedAddress: "Kra 8a #153-51",
        category: "",
        categoryDisplayed: "",
        course: "",
        costo: "$",
        cupos: 0,
        grupal: false,
        monitoriasBrindadas: [],
        tituloModal: "Crear una nueva tutoria.",
        idTutoria: "",
        tutor: this.props.location.state.user,
        categorias: []
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
            modalShow: !this.state.modalShow,
            tituloModal: "Crear una nueva tutoria."
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
            category: evento.target.value.nombre,
            categoryDisplayed: evento.target.value
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
    setActualIdTutoria = (e, id) => {
        console.log(id);
        e.preventDefault();
        this.setState({
            idTutoria: id,
            tituloModal: "Editar",
            modalShow: !this.state.modalShow

        });

    }
    modalTutoria = () => {

        let categoria = this.state.categorias.find(element => {
            return element.nombre === this.state.category;
        });
        let ruta = `${url}/users/${this.state.tutor}/categories/${categoria._id}/monitorias`;
        let metodo = 'POST';
        if (this.state.tituloModal !== "Crear una nueva tutoria.") {
            ruta = url + "/monitorias/" + this.state.idTutoria;
            metodo = 'PUT';
        }
        let json = {
            "tipo": this.state.grupal ? "Grupal" : "Individual",
            "costo": this.state.costo.replace("$", ""),
            "materias": this.state.course,
            "direccion": this.state.selectedAddress,
            "fecha": JSON.stringify(this.state.selectedDate.toString()),
            "duracion": 2,
            "descripcion": "lorem5",
            "cuposRestantes": this.state.cupos
        };
        fetch(ruta,
            {
                method: metodo,
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.text())
            .then(response => {
                console.log("Success" + response);
            });

                 this.setState({
                    modalShow: false,
                    monitoriasBrindadas: this.state.monitoriasBrindadas.filter(e => e._id !== this.state.idTutoria)
                }, () => {console.log(this.state.monitoriasBrindadas)
            this.setState({
                monitoriasBrindadas: this.state.monitoriasBrindadas.concat(JSON.parse(JSON.stringify(json)))
            }, () => {console.error(this.state.monitoriasBrindadas)
            this.forceUpdate(() => console.log("FORZADO"))}) })
        }
        cargarGraficos() {

            let stats = [];
            this.state.monitoriasBrindadas.map((e) => {
                if (e.calificacionServicio === 0) {
                    stats[0]++;
                }
                else if (e.calificacionServicio === 1) {
                    stats[1]++
                }
                else if (e.calificacionServicio === 2) {
                    stats[2]++
                }
                else if (e.calificacionServicio === 2) {
                    stats[2]++
                }
                else if (e.calificacionServicio === 3) {
                    stats[3]++
                }
                else if (e.calificacionServicio === 4) {
                    stats[4]++
                }
                else if (e.calificacionServicio === 5) {
                    stats[5]++
                }
            })

            var p = {
                datasets: [{
                    data: [10, 20, 40, 30, 10, 20],
                    backgroundColor: ["#43efc7", "#484349", "#6243ef", "#f7f0f0", "#8af3ff", "#4362ef"]
                }],
                labels: [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5'
                ]
            };

            var p2 = {
                datasets: [{
                    data: [22, 30, 50, 30, 30, 25],
                    backgroundColor: ["#43efc7", "#484349", "#6243ef", "#f7f0f0", "#8af3ff", "#4362ef"]
                }],
                labels: [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5'
                ]
            };

            var otherSk = document.getElementById("reporte").getContext("2d");
            new Chart(otherSk, {
                type: 'pie',
                data: p,
                options: {
                    legend: {
                        position: 'right',
                        fontFamily: 'Ubuntu',
                        labels: {
                            fontColor: "black"
                        }
                    },
                    animation: {
                        animateScale: true,
                        duration: 2500
                    }
                }
            });

            var otherSk2 = document.getElementById("reporteClie").getContext("2d");
            new Chart(otherSk2, {
                type: 'horizontalBar',
                data: p2,
                options: {
                    animation: {
                        animateScale: true,
                        duration: 2500
                    },
                    legend: {
                        display: false
                    }
                }
            });
        }

        cargarTutorias() {
            fetch(`${url}/users/${this.state.tutor}`)
                .then(res => res.json())
                .then(json => {
                    let idsMonitorias = json[0].monitoriasOfrecidas;
                    let tempMonitorias = this.state.monitoriasBrindadas;
                    idsMonitorias.map(e => {
                        fetch(url + "/monitorias/" + e)
                            .then(res => res.json())
                            .then(json => {
                                if (json.length >= 1) {
                                    tempMonitorias.push(json[0]);
                                }
                            })
                    })
                    this.setState({
                        monitoriasBrindadas: tempMonitorias
                    })
                });
        }

        componentDidMount() {
            this.cargarTutorias();
            this.cargarGraficos();
            this.cargarCategorias();
        }
        cargarCategorias = () => {
            fetch(`${url}/categories/`)
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        categorias: json
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


            const categoryDisplayed = this.state.categoryDisplayed;
            const setCategoria = this.setCategory;

            const titulo = this.state.tituloModal;

            const showModal = this.state.modalShow;
            return (
                <Modal show={showModal}
                    {...props}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <Modal.Title className="text-center" id="contained-modal-title-vcenter">
                            {titulo}
                        </Modal.Title>
                        <Row>
                            <Col md={6} xs={6}>
                                <FormControl className="categoriaForm">
                                    <InputLabel htmlFor="age-helper">Categoría</InputLabel>
                                    <Select
                                        value={categoryDisplayed}
                                        onChange={setCategoria}
                                        inputProps={{
                                            name: 'categoriaForm',
                                            id: 'categoria-helper',
                                        }}
                                    >
                                        {this.state.categorias.map((e, i) =>
                                            <MenuItem value={e} key={i}>{e.nombre}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>Some important helper text</FormHelperText>
                                </FormControl>
                                <TextField
                                    required
                                    id="standard-required2"
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
                        <Button variant="outline-success" className="modalButtons" onClick={this.modalTutoria.bind(this)}>Guardar cambios</Button>
                        <Button variant="outline-success" className="modalButtons" onClick={props.onHide}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            );
        }

        render() {
            console.log("RENDERIZANDO");
            return (
                <div id="dashboard">
                    <Row className="principal">
                        <Col md={5}>
                            <Row className="secundaria">
                                <Col>
                                    <Card id="nuevaTutoria" onClick={this.setModalShow}>
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
                        <Col md={7} className="text-center justify-content-center">
                            <strong id="mistutorias">Mis tutorias</strong>
                            <div className="scrollbar scrollbar-primary">
                                {this.state.monitoriasBrindadas.map((e, i) => <TutoriaBrindada onClick={ev => this.setActualIdTutoria(ev, e._id)} key={i} value={e} />)}
                            </div>
                        </Col>
                    </Row>
                    <this.MyVerticallyCenteredModal show={this.state.modalShow} onHide={this.setModalShow} />
                </div>
            )
        }
    }
