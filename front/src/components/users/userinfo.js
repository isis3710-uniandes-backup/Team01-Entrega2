import React, { Component } from 'react';
import { Col, Row, Button, Nav, Image,Form} from 'react-bootstrap';
import '../../styles/userinfo.css';
import userimage from '../../assets/imgs/usr.png';
import TutoriaRealizada from './tutoriarealizada';

var isDefined =true;
export default class userinfo extends Component {

     

    constructor(props){
        super(props);

        this.state={

            estado: "mostrarForm",
            usuario:this.props.location.state.user,
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
        fetch('https://radiant-hollows-88985.herokuapp.com/users/'+this.state.usuario)
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
                let idsMonitorias = data.monitoriasRealizadas
                let tempMonitorias = this.state.monitoriasRealizadas;
                
                if(!(typeof (idsMonitorias) === "undefined"))
                {
                    for (let index = 0; index < idsMonitorias.length; index++) 
                    {
                        let monit = idsMonitorias[index];
                        fetch('https://radiant-hollows-88985.herokuapp.com/monitorias/'+monit)
                        .then(res => res.json())
                        .then(json => {
                            tempMonitorias.push(json[0]);
                        })   
                    }
                }
                else{
                    isDefined = false;
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
        let ruta = "https://radiant-hollows-88985.herokuapp.com/users/students/"+this.state.usuario;
        let metodo = 'PUT';
        console.log(this.state.nombre);
        let json = {
            "nombre": this.state.nombre,
            "apellidos": this.state.apellidos,
            "email": this.state.email,
            "telefono": this.state.telefono,
            "cedula": this.state.cedula
        };

        fetch(ruta,
            {
                method: metodo,
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.text())
            .then(response =>
                console.log("Success" + response))
            .catch(error =>
                console.log("Error" + error)
            );
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
        if(isDefined === false && this.state.estado ==="mostrarForm")
        {
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
                                        <h2 id="name" >{this.state.nombre} {this.state.apellido}</h2>
                                        <h6>@{this.state.usuario}</h6>
                                    </div>
                                    
                                    <ul className="list-unstyled components">
                                        <li>
                                            <a onClick={this.mostrarForm}>Ajustes de cuenta</a>
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
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleNombre}
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
                                        <Button id="actualizar" onClick={this.putRequest}>Actualizar</Button>
                                    </Form>
                            </div>  
                            </Col>
                        </Row>
                    </div>
            )
        }
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
                                        <h2 id="name" >{this.state.nombre} {this.state.apellido}</h2>
                                        <h6>@{this.state.usuario}</h6>
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
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control 
                                            onChange = {this.handleNombre}
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
                                        <Button id="actualizar" onClick={this.putRequest}>Actualizar</Button>
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
                                        <h2 id="name" >{this.state.nombre} {this.state.apellidos}</h2>
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
                            <div id="form" className="text-center">  
                                <h1>Mis tutorias.</h1>
                                {this.state.monitoriasRealizadas.map((e,i) => <TutoriaRealizada key={i} value={e}/>)}
                            </div>  
                            </Col>
                        </Row>
                    </div>
        )
    }
    }
}