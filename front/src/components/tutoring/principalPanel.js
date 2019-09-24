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
        all : []
    }
    componentDidMount(){
        fetch( `${url}/monitorias`)
        .then(res => res.json())
        .then(json =>
            this.setState({
                all : json
            }));
        this.cargarTutorias();
    }
    cargarTutorias()
    {
        let temp = this.state.tutorias;
        fetch( `${url}/categories/${this.state.idCategoria}/tutors`)
        .then(res => res.json())
        .then(json => {
            let tutores = json;
            tutores.forEach(element => {
                fetch(`${url}/users/${element.usuario}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    let x = json.monitoriasOfrecidas;
                    for (let index = 0; index < x.length; index++) 
                    {
                        const elemento = x[index];
                        if(elemento.categoria === this.state.nombre)
                        {
                            temp.push(elemento);
                        }
                    }
                })
            });
        }
     );
     this.setState({
         tutorias : temp
     })
    }

    refresh = (i, nombre) => {
        this.setState({
            nombre : nombre
        })
        var actual = document.getElementsByClassName("nav-link-panel-actual");
        actual[0].classList.add("nav-link-panel");
        actual[0].classList.remove("nav-link-panel-actual");
        var element = document.getElementById(i);
        element.classList.add("nav-link-panel-actual");
        element.classList.remove("nav-link-panel");
    }
    render() {
        return (
            <div id="principalPanel">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col md={3} className="filters">
                            <h2>Categorias</h2>
                            <Nav className="flex-column">
                                <Nav.Item>
                                    <Nav.Link className=" nav-link nav-link-panel" eventKey="todos">Todos</Nav.Link>
                                </Nav.Item> 
                                {this.state.categories.map((e, i) => e.nombre !==this.state.nombre ? <Nav.Item key={i}>
                                    <Link className="nav-link nav-link-panel" id={i} onClick={ev => this.refresh(i,e.nombre)} to={{ pathname: '/categories/'+e.nombre}}>{e.nombre}</Link>
                                </Nav.Item> : <Nav.Item key={i}>
                                    <Nav.Link  className="nav-link nav-link-panel-actual">{e.nombre}</Nav.Link>
                                </Nav.Item>  )}
                            </Nav>
                        </Col>
                        <Col className="tutoriasCategoria" md={9}>
                            <Tab.Pane eventKey="todos">
                                {this.state.all.map((e,i)=> <Tutoria/>)}
                            </Tab.Pane>
                            <Tab.Content>
                                {this.state.tutorias.map((e, i) => <Tutoria key={i} value={e}/>)}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }
}
