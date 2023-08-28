import React from 'react';
import CompletionPage from '../components/Common/CompletionPage';
import BigLogo from '../components/Common/BigLogo';

function CompleteUser () {
    return (
        <div className="main">
            <div className="container">
                <BigLogo />
                <div className="add_info">
                    <CompletionPage />
                </div>
            </div>
        </div>
    );
}

export default CompleteUser;