import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class dashboardtutor extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md={6}>
                        <Row style={{backgroundColor : 'white' }}>
                            <Col>
                            <h1>Crear nueva tutoria</h1>
                            </Col>
                        </Row>
                        <Row style={{backgroundColor : 'yellow' }}>
                            <Col>
                            <h1>Stats</h1>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} style={{backgroundColor : 'red' }}>
                    <h1>Listado de tutorias</h1>
                    </Col>
                </Row>
            </div>
        )
    }
}
