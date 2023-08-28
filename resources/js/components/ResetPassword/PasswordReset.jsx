import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

function PasswordReset() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const { token, email } = useParams(); // パスからトークンを取得

  const handlePasswordReset = () => {
    axios.post('/password/reset', {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token
    })
    .then(response => {
      setMessage('パスワードが変更されました');
      window.location.href = '/login';
    })
    .catch(error => {
      setMessage('エラーが発生しました');
    });
  };

  return (

    <div className="main">
        <div className="container">
            <div className="reset">
                <h1>パスワード再発行</h1>
                <p>新しいパスワードを入力してください。</p>
                <input
                    type="password"
                    placeholder="新しいパスワード"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="新しいパスワード（確認用）"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                />
                <div className="reset_btn">
                    <button onClick={handlePasswordReset}>変更する</button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    </div>
  );
}

export default PasswordReset;
