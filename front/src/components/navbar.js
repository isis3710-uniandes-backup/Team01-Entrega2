import React, { Component } from 'react'
import LogIn from "./login/LogIn"
import Register from "./login/Register"

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carreras: [],
            busqueda: "",
            usuario: {},
            logFunc: this.props.logFunc
        }
        this.changeValue = this.changeValue.bind(this);
        this.loguear = this.loguear.bind(this);

    }
    loguear(usr) {
        this.setState({
            usuario: usr
        });
        this.state.logFunc();
    }
    componentDidMount() {
        fetch('/categories')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    carreras: json
                })
            });
    }
    changeValue(e) {
        this.setState({
            busqueda: e.target.value
        });

    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">TutoFinder</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Carreras
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {this.state.carreras.map((e, i) => <a className="dropdown-item" href="#" key={i}>{e.nombre}</a>)}
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">

                            <input id="search" className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" value={this.state.busqueda} onChange={this.changeValue}></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <a type="button" className="nav-link" data-toggle="modal" data-target="#exampleModal">
                                    Log In </a>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <LogIn changeLogInStatus={this.logueado} />
                                </div>
                            </li>
                            <li className="nav-item">
                                <a type="button" className="nav-link" data-toggle="modal" data-target="#exampleModal2">
                                    Register </a>
                            </li>
                            <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <Register changeLogInStatus={this.logueado} />
                            </div>
                        </ul>


                    </div>


                </nav>

            </div >
        )
    }
}
