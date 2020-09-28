import React, {Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Card, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom';
import { baseUrl, validEmail, clientId } from '../shared/data';
import logo from '../logo.svg';
import InputPassword from './InputPasswordComponent';
import GLogin from './GoogleLoginComponent';

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: null,
            familyName: null,
            givenName: null,
            userToken: null,
            imageURL: null,
            name: null,
            email: null,
            googleId: null
        };

        this.failure = this.failure.bind(this)
    }

    failure(event) {
        console.log(event);
        if (event.error==='popup_closed_by_user') {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
    }

    success = (response) => {
        console.log(`Nome: ${response.profileObj.name}`);
        this.setState({
            familyName: response.profileObj.familyName,
            givenName: response.profileObj.givenName,
            userToken: response.profileObj.userToken,
            imageURL: response.profileObj.imageURL,
            name: response.profileObj.name,
            email: response.profileObj.email,
            googleId: response.profileObj.googleId
        });
    }
  
    render() {
        return (
            <div className="container vh-100">
  				<div className="col-xs-8 col-sm-8 col-md-10 col-lg-12 mx-auto d-flex vh-100">
                    <Card className="mx-auto my-auto card-login">
                        <div className="text-center">
                            <img src={logo} className="logo-login img-fluid rounded" alt="" />
                        </div>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
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
                                        <Errors className="errors" model=".email" show="touched"
                                            messages={{
                                                validEmail: 'Informar um e-mail válido'
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" className="py-0" md={3}>Senha:</Label>
                                <Col md={9}>
                                    <InputPassword model=".password" id="password" name="password" placeholder="Senha" />
                                    <Link to="/" className="link-login">Esqueceu sua senha?</Link>
                                </Col>
                            </Row>
                            <Button type="submit" outline size="sm" className="btn-block">Entrar</Button>
                        </LocalForm>
                        <ul className="list-inline cadastre-se">
                            <li className="list-inline-item">Não tem conta?</li>
                            <li className="list-inline-item"><Link to="/">Cadastre-se</Link></li>
                        </ul>
                        <div className="divider">
                            <span> ou entre com</span>
                            <hr className="line"/>
                        </div>
                        <GLogin 
                            clientId={clientId} 
                            onFailure={ event => this.failure(event) } 
                            onSuccess={ response => this.success(response) } 
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Login;