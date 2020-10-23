import React, {Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Card, Button, Label, Row, Col } from 'reactstrap';
import { Toast } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';
import { baseUrl, minLength, maxLength, validEmail } from '../shared';
// import logo from '../logo.svg';
import {ReactComponent as Logo} from '../logo.svg';
import InputPassword from '../components/InputPasswordComponent';
import GLogin from '../components/GoogleLoginComponent';
import SignUp from '../components/SignUpComponent';
import config from '../config'; // ou const config = require('../config')

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            familyName: null,
            givenName: null,
            userToken: null,
            imageURL: null,
            name: null,
            email: null,
            password: undefined,
            signUp: {
                success: undefined,
                message: undefined
            },
            logged: false,
            error: undefined,
            googleId: null,
            value: null,
            isModalOpen: false,
            isToastShown: false
        };

        this.failure = this.failure.bind(this)
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    static displayName = 'LoginForm'

    failure(event) {
        console.log(event.error);
        if (event.error==='popup_closed_by_user') {
            this.setState({
                logged: false,
                signUp: {
                    success: 301,
                    message: 'Google Account Login cancelado pelo usuário!'
                }
            })
        }
    }

    closeMsg = () => {
        this.setState({message: undefined})
    }

    toggle = () => {
        this.setState({isToastShown: !this.state.isToastShown});
    }

    success = (response) => {
        console.log(`Nome: ${response.profileObj.name}`);
        this.setState({
            familyName: response.profileObj.familyName,
            givenName: response.profileObj.givenName,
            userToken: response.tokenId,
            imageURL: response.profileObj.imageUrl,
            name: response.profileObj.name,
            email: response.profileObj.email,
            googleId: response.profileObj.googleId,
            logged: true,
            signUp: {
                success: 200,
                message: 'Usuário autenticado pelo Google Account!'
            },
            message: 'Usuário autenticado pelo Google Account!'
        });

        this.toggle();

        console.log(this.state);
    }

    delay = (t) => {window.setTimeout(()=>{this.setState({isToastShown:false})}, t)}

    handleLoginSubmit(values) {
        let dataToSend = {
            userData: values
        };
        // console.log(dataToSend)
        let url = 'http://localhost:3001/auth/login';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.success) {
                localStorage.setItem('JCS_TOKEN', responseJson.token);
                this.setState({
                    email: values.email,
                    logged: true,
                    error: undefined,
                    signUp: {
                        success: 200,
                        message: 'Usuário autenticado com sucesso!'
                    },
                })
                // console.log(responseJson);
                // console.log(this.state);
                //this.loadUsers()
            }
        }).catch(err => this.setState({ error: err }));
    }

    render() {
        return (
            <>
                  <div className="container vh-100">
                    <Toast onClose={() => this.toggle()} show={this.state.isToastShown} delay={3000} autohide>
                        <Toast.Header className="mx-auto" toggle={{isToastShown: !this.state.isToastShown}}>
                            <img src={this.state.imageURL} width={24} height={24} className="rounded-circle mr-2" alt="" />
                            <strong className="mr-auto">{this.state.name}</strong>
                            <small>logado</small>
                        </Toast.Header>
                        <Toast.Body>
                            {this.state.message}
                        </Toast.Body>
                    </Toast>
                    <div className="col-xs-8 col-sm-8 col-md-10 col-lg-12 mx-auto d-flex vh-100">
                        <Card className="mx-auto my-auto card-login">
                            <div className="text-center">
                                <Logo className="logo-login img-fluid rounded" />
                                {/* <img src={logo} className="logo-login img-fluid rounded" alt="" /> */}
                            </div>
                            <LocalForm onSubmit={(values) => this.handleLoginSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="email" className="py-0" md={3}>E-mail:</Label>
                                    <Col md={9}>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text prepend">
                                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                    </svg>                                           
                                                </span>
                                            </div>
                                            <Control.text model=".email" className="form-control" id="email" name="email" 
                                                placeholder="E-mail"
                                                validators={{
                                                    validEmail
                                                }} 
                                            />
                                        </div>
                                        <Errors className="errors" 
                                            model=".email" 
                                            show={(field) => field.touched && !field.focus}
                                            component={(props) => <div className="errors">{props.children}</div>}
                                            messages={{
                                                validEmail: 'Informar um e-mail válido'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="password" className="py-0" md={3}>Senha:</Label>
                                    <Col md={9}>
                                        <InputPassword 
                                            model=".password" 
                                            id="password" 
                                            name="password" 
                                            icon 
                                            placeholder="Informe uma senha" 
                                            validators={{
                                                minLength: minLength(6), 
                                                maxLength: maxLength(32)
                                            }}
                                        />
                                        <Errors className="errors"
                                            model=".password" 
                                            show={(field) => field.touched && !field.focus}
                                            component={(props) => <div className="errors">{props.children}</div>}
                                            messages={{
                                                minLength: 'Mínimo de 6 caracteres',
                                                maxLength: 'Máximo de 32 caracteres'
                                            }}
                                        />
                                        <Link to="/" className="link-login">Esqueceu sua senha?</Link>
                                    </Col>
                                </Row>
                                <Button type="submit" outline size="sm" className="btn-block">Entrar</Button>
                            </LocalForm>
                            <ul className="list-inline cadastre-se">
                                <li className="list-inline-item">Não tem conta?</li>
                                <li className="list-inline-item"><SignUp buttonText={'Cadastre-se'} /></li>
                            </ul>
                            <div className="divider">
                                <span> ou entre com</span>
                                <hr className="line"/>
                            </div>
                            <GLogin 
                                clientId={config.clientId} 
                                onFailure={ event => this.failure(event) } 
                                onSuccess={ response => this.success(response) } 
                                // onSuccess={ response => this.success(response, this.delay(2000)) } 
                            />
                        </Card>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;