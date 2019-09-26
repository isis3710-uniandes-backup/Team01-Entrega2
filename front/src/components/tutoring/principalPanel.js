import React, { Component } from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"

import Tutoria from './tutoria';
import '../../styles/principalPanel.css';
const url = "https://tutofinder.herokuapp.com";

export default class principalPanel extends Component {
    state = {
        nombre: (this.props.location.state !== undefined ? this.props.location.state.category : this.props.location.pathname.replace("/categories/","")),
        categories: this.props.location.state.categories,
        idCategoria : this.props.location.state.idCategory,
        tutorias : [],
        usuario: ""
    }
    componentDidMount(){
        this.cargarTutorias();
        let x = document.getElementsByClassName("navbar")
        this.setState({usuario: x[0].getAttribute("value")})
    }
    cargarTutorias()
    {
        let temp = [];
        fetch( `${url}/categories/${this.state.idCategoria}/tutors`)
        .then(res => res.json())
        .then(json => {
            let tutores = json;
            tutores.map(element => {
                fetch(`${url}/users/${element}`)
                .then(res => res.json())
                .then(tutor => {
                    let x = tutor[0].monitoriasOfrecidas;
                    x.map(elemt => {
                        fetch(`${url}/monitorias/${elemt}`)
                            .then(res => res.json())
                            .then(monitoria => {
                                console.log(monitoria);
                                if(monitoria[0].categoria == this.state.idCategoria){
                                    temp.push(monitoria);
                                }
                            })
                            .then(e => {
                                this.setState({
                                    tutorias: temp
                                }, () => {
                                    this.forceUpdate();
                                });
                            });
                    });
                })
            });
        }
     );
    }

    refresh = (ev, i, nombre, id) => {
        this.setState({
            nombre : nombre,
            idCategoria : id
        });
        this.cargarTutorias();
        var actual = document.getElementsByClassName("nav-link-panel-actual");
        actual[0].classList.add("nav-link-panel");
        actual[0].classList.remove("nav-link-panel-actual");
        var element = document.getElementById(i);
        element.classList.add("nav-link-panel-actual");
        element.classList.remove("nav-link-panel");
        this.actualizarTodos();
    }
    actualizarTodos = () => {
        this.setState({
            mostrarTodos : !this.state.mostrarTodos
        })
    }

    render() {
        return (
            <div id="principalPanel">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col md={3} className="filters">
                            <h2>Categorias</h2>
                            <Nav className="flex-column">
                                {this.state.categories.map((e, i) => e.nombre !==this.state.nombre ? <Nav.Item key={i}>
                                    <Link className="nav-link nav-link-panel" id={i} onClick={ev => this.refresh(ev,i,e.nombre,e._id )} to={{ pathname: '/categories/'+e.nombre}}>{e.nombre}</Link>
                                </Nav.Item> : <Nav.Item key={i}>
                                    <Nav.Link  className="nav-link nav-link-panel-actual">{e.nombre}</Nav.Link>
                                </Nav.Item>  )}
                            </Nav>
                        </Col>
                        <Col className="tutoriasCategoria" md={9}>
                            <Tab.Content>
                                <Row>
                                {this.state.tutorias.map((e, i) => <Col key={i} md={4}><Tutoria key={i} value={e[0]} usuario={this.state.usuario}/></Col>)}
                                </Row>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}
