import React, { Component } from 'react';
import { Col, Row, Button, Nav, Image,Form} from 'react-bootstrap';
import '../../styles/userinfo.css';
import userimage from '../../imgs/usr.png';
import TutoriaRealizada from './tutoriarealizada';


export default class userinfo extends Component {

    constructor(props){
        super(props);

        this.state={
            estado: "mostrarForm",
            usuario:this.props.usuario,
            nombre:this.props.nombre,
            apellidos:this.props.apellidos,
            contrasenna:this.props.contrasenna,
            telefono: this.props.telefono,
            email:this.props.email,
            cedula: this.props.cedula,
            monitoriasRealizadas:[],
            img: userimage
        };
    }

    componentDidMount() {
        fetch('https://radiant-hollows-88985.herokuapp.com/users/a')
            .then(res => res.json())
            .then(json => {
                let data = json[0];
                let user = data.usuario;
                let name = data.nombre;
                let lastName = data.apellidos;
                let contra = data.contrasenna;
                let telf = data.telefono;
                let correo = data.email;
                let ced = data.cedula;
                let idsMonitorias = data.monitoriasRealizadas;
                let tempMonitorias = this.state.monitoriasRealizadas;
                for (let index = 0; index < idsMonitorias.length; index++) 
                {
                    let monit = idsMonitorias[index];
                    fetch('https://radiant-hollows-88985.herokuapp.com/monitorias/'+monit)
                    .then(res => res.json())
                    .then(json => {
                        tempMonitorias.push(json[0]);
                    })   
                }
                this.setState({
                    usuario:user, 
                    nombre:name, 
                    apellidos:lastName, 
                    contrasenna:contra, 
                    telefono:telf, 
                    email:correo, 
                    cedula:ced,
                    monitoriasRealizadas:tempMonitorias
                })

            }
            );
    }

    putRequest=()=>{

    }

    mostrarTutorias=()=>{
        this.setState(
            {estado:"mostrarTutorias"}
        )
    }

    mostrarForm=()=>{
        this.setState(
            {estado:"mostrarForm"}
        )
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

    render() {

        if(this.state.estado ==="mostrarForm")
        {
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
                                        <li>
                                            <a onClick={this.mostrarForm}>Ajustes de cuenta</a>
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
                                <h1>Información de tu cuenta</h1>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Usuario</Form.Label>
                                            <Form.Control
                                            onChange = {this.handleUser}
                                            value ={this.state.usuario} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleUser}
                                            value ={this.state.nombre} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Apellidos</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleApellido}
                                            value ={this.state.apellidos} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Correo</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleEmail}
                                            value ={this.state.email} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Telefono</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleTelefono}
                                            value ={this.state.telefono} />
                                        </Form.Group>
                                        <Form.Group >
                                            <Form.Label>Cedula</Form.Label>
                                            <Form.Control 
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
    else{
        
        return(
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
                                        <li>
                                            <a onClick={this.mostrarForm}>Ajustes de cuenta</a>
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
                                <h1>Mis tutorías</h1>
                                {this.state.monitoriasRealizadas.map((e,i) => <TutoriaRealizada key={i} value={e}/>)}
                            </div>  
                            </Col>
                        </Row>
                    </div>
        )
    }
    }
}
