import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import DashBoardTutor from './tutoring/dashboardtutor';
import Navbar from './navbar';
import Home from './home/home';
import Fallo from './home/fallo';
import UserInfo from './users/userinfo';
import principalPanel from './tutoring/principalPanel';

export default class tutofinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logueado: false,
            usuario: ""
        }
        
        this.loguear = this.loguear.bind(this);
    }
    loguear(usuario){
        this.setState({
            logueado: !this.state.logueado,
            usuario: usuario
        });
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                
                        <div>
                            <Navbar logFunc={this.loguear}/>
                            <Route exact path="/" component={Home} />
                            { this.state.logueado ?  <div>
                            <Route exact path="/tutor/:username" component={DashBoardTutor} />
                            <Route exact path="/users/:user" component={UserInfo} />
                            <Route path="/categories/:idCategory" component={principalPanel} />
                            <Route component={Fallo}/>
                            </div> : <Fallo value={this.state.logueado}/> }
                 
                        </div>
                </BrowserRouter>
            </div>
        )
    }
}
