import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared';

export const postUser = (userId, firstname, lastname, mobile, email, imageURL, agree) => (dispatch) => {
    const newUser = {
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        email: email,
        imageURL: imageURL,
        agree: agree,
    }
    newUser.date = new Date().toISOString();

    return fetch(baseUrl + 'users', {
        method: 'POST',
        body: JSON.stringify(newUser), 
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())  //Retorna a resposta do servidor em formato json
    .then(response => dispatch(addUser(response)))   //Atualiza a store
    .catch(error => { console.log('Post users', error.message);
        alert('Usuário não pode ser criado\nError: '+ error.message); })
}

export const fetchUsers = () => (dispatch) => {
    return fetch(baseUrl + 'users')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
}

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER, 
    payload: user
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

