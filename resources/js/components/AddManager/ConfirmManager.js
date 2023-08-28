import React from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function ConfirmManager() {
    const location = useLocation();
    const formData = location.state && location.state.formData;

    const history = useHistory();

    const handleConfirm = async () => {
        if (!formData) {
            console.error('フォームデータが存在しません');
            return;
        }

        try {
            console.log('送信するフォームデータ:', formData);
            const response = await axios.post('/create-user', formData);
            history.push('/completion');
        } catch (error) {
            console.error('エラーレスポンス:', error.response);
        }
    };

    return (
        <div className="add-manager">
            <div className="add-manager-form">
                <div className="add_ttl">
                    <span>確認画面</span>
                </div>
                <div className="confirm_info">
                    <dl>
                        <dt>ニックネーム</dt>
                        <dd>{formData.name}</dd>
                        <dt>メールアドレス</dt>
                        <dd>{formData.email}</dd>
                        <dt>パスワード</dt>
                        <dd>{formData.password}</dd>
                        <div className="confirm_btn">
                            <img src="../../img/11t.png"/>
                            <button onClick={handleConfirm}>登録する</button>
                        </div>
                    </dl>
                    <Link
                        to={{
                            pathname: '/create-manager-form', // 前のページのURL
                            state: { formData: formData } // フォームデータを渡す
                        }}
                    >
                        ↩︎戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConfirmManager;