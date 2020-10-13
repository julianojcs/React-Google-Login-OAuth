import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { required, minLength, maxLength, validEmail } from '../shared';
import InputPassword from '../components/InputPasswordComponent';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        let dataToSend = {
            userData: {
                name: values.newName,
                email: values.newEmail,
                password: values.newPassword
            }
        };

        let url = 'http://localhost:3001/users/register';

        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if (responseJson.success) {
                    this.setState({
                        signUp: {
                            success: true,
                            message: responseJson.message
                        }
                    });
                } else {
                    this.setState({
                        signUp: {
                            success: false,
                            message: responseJson.message
                        }
                    });
                }
            }).catch(err => console.log('Error ', err));
        
        this.toggleModal();
    }

    render() {
        return (
            <>
                <button onClick={this.toggleModal} className="button cadastre-se">{this.props.buttonText}</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Formulário de registro</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="mx-3 mb-neg-rem-1">
                            <Row className="form-group">
                                <Label htmlFor="newName">Nome completo</Label>
                                <Control.text model=".newName" className="form-control" id="newName" name="newName" 
                                        placeholder="Nome completo"
                                        validators={{
                                            required, 
                                            minLength: minLength(3)
                                        }} 
                                />
                                <Errors className="errors" model=".newName" show="touched"
                                    messages={{
                                        required: 'Campo obrigatório',
                                        minLength: 'Mínimo de 3 letras'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="newEmail">Email</Label>
                                <Control.text model=".newEmail" className="form-control" id="newEmail" name="newEmail" 
                                        placeholder="Email"
                                        validators={{
                                            maxLength: maxLength(60),
                                            validEmail
                                        }} 
                                />
                                <Errors className="errors" model=".newEmail" show="touched"
                                    messages={{
                                        maxLength: 'Máximo de 60 caracteres',
                                        validEmail: 'Email inválido'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="newPassword">Password</Label>
                                <InputPassword model=".newPassword" id="newPassword" name="newPassword" placeholder="Senha" />
                            </Row>
                            <Row className="form-group mb-0 ml-auto flex-end">
                                <Button type="submit" color="primary" size="sm">Submit</Button>
                            </Row>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default SignUp;