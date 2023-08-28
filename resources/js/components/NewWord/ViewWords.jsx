import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Menu from '../Login/ToggleMenu';
import MenuForUser from '../Login/ToggleMenuForUser';
import { Link } from 'react-router-dom';

const Words = () => {
    const [words, setWords] = useState([]);
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
        getWordsData();
    }, []);

    const getWordsData = async () => {
        axios
        .get('/api/words')
        .then(response => {
            setWords(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    };
    // 戻るボタン
    const history = useHistory();
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    const [selectedWord, setSelectedWord] = useState(null);

    const handleWordClick = async(wordId) => {
        try { 
            const response = await axios.get(`/api/words/${wordId}`);
            setSelectedWord(response.data);
        } catch {
            console.log('失敗しちゃった');
        }
    };

    return (
        <div className="mylist"> 
            {user && user.status === 2 ? 
            <Menu />
            : 
            <MenuForUser />
            }
            <h1>単語一覧</h1>
            <table>
                <tbody>
                    {words.map(word => (
                        <tr key={word.id}>
                            <td>No.{word.num}</td>
                            <td>{word.ja}</td>
                            <td>{word.en}</td>
                            <td className="word-edit">
                                <Link to={`/word/${word.id}`} onClick={() => handleWordClick(word.id)}>
                                    <button>編集</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back-word">
                <a onClick={handleBack}>↩︎戻る</a>
                <Link to="/create-new-word">
                    <img src="/img/info.png" className="new-word"/>
                </Link>
            </div>
        </div>
    )
}
export default Words;