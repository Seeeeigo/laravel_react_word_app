import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Login/ToggleMenu';
import MenuForUser from '../Login/ToggleMenuForUser';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AllMyList = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [words, setWords] = useState([]);
    const history = useHistory();
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

    // マイリストの単語一覧を取得する

    const getMylistWordsData = async () => {
        axios
        .get('/mylist-words')
        .then(response => {
            setWords(response.data);
        })
        .catch(() => {
            console.log('マイリストの取得に失敗しました');
        });
    };

    // 戻るボタン
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <div className="mylist"> 
            {user && user.status === 2 ? 
            <Menu />
            : 
            <MenuForUser />
            }
            <h1>マイリスト単語一覧</h1>
            <table>
                <tbody>
                    {words.map(word => (
                        <tr key={word.id}>
                            <td>No.{word.num}</td>
                            <td>{word.ja}</td>
                            <td>{word.en}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back-word">
                <a onClick={handleBack}>↩︎戻る</a>
            </div>
            <div className="mylist-test-btn">
                <button>
                    <Link to="/test_mylist-words">マイリスト単語テストを始める</Link>
                </button>
            </div>
        </div>
    )
};

export default AllMyList;