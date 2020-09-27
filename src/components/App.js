import React from 'react';
import { Media } from 'reactstrap';
import '../App.css';
import { GoogleLogout, GoogleLogin } from 'react-google-login';

const clientId = "740785536659-89jlqhqj3ajcrmv7rnmmbnquhv3opvjn.apps.googleusercontent.com";

class App extends React.Component{
    state = {
        familyName: null,
        givenName: null,
        userToken: null,
        imageURL: null,
        name: null,
        email: null,
        googleId: null,
        count: 0
    };
    
    setFamilyName = (familyName) => {
        this.setState({familyName: familyName})
    };
  
    setGivenName = (givenName) => {
        this.setState({givenName: givenName})
    };
  
    setUserToken = (userToken) => {
        console.log(userToken);
        this.setState({userToken: userToken})
    };
  
    setImageURL = (imageURL) => {
        this.setState({imageURL: imageURL})
    };
  
    setName = (name) => {
        this.setState({name: name})
    };

    setEmail = (email) => {
        this.setState({email: email})
    };

    setGoogleId = (googleId) => {
        this.setState({googleId: googleId})
    };

    setEmail = (email) => {
        this.setState({email: email})
    };

    success = (response) => {
        console.log(response);
        this.setState({count: this.state.count + 1});
        this.setFamilyName(response.profileObj.familyName);
        this.setGivenName(response.profileObj.givenName);
        this.setUserToken(response.tokenId);
        this.setImageURL(response.profileObj.imageUrl);
        this.setName(response.profileObj.name);
        this.setEmail(response.profileObj.email);
        this.setGoogleId(response.profileObj.googleId);
    }

    error = (response) => {
        console.error(response)
    }
      
    loading = () => {
        console.log('loading')
    }

    logout = () => {
        alert('logout')
        console.log('logout')

        this.setState({
            familyName: null,
            givenName: null,
            userToken: null,
            imageURL: null,
            name: null,
            email: null,
            googleId: null,
            count: this.state.count + 1
        });
    }
    
    getGoogleLogin = () => {
        return (
            <GoogleLogin
                clientId={clientId}
                onSuccess={this.success}
                onFailure={this.error}
                onRequest={this.loading}
                onAutoLoadFinished={console.log("finished")}
                buttonText={`Login ${this.state.count}`}
            />
        )
    };

    render(){
        if(!this.state.userToken){
            return this.getGoogleLogin();
        }
        return(
            <div>
                <Media className="mb-3" tag="li">
                    <Media left top>
                        <Media className="rounded-circle" width={105} height={105} object src={this.state.imageURL} alt={this.state.name} />
                    </Media>
                    <Media className="ml-5" body>
                        <Media heading>{this.state.name}</Media>
                        <p><b>Given Name: </b>{this.state.givenName}</p>
                        <p><b>Family Name: </b>{this.state.familyName}</p>
                        <p><b>Email: </b>{this.state.email}</p>
                        <p><b>Google Id: </b>{this.state.googleId}</p>
                        <p><b>User Token: </b>{this.state.userToken}</p>
                    </Media>
                </Media>
                <GoogleLogout buttonText={"Logout " + this.state.count} onLogoutSuccess={this.logout} />
            </div>
        )
    }
};


export default App;