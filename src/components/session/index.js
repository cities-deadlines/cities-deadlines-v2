import React from 'react';

const SessionContext = React.createContext({
    user: null,
    userData: null,
    property: null,
    fetching: false,
    setProperty: () => {},
    setFetching: () => {},
    updateUserData: () => {}
});

const withSession = Component => props => (
    <SessionContext.Consumer>
        {session => 
            <Component 
                {...props} 
                user={session.user} 
                userData={session.userData}
                property={session.property} 
                fetching={session.fetching}
                setProperty={session.setProperty}
                setFetching={session.setFetching}
                updateUserData={session.updateUserData}
            />
        }
    </SessionContext.Consumer>
);

export { SessionContext, withSession };