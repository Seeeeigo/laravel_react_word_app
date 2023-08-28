import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Menu from '../Login/ToggleMenu';
import Pagination from '../Info/Pagination'

const viewUsers = () => {

    // ログイン認証
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
        getUsersData();
    }, []);

    // ユーザー一覧を取得する
    const [users, setUsers] = useState([]);

    const getUsersData = async () => {
        axios 
        .get('/api/get-user-all')
        .then(response => {
            setUsers(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました')
        });
    }

    // 戻るボタン
    const history = useHistory();
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    // ページネーション設定
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // 1ページあたりの情報数

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="users-list"> 
            <Menu/>
            <h1>登録者一覧</h1>
            <table>
                <tbody>
                        <tr>
                            <th>No.</th>
                            <th>ニックネーム</th>
                            <th>email</th>
                            <th>会員</th>
                        </tr>
                    {visibleUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td className="user-edit">
                                <Link to={`/edit-user-list/${user.id}`}>
                                    <button>編集</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="back-word">
                <a onClick={handleBack}>↩︎戻る</a>
            </div>
            <div className="pagination">
                {/* ページネーションコンポーネントに渡す */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={users.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
};

export default viewUsers;