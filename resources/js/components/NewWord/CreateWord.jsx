import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Menu from '../Login/ToggleMenu';

const CreateWord = () => {

    const [userLoggedIn, setUserLoggedIn] = useState(false);

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

    const [words, setWords] = useState({
        num:'',
        ja:'',
        en:'',
        ex:'',
        ja_ex:'',
        fortest:'',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWords((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/create-word', words);
            history.push('/words');
        } catch (error) {
                console.error('エラー:', error);
        }
    };

    // 戻るボタン
    const history = useHistory();
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <div className="main">
            <div className="container">
                <Menu />
                <div className="word_info">
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dd><input type="text" name="num" placeholder="No." value={words.num} onChange={handleChange}/></dd>
                            <dd><input type="text" name="ja" placeholder="日本語訳" value={words.ja} onChange={handleChange}/></dd>
                            <dd><input type="text" name="en" placeholder="英単語/フレーズ" value={words.en} onChange={handleChange}/></dd>
                            <dd><textarea type="text" name="ex" placeholder="例文" value={words.ex} onChange={handleChange} className="ex"></textarea></dd>
                            <dd><textarea type="text" name="ja_ex" placeholder="例文和訳" value={words.ja_ex} onChange={handleChange} className="ja_ex"></textarea></dd>
                            <dd><textarea type="text" name="fortest" placeholder="テスト用の例文" value={words.fortest} onChange={handleChange} className="ex"></textarea></dd>
                            <div className="word_btn">
                                <button type="submit">新規作成</button>
                            </div>
                            <div className="back">
                                <a onClick={handleBack}>↩︎戻る</a>
                            </div>
                        </dl>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default CreateWord;
