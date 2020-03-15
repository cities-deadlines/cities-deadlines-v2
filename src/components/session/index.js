import React from 'react';

const SessionContext = React.createContext({
    user: null,
    userData: null,
    property: null,
    fetching: false,
    updateUserData: () => {},
    setProperty: () => {},
    updateProperty: () => {},
    setFetching: () => {}
});

const withSession = Component => props => (
    <SessionContext.Consumer>
        {session => 
            <Component 
                {...props} 
                user={session.user} 
                userData={session.userData}
                property={session.property} 
                fetching={session.fetchingUser || session.fetchingProperty || session.fetchingPayment}
                updateUserData={session.updateUserData}
                setProperty={session.setProperty}
                updateProperty={session.updateProperty}
                setFetching={session.setFetching}
            />
        }
    </SessionContext.Consumer>
);

export { SessionContext, withSession };
