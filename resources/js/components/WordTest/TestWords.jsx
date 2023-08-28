import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Login/ToggleMenu';
import MenuForUser from '../Login/ToggleMenuForUser';

function TestWords() {
    const [words, setWords] = useState([]);
    const [user, setUser] = useState(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
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
        // ユーザーテスト進捗情報の取得
        axios.get('/user-test-progress')
            .then(response => {
                setCurrentWordIndex(response.data.currentWordIndex);
            })
            .catch(error => {
                console.error('Failed to fetch user test progress:', error);
            });

        // テスト用の単語を取得
        axios.get('/words-test')
            .then(response => {
                setWords(response.data.words);
            })
            .catch(error => {
                console.error('Failed to fetch words for test:', error);
            });
    }, []);

    const handleAnswer = (answer) => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(prevIndex => prevIndex + 1);
        } else {
            clearCurrentWordIndex();
        }
        if (answer == 'NO') {
            // NOを選択した時の処理
            axios.post('/add-word-to-mylist', {
                word_id: words[currentWordIndex].id
            })
            .then(response => {
                console.log('NOが押された単語がマイリストに追加されました');
            })
            .catch(error => {
                console.error('単語の追加に失敗しました', error);
            });
            }
    };

    const handleInterrupt = () => {
        // テスト中断位置をDBに保存
        axios.post('/save-user-test-progress', { currentWordIndex })
            .then(response => {
                console.log('中断位置が保存されました', currentWordIndex);
                clearCurrentWordIndex();
                window.location.href = '/home'; // ホームページにリダイレクト
            })
            .catch(error => {
                console.error('中断位置の保存に失敗しました', error);
            });
    };

    const clearCurrentWordIndex = () => {
        sessionStorage.removeItem('currentWordIndex');
        setCurrentWordIndex(0);
    };

    return (
        <div className="main">
            <div className="container">
                {user && user.status === 2 ?   
                <Menu />
                : 
                <MenuForUser />
                }
            {currentWordIndex < words.length ? (
                <div className="word-test-box">
                    <div className="test-box">
                        <p className="test-number">{words[currentWordIndex].num}問目</p>
                        <p className="ja-ex">{words[currentWordIndex].ja_ex}</p>
                        <p className="fortest">{words[currentWordIndex].fortest}</p>
                        <p className="test-now">{words[currentWordIndex].num}/300</p>
                    </div>
                        <p className="check">一瞬で声に出して回答できましたか？</p>
                        <p className="check2">また、120%正解の自信がありますか？</p>
                    <div className="answer-btn">
                        <button className="yes" onClick={() => handleAnswer('YES')}>YES</button>
                        <button className="no" onClick={() => handleAnswer('NO')}>NO</button>
                    </div>
                    <div className="interrupt-btn">
                        <button onClick={handleInterrupt}>テストを中断する</button>
                    </div>
                </div>
        ) : (
            <p>Loading...</p>
        )}
            </div>
        </div>
    );
}

export default TestWords;
