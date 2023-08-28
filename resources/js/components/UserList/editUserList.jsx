import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import BigLogo from '../Common/BigLogo';
import Menu from '../Login/ToggleMenu';
import { Link } from 'react-router-dom';

const editUserList = () => {

    const {id} = useParams();
    const history = useHistory();
    const [userData, setUserData] = useState(null);
    const [emailError, setEmailError] = useState('');
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
        fetch(`/api/user/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data.user);
            });
    }, [id]);

    // メールアドレス欄の設定
    const isValidEmail = (email) => {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setUserData({ ...userData, email: newEmail });

        // メールアドレスのバリデーション
        if (!isValidEmail(newEmail)) {
            setEmailError('正しいメールアドレスの形式ではありません');
        } else {
            setEmailError('');
        }
    };

    // 変更を保存する
    const handleSave = async () => {
        if (emailError) {
            return; // バリデーションエラーがある場合は保存しない
        }
        const confirmSave = window.confirm('本当に保存しますか？');

        if (confirmSave) {
            try {
                const response = await fetch(`/api/user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    console.log('ユーザー情報が更新されました');
                    history.push('/users');
                } else {
                    console.error('Failed to update user data');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <>
            {userData ? (
                <div className="main">
                    <div className="container">
                        <BigLogo />
                        <div className="word_info">
                        <h1>編集ページ</h1>
                        <form>
                            <dl>
                                <dd><label>ニックネーム</label></dd>
                                <dd><input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                /></dd>
                                <dd><label>メールアドレス</label></dd>
                                <div className="err_msg">
                                    {emailError && <p>{emailError}</p>}
                                </div>
                                <dd><input
                                    type="email"
                                    value={userData.email}
                                    onChange={handleEmailChange}
                                /></dd>
                                <dd><label>会員ステータス</label></dd>
                                {/* <div className="err_msg">
                                    {emailError && <p>{emailError}</p>}
                                </div> */}
                                 <dd><input
                                    type="text"
                                    value={userData.status}
                                    onChange={(e) => setUserData({ ...userData, status: e.target.value })}
                                /></dd>
                                <dd><label>有効フラグ</label></dd>
                                {/* <div className="err_msg">
                                    {emailError && <p>{emailError}</p>}
                                </div> */}
                                 <dd><input
                                    type="text"
                                    value={userData.active_flag}
                                    onChange={(e) => setUserData({ ...userData, active_flag: e.target.value })}
                                /></dd>
                                <div className="save_btn">
                                    <button type="button" onClick={handleSave}>変更を保存する</button>
                                </div>
                            </dl>
                        </form>
                        <div className="edit-user-back">
                            <a onClick={handleBack}>↩︎戻る</a>
                        </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );

};

export default editUserList;