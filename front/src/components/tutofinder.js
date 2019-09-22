import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import DashBoardTutor from './tutoring/dashboardtutor';
import Navbar from './navbar'
import Home from './home/home'
import UserInfo from './users/userinfo';

export default class tutofinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logueado: false
        }
        
        this.loguear = this.loguear.bind(this);
    }
    loguear(){
        this.setState({
            logueado: !this.state.logueado
        });
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                        <div>
                            <Navbar logFunc={this.loguear}/>
                            <Route exact path="/" component={Home} />
                            <Route path="/tutor" component={DashBoardTutor} />
                            <Route path="/users/:user" component={UserInfo} />                 
                            <p>Hola amigos</p>
                        </div>
                </BrowserRouter>
            </div>
        )
    }
}
