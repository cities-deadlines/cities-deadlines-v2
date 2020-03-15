import React, { Component } from 'react';

import PurchaseConfirmationModal from './confirmation';
import UserPanel from './user';
import PropertyPanel from './property';
import { withSession } from '../session';

class AuthHomeOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationModalOpen: false
        }
    }

    onBuyPropertySubmit = () => {
        this.setState({ confirmationModalOpen: true });
    }

    closeConfirmationModal = () => {
        this.setState({ 
            confirmationModalOpen: false
        }, () => {
            this.props.updateUserData();
            this.props.updateProperty();
        });
    }

    render() {
        return (
            <>
                
                {/* purchase confirmation modal */}
                {this.state.confirmationModalOpen &&
                    <PurchaseConfirmationModal 
                        id={this.props.property.id}
                        price={this.props.property.price}
                        back={this.closeConfirmationModal}
                    />
                }

                {/* home overlay */}
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

                    {/* user panel (top) */}
                    <UserPanel />
                    
                    {/* property panel (bottom) */}
                    {this.props.property &&
                        <PropertyPanel
                            onBuyPropertySubmit={this.onBuyPropertySubmit}
                        />
                    }
                </div>
            </>
        );
    }
}

export default withSession(AuthHomeOverlay);