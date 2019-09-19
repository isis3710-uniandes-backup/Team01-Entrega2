import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            usuario: "",
            contrasenia: "",
            telefono: "",
            email: "",
            cedula: "",
            rePassword: "",
            changeLogInStatus: this.props.changeLogInStatus
        }
        this.changeValue = this.changeValue.bind(this);
//        this.singUp = this.singUp.bind(this);
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
        }else if (e.target.id === "usuario") {
            this.setState({
                usuario: e.target.value
            });
        }else if (e.target.id === "telefono") {
            this.setState({
                telefono: e.target.value
            });
        } else if (e.target.id === "cedula") {
            this.setState({
                cedula: e.target.value
            });
        }else {
            this.setState({
                rePassword: e.target.value
            });
        }

    }
    /*
    singUp() {
        if (this.state.password === this.state.rePassword) {
            var usr;
            fetch('/users' + this.state.usuario)
                .then(res => res.json())
                .then(data => usr = data.user)
            if (usr !== undefined) {
                try {
                    fetch('/users', {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify({
                            nombre: this.state.nombre,
                            usuario: this.state.usuario,
                            contrasenia: this.state.contrasenia,
                            telefono: this.state.telefono,
                            email: this.state.email,
                            cedula: this.state.cedula
                        }), // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(this.state.changeLogInStatus);
                } catch (e) {
                    console.log(e)
                        ;
                }
            }
        } else {
            alert("The user already exist");
        }
    }
    */
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
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Nombre</span>
                            </div>
                            <input id="nombre" type="text" className="form-control" aria-label="nombre" aria-describedby="basic-addon1" value={this.state.nombre} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Email</span>
                            </div>
                            <input id="email" type="text" className="form-control" aria-label="email" aria-describedby="basic-addon1" value={this.state.email} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Documento</span>
                            </div>
                            <input id="cedula" type="text" className="form-control" aria-label="cedula" aria-describedby="basic-addon1" value={this.state.cedula} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Telefono</span>
                            </div>
                            <input id="telefono" type="number" className="form-control" aria-label="telefono" aria-describedby="basic-addon1" value={this.state.telefono} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Usuario</span>
                            </div>
                            <input id="usuario" type="text" className="form-control" aria-label="usuario" aria-describedby="basic-addon1" value={this.state.usuario} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Contrasenia</span>
                            </div>
                            <input id="contrasenia" type="password" className="form-control" aria-label="password" aria-describedby="basic-addon1" value={this.state.contrasenia} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Re-Type Password</span>
                            </div>
                            <input id="rePassword" type="password" className="form-control" aria-label="re-password" aria-describedby="basic-addon1" value={this.state.rePassword} onChange={this.changeValue}></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={this.logIn} data-dismiss="modal">Registrarme</button>
                    </div>
                </div>
            </div>
        );

    }
}
export default Register;