import React, { Component } from 'react'

export default class principalPanel extends Component {
    state = {
        nombre : (this.props.location.state !== undefined ? this.props.location.state.category : this.props.location.pathname.replace("/categories/"))
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}
