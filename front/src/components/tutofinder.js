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
                            { !this.state.logueado ?  <div>
                            <Route exact path="/tutor/:username" component={DashBoardTutor} />
                            <Route exact path="/users/:user" component={UserInfo} />
                            <Route path="/categories/:category" component={principalPanel} />
                            </div> : <Fallo/> }
                 
                        </div>
                </BrowserRouter>
            </div>
        )
    }
}
