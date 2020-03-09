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
            setProperty: this.setProperty,
            setFetching: this.setFetching,
            updateUserData: this.updateUserData
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            user => {
                user ?
                    this.setState({ user: user }) :
                    this.setState({ user: null });
            }
        );
    }

    componentWillUnmount() {
        this.listener && this.listener();
        this.listener = undefined;
    }

    setProperty = property => {
        this.setState({ property: property });
    }

    setFetching = fetching => {
        this.setState({ fetching: fetching });
    }

    updateUserData = () => {

    }

    render() {
        return (
            <SessionContext.Provider value={this.state}>

                {/* loading spinner */}
                <LoaderSpinner />
                
                {/* home page overlay */}
                <HomePage />

                {/* map page underlay*/}
                <MapPage />
            </SessionContext.Provider>
        );
    }
}

export default withFirebase(App);