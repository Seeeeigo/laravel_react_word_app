import React, { useState, useEffect } from 'react';
import Menu from '../Login/ToggleMenu';
import MenuForUser from '../Login/ToggleMenuForUser';
import BigLogo from '../Common/BigLogo';
import { Link } from 'react-router-dom';

function MyPage() {

    const [user, setUser] = useState(null);

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
        fetch('/user', {
            method: 'GET',
            credentials: 'include' // 認証情報を送信
        })
            .then(response => response.json())
            .then(data => {
                setUser(data.user);
            });
    }, []);

  return (
    <div className="main">
        <div className="container">
            <BigLogo />
            {user && user.status === 2 ? 
                <Menu />
                : 
                <MenuForUser />
            }
            <div className="confirm_info">
                {user ? (
                <dl>
                    <dt>ニックネーム</dt>
                    <dd>{user.name}</dd>
                    <dt>メールアドレス</dt>
                    <dd>{user.email}</dd>
                    <div className="confirm_btn">
                        <Link to={`/edit-user/${user.id}`}>
                            <button>変更する</button>
                        </Link>
                    </div>
                </dl>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    </div>
    );
}

export default MyPage;
