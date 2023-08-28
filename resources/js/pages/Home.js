import React, {useEffect, useState} from 'react';
import BigLogo from '../components/Common/BigLogo';
import Menu from '../components/Login/ToggleMenu';
import MenuForUser from '../components/Login/ToggleMenuForUser';
import Infos from '../components/Info/Infos';

function Home() {

    const handleClick = () => {
        window.location.href = '/test_words'
    };

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
                {user && user.status === 2 ?   
                <Menu />
                : 
                <MenuForUser />
                }
                <BigLogo />
                <div className="test_btn">
                    <img src="../../img/11k.png"/>
                    <button onClick={handleClick} className="word-test">単語テストに挑戦する</button>
                </div>
                <Infos />
            </div>
        </div>
    );
}

export default Home;