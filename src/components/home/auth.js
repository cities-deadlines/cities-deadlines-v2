import React, { Component } from 'react';

import UserPanel from './user';
import PropertyPanel from './property';
import { withSession } from '../session';

class AuthOverlay extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

                    top: '0px',
                    right: '35px',
                    height: '100%',
                    width: '315px',
                    paddingTop: '2%',
                    paddingBottom: '2%'
                }}
            >
                <UserPanel />
                
                {this.props.property &&
                    <PropertyPanel />
                }
            </div>
        );
    }
}

export default withSession(AuthOverlay);