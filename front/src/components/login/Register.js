import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellidos: "",
            usuario: "",
            contrasenia: "",
            telefono: "",
            email: "",
            cedula: "",
            rePassword: "",
            esTutor: false,
            changeLogInStatus: this.props.changeLogInStatus
        }
        this.changeValue = this.changeValue.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    changeValue(e) {
        if (e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
        } else if (e.target.id === "nombre") {
            this.setState({
                nombre: e.target.value
            });
        } else if (e.target.id === "contrasenia") {
            this.setState({
                contrasenia: e.target.value
            });
        } else if (e.target.id === "usuario") {
            this.setState({
                usuario: e.target.value
            });
        } else if (e.target.id === "telefono") {
            this.setState({
                telefono: e.target.value
            });
        } else if (e.target.id === "cedula") {
            this.setState({
                cedula: e.target.value
            });
        } else if (e.target.id === "apellido") {
            this.setState({
                apellidos: e.target.value
            });
        }
        else if (e.target.id === 'custom-checkbox') {
            this.setState({
                esTutor: !this.state.esTutor
            })
        } else {
            this.setState({
                rePassword: e.target.value
            });
        }

    }

    signUp() {
        if (this.state.contrasenia === this.state.rePassword) {
            var usr;
            fetch('/users/' + this.state.usuario)
                .then(res => res.json())
                .then(data => usr = data[0]);
            console.log(usr);
            if (usr === undefined) {
                try {
                    if (this.state.esTutor) {
                        fetch('https://radiant-hollows-88985.herokuapp.com/users/tutors', {
                            method : 'POST',
                            body :  JSON.stringify({
                                nombre: this.state.nombre,
                                apellidos: this.state.apellidos,
                                usuario: this.state.usuario,
                                contrasenna: this.state.contrasenia,
                                telefono: this.state.telefono,
                                email: this.state.email,
                                cedula: this.state.cedula
                            }), // data can be `string` or {object}!
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                            .then(json => {
                                this.state.changeLogInStatus(this.state.usuario);
                            })
                            .catch(error => console.error('Error:', error));
                    }
                    else {

                        fetch('https://radiant-hollows-88985.herokuapp.com/users/students', {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify({
                                nombre: this.state.nombre,
                                apellidos: this.state.apellidos,
                                usuario: this.state.usuario,
                                contrasenna: this.state.contrasenia,
                                telefono: this.state.telefono,
                                email: this.state.email,
                                cedula: this.state.cedula,
                                monitoriasRealizadas: []
                            }), // data can be `string` or {object}!
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => res.json())
                            .then(json => {
                                this.state.changeLogInStatus(this.state.usuario);
                            })
                            .catch(error => console.error('Error:', error));
                    }
                } catch (e) {
                    console.log(e);

                }
            }
        }
    }

    render() {
        return (

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Join Us</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form.Check
                            custom
                            type='checkbox'
                            id={`custom-checkbox`}
                            label={`Quiero ser tutor`}
                            onClick={this.changeValue}
                        />
                         <div className="row">
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <input id="nombre" type="text" className="form-control" aria-label="nombre" placeholder="nombre" varia-describedby="basic-addon1" value={this.state.nombre} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="apellido" type="text" className="form-control" aria-label="apellido" placeholder="apellido" varia-describedby="basic-addon1" value={this.state.apellido} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="email" type="text" className="form-control" aria-label="email" placeholder="email" aria-describedby="basic-addon1" value={this.state.email} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="cedula" type="text" className="form-control" aria-label="cedula" placeholder="cedula" aria-describedby="basic-addon1" value={this.state.cedula} onChange={this.changeValue}></input>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="input-group mb-3">
                                    <input id="telefono" type="number" className="form-control" aria-label="telefono" placeholder="telefono" aria-describedby="basic-addon1" value={this.state.telefono} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="usuario" type="text" className="form-control" aria-label="usuario" placeholder="usuario" aria-describedby="basic-addon1" value={this.state.usuario} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="contrasenia" type="password" className="form-control" placeholder="contraseña" aria-label="password" aria-describedby="basic-addon1" value={this.state.contrasenia} onChange={this.changeValue}></input>
                                </div>
                                <div className="input-group mb-3">
                                    <input id="rePassword" type="password" className="form-control" placeholder="confirmar contraseña" aria-label="re-password" aria-describedby="basic-addon1" value={this.state.rePassword} onChange={this.changeValue}></input>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={this.signUp} data-dismiss="modal">Registrarme</button>
                    </div>
                </div>
            </div>
        );

    }
}
export default Register;