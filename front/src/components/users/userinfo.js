import React, { Component } from 'react';
import { Col, Row, Button, Nav, Image,Form} from 'react-bootstrap';
import '../../styles/userinfo.css';


export default class userinfo extends Component {

    constructor(props){
        super(props);

        this.state={
            usuario:"",
            nombre:"",
            apellidos:"",
            contrasenna:"",
            telefono: "",
            email:"",
            cedula:"",
            img: "https://www.pngfind.com/pngs/m/113-1133633_attribution-icon-person-icon-male-icon-icono-persona.png"
        };
    }

    componentDidMount() {
        
    }

    handleNombre = (e)=>{
        this.setState({nombre: e.target.value })
    };

    handleApellido = (e)=>{
        this.setState({apellidos: e.target.value })
    };

    handleEmail = (e)=>{
        this.setState({email: e.target.value })
    };

    handleTelefono = (e)=>{
        this.setState({telefono: e.target.value })
    };

    handleCedula = (e)=>{
        this.setState({cedula: e.target.value })
    };

    mostrarTutorias = ()=>{
        
    };

    render() {
        return (
            
                <div id="contenedor">
                    <Row>
                        <Col  lg={3} md={5} sm={5} id ="panelOpciones">
                        <br></br>
                            <Nav  id="sidebar">
                                <div className="sidebar-header">
                                    <Image id="userImg" src={this.state.img} roundedCircle></Image>
                                    <br></br>
                                    <br></br>
                                    <h2 id="name" >{this.state.usuario}</h2>
                                </div>
                                
                                <ul className="list-unstyled components">
                                    <li className="active">
                                        <a>Ajustes de cuenta</a>
                                    </li>
                                    <li>
                                        <a onClick={this.mostrarTutorias} >Mis tutorías</a>
                                    </li>
                                    <li>
                                        <a >Cerrar sesión</a>
                                    </li>
                                </ul> 
                            </Nav>
                        </Col>
                        
                        <Col lg={8} md={5} sm={5} id="informacion">
                        <div id="form">  
                            <h2>Información de tu cuenta</h2>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control placeholder="Ingrese el título"
                                        onChange = {this.handleUser}
                                        value ={this.state.usuario} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control placeholder="Ingrese el título"
                                        onChange = {this.handleUser}
                                        value ={this.state.nombre} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control placeholder="Ingrese el título"
                                        onChange = {this.handleApellido}
                                        value ={this.state.apellidos} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Correo</Form.Label>
                                        <Form.Control placeholder="Ingrese la descripción"
                                        onChange = {this.handleEmail}
                                        value ={this.state.email} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control placeholder="Ingrese la descripción"
                                        onChange = {this.handleTelefono}
                                        value ={this.state.telefono} />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Cedula</Form.Label>
                                        <Form.Control placeholder="Ingrese la descripción"
                                        onChange = {this.handleCedula}
                                        value ={this.state.cedula} />
                                    </Form.Group>
                                    <Button id="actualizar">Actualizar</Button>
                                </Form>
                        </div>  
                        </Col>
                    </Row>
                </div>
           

        )
    }
}
