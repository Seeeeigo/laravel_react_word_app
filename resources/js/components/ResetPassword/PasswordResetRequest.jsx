import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordResetRequest = () => {
        axios.post('/password/email', { email })
        .then(response => {
            setMessage('再設定用のURLを、入力していただいたアドレスに送信しました。ご確認ください。');
        })
        .catch(error => {
            setMessage('エラーが発生しました');
        });
    };

    const history = useHistory();

    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

  return (
    <div className="main">
        <div className="container">
            <div className="reset">
                <h1>パスワード再発行</h1>
                <p>ご登録いただいたメールアドレスを入力してください。パスワードをリセット/作成いたします。</p>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="reset_btn">
                    <button onClick={handlePasswordResetRequest}>再発行</button>
                </div>
                <p>{message}</p>
                <div className="back">
                    <a onClick={handleBack}>↩︎戻る</a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PasswordResetRequest;
