import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { withFirebase } from '../firebase';

class UnauthOverlay extends Component {
    onSignInSubmit = event => {
        this.props.firebase
            .doSignIn()
            .catch(err => {
                console.log('Sign In: ' + err);
            });

        event.preventDefault();
    }

    render() {
        return (
            <>
                <Button
                    onClick={this.onSignInSubmit}
                    variant='outline-dark'
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px'
                    }}
                >
                    Join with Google
                </Button>
            </>
        );
    }
}

export default withFirebase(UnauthOverlay);