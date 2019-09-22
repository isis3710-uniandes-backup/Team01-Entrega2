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



export default class categoria extends Component {

    state = {

        materias: this.props.value.materias,
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


    fetchTutors = (filters, sortBy, callback) => dispatch => {
        return axios
            this.state.tutores
            .then(res => {
                let { products } = res.data;

                if (!!filters && filters.length > 0) {
                    products = products.filter(p =>
                        filters.find(f => p.availableSizes.find(size => size === f))
                    );
                }

                if (!!sortBy) {
                    products = products.sort(compare[sortBy]);
                }

                if (!!callback) {
                    callback();
                }

                return dispatch({
                    type: FETCH_PRODUCTS,
                    payload: products
                });
            })
            .catch(err => {
                console.log('Could not fetch products. Try again later.');
            });
    };



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
