import React, { Component } from 'react'
import { Col, Row, Card, Modal, Button } from 'react-bootstrap';
import '../../styles/dashboardtutor.css';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

export default class dashboardtutor extends Component {

    state = {
        modalShow: false,
        selectedDate: new Date()
    }

    setModalShow = state => {
        this.setState({
            modalShow: state
        })
    };
    setSelectedDate = date => {
        this.setState({
            selectedDate: date
        })
    };
    MyVerticallyCenteredModal = (props) => {
        const selectedDate = this.state.selectedDate;
        const setSelectedDate = this.setSelectedDate;

        return (
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Crear una nueva tutoría.
              </Modal.Title>
                    <Row>
                        <Col md={6}>
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
                        </Col>
                        <Col md={6}>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" className="modalButtons" onClick={props.onHide}>Guardar cambios</Button>
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
                                        <img onClick={() => this.setModalShow(true)} className="img-fluid float-left rounded-circle shadow " alt="Nueva tutoria" id="plus" src="/plusIcon.svg" />
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
                    <Col md={7} >
                        <Card>
                            <Card.Body>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <this.MyVerticallyCenteredModal show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
            </div>
        )
    }
}
