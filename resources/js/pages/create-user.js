import React from 'react';
import CreateUserForm from '../components/Common/CreateUserForm';
import BigLogo from '../components/Common/BigLogo';

function CreateUser () {
    return (
        <div className="main">
            <div className="container">
                <BigLogo />
                <div className="add_ttl">
                    <span>アカウント新規登録</span>
                </div>
                <div className="add_info">
                    <CreateUserForm />
                </div>
            </div>
        </div>
    );
}

export default CreateUser;