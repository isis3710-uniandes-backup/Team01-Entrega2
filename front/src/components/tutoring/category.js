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

const compare = {
    lowestprice: (a, b) => {
        if (a.calificacion < b.calificacion) return -1;
        if (a.calificacion> b.calificacion) return 1;
        return 0;
    },
    highestprice: (a, b) => {
        if (a.calificacion > b.calificacion) return -1;
        if (a.calificacion < b.calificacion) return 1;
        return 0;
    }
};



export default class Categoria extends Component {

    state = {
        nombre : 'matematicas',
        materias: [],
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
        fetch('https://radiant-hollows-88985.herokuapp.com/'+ this.state.nombre+ '/subjects/')
            .then(res => res.json())
            .then(json => {

                let tempTutores = this.state.tutores;
                let tempMateria = this.state.materias;
                    for (let index = 0; index < json.length; index++)
                    {   tempMateria.push(json[index])

                        for (let index2 = 0; index2 < json[index].tutores.length; index++)
                        {
                            let monit = json[index].tutores[index2];
                            fetch('https://radiant-hollows-88985.herokuapp.com/tutors/'+monit)
                                .then(res => res.json())
                                .then(json => {
                                    tempTutores.push(json[0]);
                                })
                        }

                    }
                    this.setState({
                        tutores: tempTutores

                    })
                    this.setState({
                        materias: tempMateria

                    })


                }
            );
    }


    render() {

        return (
            <div id="dashboard">
                <Row className="principal">

                    <Col md={3} className="text-center">

                        <strong id="tutores">Filtros</strong>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tutores.map((e,i) => <tutor key={i} value={e}/>)}
                        </div>
                    </Col>
                    <Col md={7} className="text-center">

                        <strong id="tutores">Tutores</strong>
                        <div className="scrollbar scrollbar-primary">
                            {this.state.tutores.map((e,i) => <tutor key={i} value={e}/>)}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
