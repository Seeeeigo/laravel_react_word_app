import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateInfo = () => {

    const [infoData, setInfoData] = useState({
        title: '',
        body:''
    });
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [errors, setErrors] = useState({}); // エラーメッセージを保持するステート

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfoData((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
    };

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/validate-info', infoData);
            setErrors({}); // 成功した場合はエラーをクリア
            history.push('/confirmInfo', { infoData });
            console.log(response);
        } catch (error) {
            console.log(infoData);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // エラーメッセージをステートにセット
            } else {
                console.error('エラー:', error);
            }
        }
    };

    // 戻るボタン
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <div className="new_info">
            <form>
                <dl>
                    <dd>
                        <input type="text" name="title" placeholder="ここにタイトルを入力" value={infoData.title} onChange={handleChange}/>
                    </dd>
                        {errors.title && <div className="info_err_msg">{errors.title[0]}</div>}
                    <dd>
                        <textarea name="body" id="body" cols="30" rows="22" placeholder="ここに内容を入力" value={infoData.body} onChange={handleChange}></textarea>
                    </dd>
                        {errors.body && <div className="info_err_msg">{errors.body[0]}</div>}
                    <div className="info_button">
                        <button  type="button" onClick={handleSubmit}>確認</button>
                    </div>
                    <div className="back">
                        <a onClick={handleBack}>↩︎戻る</a>
                    </div>
                </dl>
            </form>
        </div>
    );
};

export default CreateInfo;
