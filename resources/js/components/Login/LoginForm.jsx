import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const LoginForm = () => {
    // リダイレクトの状態を管理するステート変数
    // const [redirectToHome, setRedirectToHome] = useState(false); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const response = await fetch('/validate-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('access_token', data.access_token); // アクセストークンを保存
            history.push('/home'); // リダイレクトを実行
            window.location.reload();
        } else {
            setErrors(data.errors);
        }
    };

    // if (redirectToHome) {
    //     return <Redirect to="/home" />; // リダイレクトを実行
    // }

    return (
        <div className="login_info">
            <form onSubmit={handleSubmit}>
                {/* ... */}
                <dt><label htmlFor="email">メールアドレス</label></dt>
                <dd>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="current-email"/>
                    {errors.email && <div className="err_msg"><p>{errors.email[0]}</p></div>}
                </dd>
                <dt><label htmlFor="password">パスワード</label></dt>
                <dd>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
                    {errors.password && <div className="err_msg"><p>{errors.password[0]}</p></div>}
                </dd>
                <dd>
                {errors.length > 0 && (
                    <div className="err_msg">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                    <div className="login_btn">
                        <img src="../../img/11k.png" alt="Login" />
                        <button type="submit">ログイン</button>
                    </div>
                </dd>
            </form>
        </div>
    );
};

export default LoginForm;