import * as React from 'react';
import PrivateNavigation from './PrivateNavigation';
import PublicNavigation from './PublicNavigation';

function Navigation() {

    // TODO: isAuthenticated redux'dan gelecek.
    let isAuthenticated = true;
    return (
        isAuthenticated ? <PrivateNavigation /> : <PublicNavigation />
    );
}

export default Navigation 