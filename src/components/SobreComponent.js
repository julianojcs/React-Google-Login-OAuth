import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

class Sobre extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Página de Sobre</h1>
                    <Link to='/' className="App-link App-intro">Home</Link>
                </header>
            </div>
        );
    }
}
export default Sobre;