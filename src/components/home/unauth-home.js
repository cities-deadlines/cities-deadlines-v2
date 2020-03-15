import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { withFirebase } from '../firebase';

class UnauthHomeOverlay extends Component {
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

                {/* home overlay */}
                <div>
                    <Button
                        onClick={this.onSignInSubmit}
                        variant='dark'
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px'
                        }}
                    >
                        Join with Google
                    </Button>
                </div>
            </>
        );
    }
}

export default withFirebase(UnauthHomeOverlay);