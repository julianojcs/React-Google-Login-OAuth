import React, { Component } from 'react';
import '../App.css';
import { GoogleLogin } from 'react-google-login';

class GLogin extends Component{
    render(){
        return(
            <GoogleLogin
                clientId={this.props.clientId}
                onFailure={event => this.props.onFailure(event)} 
                onSuccess={event => this.props.onSuccess(event)}
                // onRequest={this.loading}
                // onSuccess={this.success}
                // onFailure={this.error}
                // onAutoLoadFinished={console.log("finished")}
                // buttonText={`Google ${this.state.count}`}
                theme="dark"
                className="btnGoogleLogin w-50"
            >
                <span className="spnGoogleLogin">Google</span>
            </GoogleLogin>
        )
    }
};


export default GLogin;