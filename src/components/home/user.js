import React, { Component } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

import { withFirebase } from '../firebase';
import { withSession } from '../session';

class UserPanel extends Component {
    onSignOutSubmit = event => {
        this.props.firebase
            .doSignOut()
            .catch(err => {
                console.log('Sign Out: ' + err);
            });

        event.preventDefault();
    }

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                    height: '48%',
                    width: '100%',
                    paddingTop: '25px',
                    paddingBottom: '25px',

                    color: '#36454F',
                    borderRadius: '5px',
                    backgroundColor: '#eeeeee',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.25)'
                }}
            >

                {/* balance + user */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                        width: '85%'
                    }}
                >

                    {/* balance */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            width: '100%',
                            padding: '10px',

                            backgroundColor: 'white',
                            borderRadius: '5px',
                            fontSize: '16px'
                        }}
                    >
                        <div>Balance</div>
                        <div>{this.props.userData.balance}</div>
                    </div>

                    {/* user */}
                    <div
                        style={{
                            marginTop: '10px',
                            fontSize: '14px',
                            fontStyle: 'italic'
                        }}
                    >
                        Signed In as {this.props.user.displayName}
                    </div>
                </div>

                {/* control buttons */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '70%'
                    }}
                >

                    {/* add balance button */}
                    <Button
                        variant='dark'
                        size='sm'
                        style={{ width: '100%' }}
                    >
                        Add Balance
                    </Button>

                    {/* redeem balance button */}
                    <Button
                        variant='dark'
                        size='sm'
                        style={{
                            marginTop: '15px',
                            width: '100%'
                        }}
                    >
                        Redeem Balance
                    </Button>

                    {/* signout button */}
                    <Button
                        onClick={this.onSignOutSubmit}
                        variant='dark'
                        size='sm'
                        style={{
                            marginTop: '15px',
                            width: '100%'
                        }}
                    >
                        Sign Out
                    </Button>
                </div>

                {/* owned properties */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '75%'
                    }}
                >
                    <Dropdown>
                        <Dropdown.Toggle
                            variant='outline-dark'
                            style={{ width: '100%', fontSize: '15px' }}
                        >
                            Your Properties&nbsp;
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            variant='light'
                            style={{ width: '100%', fontSize: '15px' }}
                        >
                            {this.props.userData.properties.map(property => {
                                return (
                                    <Dropdown.Item 
                                        key={property}
                                        onClick={() => { 
                                            this.props.setProperty(property); 
                                        }}
                                    >
                                        {property}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default withSession(withFirebase(UserPanel));