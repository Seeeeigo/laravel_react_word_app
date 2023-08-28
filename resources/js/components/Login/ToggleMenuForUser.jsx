import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function MenuForUser() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const history = useHistory();

  const handleLogout = async () => {
    try {
        const accessToken = localStorage.getItem('access_token'); // アクセストークンを取得
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        await axios.post('/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                'X-CSRF-TOKEN': csrfToken
            }
        });
        localStorage.removeItem('access_token'); // アクセストークンを削除
        history.push('/login');
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="App">
      <header>
        <div className='hamburger-button' onClick={toggleMenu}>
          ☰<img className={`img-open ${menuOpen ? 'active' : ''}`} src="./img/ham-menu-image01.png" />
            <img className={`img-close ${menuOpen ? 'active2' : ''}`} src="./img/ham-menu-image02.png"/>
        </div>
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/home">ホーム</a></li>
            <li><a href="/words">単語リスト一覧</a></li>
            <li><a href="/test_words">単語テスト</a></li>
            <li><a href="/mylist-page">マイ単語帳</a></li>
            <li><a href="/mypage">マイページ</a></li>
            <li><button onClick={handleLogout}>ログアウト</button></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default MenuForUser;

