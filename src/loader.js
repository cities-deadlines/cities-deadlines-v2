import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { withSession } from './components/session';

class LoadingSpinner extends Component {
    render() {
        return (
            <>
                {this.props.fetching &&
                    <div    
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 3,

                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',

                            overflow: 'hidden',
                            userSelect: 'none',
                            msUserSelect: 'none',
                            KhtmlUserSelect: 'none',
                            MozUserSelect: 'none'
                        }}
                    >
                        <Loader
                            type='Oval'
                            color='grey'
                            height={150}
                            width={150}
                        />
                    </div>
                }
            </>
        );
    }
}

export default withSession(LoadingSpinner);