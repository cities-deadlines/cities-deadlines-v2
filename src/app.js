import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoaderSpinner from './loader';
import HomePage from './components/home';
import MapPage from './components/map';
import { SessionContext } from './components/session';
import { withFirebase } from './components/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userData: null,
            property: null,
            fetching: true,
            initialAuthChange: false,
            setUserData: this.setUserData,
            setProperty: this.setProperty,
            setFetching: this.setFetching
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            user => { 
                if (user) this.setState({ user: user }, this.setUserData);
                else this.setState({
                    user: null,
                    fetching: false, 
                    initialAuthChange: true 
                });
            }
        );
    }

    componentWillUnmount() {
        this.listener && this.listener();
        this.listener = undefined;
    }

    setUserData = () => {
        this.setState({ fetching: true }, () => {
            this.props.firebase.fetchUserData()
                .then(userData => {
                    if (userData) this.setState({ 
                        userData: userData,
                        fetching: false,
                        initialAuthChange: true
                    });
                    else throw new Error ('Error fetching user data.');
                })
                .catch(err => {
                    console.log('setUserData: ' + err); 
                    this.setState({ 
                        userData: null,
                        fetching: false,
                        initialAuthChange: true
                    });
                });
        });
    }

    setProperty = id => {
        if (!id) {
            this.setState({ property: null });
            return;
        }

        this.setState({ fetching: true }, () => {
            this.props.firebase.fetchProperty(id)
                .then(property => {
                    if (property) this.setState({ 
                        property: property,
                        fetching: false
                    });
                    else throw new Error ('Error fetching property.');
                })
                .catch(err => { 
                    console.log('setProperty: ' + err); 
                    this.setState({ 
                        property: null,
                        fetching: false
                    });
                });
        });
    }

    setFetching = fetching => {
        this.setState({ fetching: fetching });
    }

    render() {
        return (
            <SessionContext.Provider value={this.state}>

                {/* loading spinner */}
                <LoaderSpinner />
                
                {/* home page overlay */}
                {this.state.initialAuthChange && <HomePage />}

                {/* map page underlay*/}
                <MapPage />
                
            </SessionContext.Provider>
        );
    }
}

export default withFirebase(App);