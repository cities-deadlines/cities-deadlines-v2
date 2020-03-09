import React, { Component } from 'react';

import UnauthOverlay from './unauth';
import AuthOverlay from './auth';
import { withFirebase } from '../firebase';
import { withSession } from '../session';

class HomePage extends Component {
    render() {
        if (this.props.user && this.props.userData) var content = <AuthOverlay />;
        else content = <UnauthOverlay />;

        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2,

                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',

                    overflow: 'hidden',
                    userSelect: 'none',
                    msUserSelect: 'none',
                    KhtmlUserSelect: 'none',
                    MozUserSelect: 'none',
                    filter: this.props.fetching ? 'blur(3px)' : 'blur(0px)'
                }}
            >
                {content}
            </div>
        );
    }
}

export default withFirebase(withSession(HomePage));
