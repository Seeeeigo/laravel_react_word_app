import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Login/ToggleMenu';
import MenuForUser from '../Login/ToggleMenuForUser';

function MylistTest() {
    const [words, setWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

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
            fetch('/user', {
                method: 'GET',
                credentials: 'include' // 認証情報を送信
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data.user);
                });
        }
        getMylistWordsData();
    }, []);

    const getMylistWordsData = async () => {
        axios
        .get('/mylist-words')
        .then(response => {
            setWords(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    };

    const handleNextWord = () => {
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            clearCurrentWordIndex();
        }
    };

    const handleAnswer = (answer) => {
        if (answer === "YES") {
            const wordId = words[currentWordIndex].id;
            axios.delete(`/remove-word-from-mylist/${wordId}`)
                .then(response => {
                    // マイリストから削除成功
                    // words ステートからも削除する
                    const updatedWords = words.filter(word => word.id !== wordId);
                    setWords(updatedWords);
                })
                .catch(error => {
                    // エラーハンドリング
                    console.log('マイリストから単語を削除できませんでした');
                });
        } else {
            handleNextWord(); // 次の単語に進む
        }
    };

    const clearCurrentWordIndex = () => {
        sessionStorage.removeItem('currentWordIndex');
        setCurrentWordIndex(0);
    };

    if (currentWordIndex >= words.length) {
        return (
            <div className="main">
                <div className="container">
                    {user && user.status === 2 ? 
                    <Menu />
                    : 
                    <MenuForUser />
                    }
                    <div className="end-test">
                        <p>テストが終了しました。</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main">
            <div className="container">
                {user && user.status === 2 ? 
                <Menu />
                : 
                <MenuForUser />
                }
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
                </div>
            </div>
        </div>
    );
}

export default MylistTest;
