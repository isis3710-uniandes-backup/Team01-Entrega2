import React, { Component } from 'react';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rememberMe: false,
            changeLogInStatus:this.props.changeLogInStatus
        };
        this.changeValue = this.changeValue.bind(this);
        this.logIn = this.logIn.bind(this);
        this.changeCK = this.changeCK.bind(this);
    }
    logIn() {
        if (this.state.email !== "" && this.state.password !== "") {
            fetch('/users/'+this.state.email)
            .then(res => res.json())
            .then(json => {
                if(json.password===this.state.password){
                    this.state.changeLogInStatus(json.usuario);
                    alert("Welcome");
                }else{
                    alert("Please chek the email and the password");
                }
            });  
        } else {
            alert("Please fill all the fields");
        }
    }
    changeValue(e) {
        if (e.target.id === "email") {
            this.setState({
                email: e.target.value
            });
        } else {
            this.setState({
                password: e.target.value
            });
        }
    }
    changeCK() {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    }

    render() {
        return (

            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Welcome Again</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input id="email" type="text" placeholder="email" className="form-control" aria-label="email" aria-describedby="basic-addon1" value={this.state.email} onChange={this.changeValue}></input>
                        </div>
                        <div className="input-group mb-3">
                            <input id="password" placeholder="contraseña" type="password" className="form-control" aria-label="password" aria-describedby="basic-addon1" value={this.state.password} onChange={this.changeValue}></input>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="defaultUnchecked" onChange={this.changeCK}></input>
                            <label class="custom-control-label" for="defaultUnchecked">Remember Me</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.logIn} data-dismiss="modal">Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;