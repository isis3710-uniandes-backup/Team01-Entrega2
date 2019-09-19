import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import {Container} from 'react-bootstrap'

import Navbar from './navbar'
import Home from './home/home'

export default class tutofinder extends Component {
    render() {
        return (
            <div>
                <Container>
                <BrowserRouter>
                        <div>
                            <Navbar />
                            <Route exact path="/" component={Home} />
                            <p>Hola amigos</p>
                        </div>
                    </BrowserRouter>
                </Container>
            </div>
        )
    }
}
