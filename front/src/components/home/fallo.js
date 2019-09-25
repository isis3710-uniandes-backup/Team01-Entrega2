import React, { Component } from 'react'

export default class fallo extends Component {
    render() {
        return (
            <div>
                {this.props.value }
                <p>RUTA NO PERMITIDA, Inicie sesion.</p>
            </div>
        )
    }
}
