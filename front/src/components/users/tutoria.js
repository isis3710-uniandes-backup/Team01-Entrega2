import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import '../../styles/usertutoria.css';


export default class tutoria extends Component {

    constructor(props){
        super(props);

        this.state={
            tutor:"",
            valorcobrado: 0,
            calificacion: 0
            };
    }

    render() {

        return (           
                <div id="contenedor">
                    <Card >
                        <Card.Body className="text-right">
                            <strong >Tutor Asociado</strong>
                            <p >{this.state.tutor}</p>
                            <strong >Valor Cobrado</strong>
                            <p >{this.state.valorcobrado}</p>
                            <strong >Calificación</strong>
                            <p >{this.state.valorcobrado}</p>
                        </Card.Body>
                    </Card>
                </div>
           

        )
    }
}
