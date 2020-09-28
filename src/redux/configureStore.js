import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Users } from './users.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Cadastro} from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: Users,
            ...createForms ({
                feedback: Cadastro
            })
        }), 
        applyMiddleware(thunk, logger)
    );
    
    return store;
}