import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Erro404 extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Página enexistente</h1>
                <p>Erro 404.</p>
            </header>
            </div>
        );
    }
}
export default Erro404;