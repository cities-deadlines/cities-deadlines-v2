import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { withSession } from '../session';

class PropertyPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmationModalOpen: false
        }
    }
    
    onCloseSubmit = () => {
        this.props.setProperty(null);
    }

    render() {
        return (
            <>

                {/* property panel */}
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

                    {/* property name */}
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px'
                        }}
                    >
                        {this.props.property.id}
                    </div>

                    {/* property info */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',

                            width: '250px',
                            padding: '20px',

                            backgroundColor: 'white',
                            borderRadius: '5px',
                            fontSize: '15px'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>Price</div>
                            <div>{this.props.property.price}</div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: '15px'
                            }}
                        >
                            <div>Growth (Last Hour)</div>
                            <div>{this.props.property.hourGrowth}</div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: '15px'
                            }}
                        >
                            <div>Growth (Last Day)</div>
                            <div>{this.props.property.dayGrowth}</div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: '15px'
                            }}
                        >
                            <div>Growth (Last Week)</div>
                            <div>{this.props.property.weekGrowth}</div>
                        </div>
                    </div>

                    {/* purchase button */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {/* {(this.props.userData.id !== this.props.property.owner) && */}
                            <Button
                                onClick={this.props.onBuyPropertySubmit}
                                variant='dark'
                                size='sm'
                                style={{ width: '250px' }}
                            >
                                Buy Property
                            </Button>
                        {/* } */}

                        <Button
                            onClick={this.onCloseSubmit}
                            variant='dark'
                            size='sm'
                            style={{
                                marginTop: '10px',
                                width: '250px'
                            }}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default withSession(PropertyPanel);