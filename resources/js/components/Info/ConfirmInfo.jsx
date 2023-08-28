import React, {useState, useEffect} from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function ConfirmInfo() {
    const location = useLocation();
    const infoData = location.state && location.state.infoData;
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            // サーバーサイドにaccess_tokenを送信してログイン状態を確認
            axios.post('/api/check-login', {}, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                if (response.data.loggedIn) {
                    setUserLoggedIn(true);
                } else {
                    setUserLoggedIn(false);
                }
            })
            .catch(error => {
                // エラーハンドリング
                console.log('ログイン状態確認中にエラーが起きました');
            });
        }
    }, []);

    const handleConfirm = async () => {
        if (!infoData) {
            console.error('フォームデータが存在しません');
            return;
        }
        try {
            console.log('送信するフォームデータ:', infoData);
            const response = await axios.post('/complete-info', infoData);
            history.push('/home');
        } catch (error) {
            console.error('エラーレスポンス:', error.response);
        }
    };

    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    // 改行文字をHTMLの改行要素に変換する関数
    function renderBodyWithLineBreaks(text) {
        const lines = text.split('\n');
        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return (
        <div className="new_info_check">
            <form>
                <dl>
                {infoData && (
                    <dd>
                        <input type="hidden" name="title"/>
                        <span>{infoData.title}</span>
                    </dd>
                )}
                {infoData && (
                    <dd>
                        <input type="hidden" name="body" />
                        <p>{renderBodyWithLineBreaks(infoData.body)}</p>
                    </dd>
                )}
                    <div className="info_check_button">
                        <button type="button" onClick={handleConfirm}>投稿</button>
                    </div>
                    <div className="check_back">
                        <a onClick={handleBack}>↩︎戻る</a>
                    </div>
                </dl>
            </form>
        </div>
    );
}

export default ConfirmInfo;