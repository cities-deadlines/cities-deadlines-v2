import React, { Component } from 'react';

import { withFirebase } from '../firebase';
import { withSession } from '../session';

class MapUnderlay extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: 1,

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
                [MAP]
            </div>
        );
    }
}

export default withFirebase(withSession(MapUnderlay));;