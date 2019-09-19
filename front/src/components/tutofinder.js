import React, { Component } from 'react'
import Route from 'react-router-dom/Route'
import { BrowserRouter } from 'react-router-dom'
import {Container} from 'react-bootstrap/Container'

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
                        </div>
                    </BrowserRouter>
                </Container>
            </div>
        )
    }
}
