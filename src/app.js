import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoaderSpinner from './loader';
import HomeOverlay from './components/home';
import MapUnderlay from './components/map';
import { SessionContext } from './components/session';
import { withFirebase } from './components/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userData: null,
            property: null,
            fetchingUser: true,
            fetchingProperty: false,
            fetchingPayment: false,
            initialAuthChange: false,
            updateUserData: this.updateUserData,
            setProperty: this.setProperty,
            updateProperty: this.updateProperty,
            setFetching: this.setFetching
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            user => { 
                if (user) this.setState({ user: user }, this.updateUserData);
                else this.setState({
                    user: null,
                    fetchingUser: false, 
                    initialAuthChange: true 
                });
            }
        );
    }

    componentWillUnmount() {
        this.listener && this.listener();
        this.listener = undefined;
    }

    updateUserData = () => {
        if (!this.state.user) {
            this.setState({ userData: null });
            return;
        }

        this.setState({ fetchingUser: true }, () => {
            this.props.firebase.fetchUserData().then(userData => {
                if (userData) this.setState({ 
                    userData: userData,
                    fetchingUser: false,
                    initialAuthChange: true
                });
                else throw new Error ('Error fetching user data.');
            }).catch(err => {
                console.log('updateUserData: ' + err);
                this.setState({ 
                    userData: {
                        id: this.state.user.uid,
                        balance: 0,
                        properties: []
                    },
                    fetchingUser: false,
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
        
        this.setState({ fetchingProperty: true }, () => {
            this.props.firebase.fetchProperty(id).then(property => {
                if (property) this.setState({ 
                    property: property,
                    fetchingProperty: false
                });
                else throw new Error ('Error fetching property.');
            }).catch(err => { 
                console.log('setProperty: ' + err); 
                this.setState({ 
                    property: null,
                    fetchingProperty: false
                });
            });
        });
    }

    updateProperty = () => {
        if (this.state.property) {
            this.setProperty(this.state.property.id);
        }
    }

    setFetching = (arg, state, callback) => {
        switch(arg) {
            case 'user': this.setState({ fetchingUser: state }, callback); break;
            case 'property': this.setState({ fetchingProperty: state }, callback); break;
            case 'payment': this.setState({ fetchingPayment: state }, callback); break;
            default: break;
        }
    }

    render() {
        return (
            <SessionContext.Provider value={this.state}>

                {/* loading spinner */}
                <LoaderSpinner />
                
                {/* home page overlay */}
                {this.state.initialAuthChange && <HomeOverlay />}

                {/* map page underlay*/}
                <MapUnderlay />
                
            </SessionContext.Provider>
        );
    }
}

export default withFirebase(App);