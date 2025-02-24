import React, { Component } from 'react'
import LogIn from "./login/LogIn"
import Register from "./login/Register"
import UserLogo from "../assets/imgs/usr.png"
import '../styles/navbar.css'
import logo from "../assets/imgs/logotype2.png"
import { Link } from "react-router-dom"
const url = "https://tutofinder.herokuapp.com";


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorias: [],
            busqueda: "",
            usuario: "",
            logueado: false,
            logFunc: this.props.logFunc
        }
        this.changeValue = this.changeValue.bind(this);
        this.loguear = this.loguear.bind(this);
    //    this.changeURL = this.changeURL.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);

    }
    loguear(usr) {
        this.setState({
            usuario: usr,
            logueado: true
        });
        this.state.logFunc(usr);
    }
    cerrarSesion() {
        this.setState({
            usuario: "",
            logueado: false
        });
        this.state.logFunc("");
    }
    componentDidMount() {
        fetch(url + '/categories')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    categorias: json
                })
            });

    }
    changeValue(e) {
        this.setState({
            busqueda: e.target.value
        });

    }
/*     changeURL() {
>>>>>>> a60c479709d409eda436610137386af05c3cac92
        if (this.state.categorias.includes(this.state.busqueda)) {
            var theURL = window.location.pathname;
            var path = theURL.split("/");
            if (path.length >= 4) {
                return theURL.replace(path[3], this.state.busqueda);
            } else {
                //return location.replace("https://tutofinder.herokuapp.com/" + this.state.busqueda);

            }
        }
        //Set URL

<<<<<<< HEAD
    }
=======
    } */
    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light" value={this.state.usuario}>
                    <Link className="navbar-brand" to="/"><img className="img-circle" src={logo} alt="Logo de la compania" width="40" height="40"></img><strong id="tutofinder">TutoFinder</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categorias
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {this.state.categorias.map((e, i) => <a className="dropdown-item" href={e.rutaFront} key={i}>{e.nombre}</a>)}
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0 ">
                            <input id="search" className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" value={this.state.busqueda} onChange={this.changeValue}></input>
                            <Link to={{
                                pathname : '/categories/' + this.state.busqueda,
                                state : {
                                    category : this.state.busqueda,
                                    categories : this.state.categorias
                                }}} id="buscarButton" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.changeURL}>Buscar</Link>
                        </form>
                        {this.state.logueado ? <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <div className="btn-group dropleft">
                                    <button type="button" className="btn btnImagen dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img className="img-circle" src={UserLogo} alt="Logo of an user" width="30" height="30"></img> </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to={{
                                            pathname: '/users/' + this.state.usuario,
                                            state: {
                                                user: this.state.usuario
                                            }
                                        }}>Ajustes de cuenta</Link>
                                        <Link className="dropdown-item" to={{
                                            pathname: '/tutor/' + this.state.usuario,
                                            state: {
                                                user: this.state.usuario
                                            }
                                        }}>Soy tutor</Link>
                                        <Link className="dropdown-item" to={{
                                            pathname: '/'
                                        }} onClick={this.cerrarSesion}>Cerrar sesion</Link>
                                    </div>
                                </div>
                            </li>
                        </ul> : <ul className="navbar-nav">
                                <li className="nav-item">
                                    <button type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal">
                                        Inicia sesión </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <LogIn changeLogInStatus={this.loguear} />
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn btn-outline-light" data-toggle="modal" data-target="#exampleModal2">
                                        Regístrate </button>
                                </li>
                                <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <Register changeLogInStatus={this.loguear} />
                                </div>
                            </ul>}



                    </div>


                </nav>

            </div >
        )
    }
}
