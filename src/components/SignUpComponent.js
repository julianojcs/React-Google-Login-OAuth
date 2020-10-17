import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors, actions } from 'react-redux-form'
import { required, minLength, maxLength, validEmail } from '../shared';
import InputPassword from '../components/InputPasswordComponent';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            passwordsMatch: undefined
        };
        // this.handleUpdate = this.handleUpdate.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
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
            },
            credentials: 'same-origin'
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

    // onUpdate={(formValue) => ...} (Function): a handler that is called whenever the form value is updated
    // handleUpdate(formValue) {
        // const pw1 =  formValue.newPassword.value;
        // const pw2 =  formValue.newPassword2.value;
        // const pw1 =  document.getElementById('newPassword').value;
        // const pw2 =  document.getElementById('newPassword2').value;
        // const valido = pw1===pw2;
        // this.setState({
        //     passwordsMatch: valido
        // }) 
        // console.log('Estado: '+this.state.passwordsMatch);
        // console.log(formValue)
        // this.setState({
        //     passwordsMatch: formValue.newPassword.value===formValue.newPassword2.value
        // }) 
    // }

    // onChange={(modelValue) => ...} (Function): a handler that is called whenever the form's model value is changed
    // handleChange(modelValue) {
        // const valido = modelValue.newPassword===modelValue.newPassword2;
        // console.log(modelValue);
        // this.formDispatch(actions.change('cadastro.newEmail', 'bar'));
    // }

    handlePasswordChange() {
        const pw1 =  document.getElementById('newPassword').value;
        const pw2 =  document.getElementById('newPassword2').value;
        const valido = pw1===pw2;
        this.setState({
            passwordsMatch: valido
        }) 
        console.log(this.state.passwordsMatch)
    }

    render() {
        return (
            <>
                <button onClick={this.toggleModal} className="button cadastre-se">{this.props.buttonText}</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Formulário de registro</ModalHeader>
                    <ModalBody>
                        <LocalForm 
                            getDispatch={(dispatch) => this.formDispatch = dispatch}
                            onSubmit={(values) => this.handleSubmit(values)} 
                            // onChange={(form) => this.handleChange(form)} 
                            // onUpdate={(form) => this.handleUpdate(form)} 
                            className="mx-3 mb-neg-rem-1"
                            model="cadastro" //desnecessário. (String): the name of the model in the internal state. This is completely optional, as the model is not related to any external Redux store (default: "local")
                            initialState={{         // (Any): the initial state of the model (default: {})
                                newName: '',
                                newEmail: '',
                                newPassword: '',
                                newPassword2: ''
                            }}
                        >
                            <Row className="form-group">
                                <Label htmlFor="newName">Nome completo</Label>
                                <Control.text model=".newName" className="form-control" id="newName" name="newName" 
                                        placeholder="Nome completo"
                                        validators={{
                                            required, 
                                            minLength: minLength(3)
                                        }} 
                                />
                                <Errors className="errors" 
                                    model=".newName" 
                                    show={(field) => field.touched && !field.focus}
                                    component={(props) => <div className="errors">{props.children}</div>}
                                    messages={{
                                        required: 'Campo obrigatório',
                                        minLength: 'Mínimo de 3 letras'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="'newEmail'">Email</Label>
                                <Control.text model=".newEmail" className="form-control" id="newEmail" name="newEmail" 
                                        placeholder="Email"
                                        validators={{
                                            maxLength: maxLength(60),
                                            validEmail
                                        }} 
                                />
                                <Errors className="errors" 
                                    model=".newEmail" 
                                    show={(field) => field.touched && !field.focus}
                                    component={(props) => <div className="errors">{props.children}</div>}
                                    messages={{
                                        maxLength: 'Máximo de 60 caracteres',
                                        validEmail: 'Email inválido'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={6} className="p-0">
                                    <Label htmlFor="newPassword">Informe uma senha</Label>
                                    <InputPassword 
                                    onChange={() => this.handlePasswordChange()}
                                        model=".newPassword" 
                                        id="newPassword" 
                                        name="newPassword" 
                                        placeholder="Informe uma senha" 
                                        validators={{
                                            minLength: minLength(6), 
                                            maxLength: maxLength(32)
                                        }}
                                    />
                                    <Errors className="errors"
                                        model=".newPassword" 
                                        show={(field) => field.touched && !field.focus}
                                        component={(props) => <div className="errors">{props.children}</div>}
                                        messages={{
                                            minLength: 'Mínimo de 6 caracteres',
                                            maxLength: 'Máximo de 32 caracteres'
                                        }}
                                    />
                                </Col>
                                <Col md={6} className="p-0">
                                    <Label htmlFor="newPassword2">Repita a senha</Label>
                                    <InputPassword 
                                        onChange={() => this.handlePasswordChange()}
                                        model=".newPassword2" 
                                        id="newPassword2" 
                                        name="newPassword2" 
                                        placeholder="Repita a senha" 
                                        validators={{
                                            minLength: minLength(6), 
                                            maxLength: maxLength(32),
                                            // passwordsMatch: this.state.passwordsMatch
                                            //passwordsMatch: this.state.passwordsMatch
                                            //const passwordsMatch = (val1, val2) => val1===val2;
                                        }}
                                    />
                                    <Errors className="errors"
                                        model=".newPassword2" 
                                        show={(field) => field.touched && !field.focus}
                                        component={(props) => <div className="errors">{props.children}</div>}
                                        messages={{
                                            minLength: 'Mínimo de 6 caracteres',
                                            maxLength: 'Máximo de 32 caracteres',
                                            // passwordsMatch: 'Senhas devem ser iguais'
                                        }}
                                    />
                                    {
                                        (this.state.passwordsMatch === false && this.state.passwordsMatch !== undefined)
                                        ? (<div className="errors"><div className="errors">As senhas devem ser iguais</div></div>) 
                                        : ''
                                    }
                                </Col>
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