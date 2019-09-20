import React, { Component } from 'react'
import {Col,Row, Card} from 'react-bootstrap';
import '../../styles/dashboardtutor.css';

export default class dashboardtutor extends Component {
    render() {
        return (
            <div id="dashboard">
                <Row className="principal">
                    <Col md={5}>
                        <Row className="secundaria">
                            <Col>
                                <Card >
                                    <Card.Body className="text-right">
                                    <img className="img-fluid float-left rounded-circle shadow " alt="Nueva tutoria" id="plus" src="/plusIcon.svg"/>
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
            </div>
        )
    }
}
