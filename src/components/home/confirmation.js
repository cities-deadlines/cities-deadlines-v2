import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Loader from'react-loader-spinner';

import { withFirebase } from '../firebase';

class PurchaseConfirmationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            success: '',
            fetching: false,
        }
    }

    handleConfirmationSubmit = () => {
        this.setState({ fetching: true }, () => {
            this.props.firebase.purchaseProperty(this.props.id).then(data => {
                if (data.success) {
                    this.setState({ 
                        success: 'Successfully purchased property.',
                        fetching: false
                    });
                }
                else {
                    if (!data.message) throw Error('Cannot resolve error');
                    else this.setState({ 
                        error: data.message,
                        fetching: false
                    });
                }
            })
            .catch(err => {
                console.log('handleConfirmationSubmit: ' + err);
                this.setState({ 
                    error: 'Unexpected client error. Please wait and try again.',
                    fetching: false
                });
            });
        });
    }

    handleBackSubmit = () => {
        this.setState({ 
            error: '', 
            success: '',
            fetching: false
        }, () => {
            this.props.back();
        });
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 3,

                    height: '100%',
                    width: '100%',

                    backdropFilter: 'blur(5px)'
                }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Confirm Purchase</Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            flexDirection: 'column',
                        }}
                    >

                        {this.state.fetching ?
                            <Loader
                                type='Oval'
                                color='grey'
                                height={50}
                                width={50}
                            /> :

                            <>
                                <div>
                                    Are you sure you want to purchase&nbsp;
                                    <b>{this.props.id}</b> for&nbsp;
                                    <b>{this.props.price}</b>?
                                </div>

                                {this.state.error &&
                                    <div
                                        style={{
                                            marginTop: '6px',
                                            color: '#dc3545',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {this.state.error}
                                    </div>
                                }

                                {this.state.success &&
                                    <div
                                        style={{
                                            marginTop: '6px',
                                            color: '#28a745',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {this.state.success}
                                    </div>
                                }
                            </>
                        }

                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            className='mr-auto'
                            variant='secondary'
                            onClick={this.handleBackSubmit}
                        >
                            Back
                        </Button>

                        {!this.state.fetching && !this.state.error && !this.state.success &&
                            <Button
                                variant='dark'
                                onClick={this.handleConfirmationSubmit}
                            >
                                Submit
                            </Button>
                        }
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default withFirebase(PurchaseConfirmationModal);