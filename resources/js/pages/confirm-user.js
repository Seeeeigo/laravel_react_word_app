import React from 'react';
import ConfirmPage from '../components//Common/ConfirmPage'
import BigLogo from '../components/Common/BigLogo';

function ConfirmUser () {
    return (
        <div className="main">
            <div className="container">
                <BigLogo />
                <div className="confirm_info">
                    <ConfirmPage />
                </div>
            </div>
        </div>
    );
}

export default ConfirmUser;