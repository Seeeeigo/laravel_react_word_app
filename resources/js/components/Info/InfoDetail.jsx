import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const InfoDetail = ({ selectedInfo, onClose }) => {
    const { id } = useParams();
    const [info, setInfo] = useState(null);
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
        async function fetchInfo() {
            try {
                const response = await axios.get(`/api/infos/${id}`);
                setInfo(response.data);
            } catch (error) {
                console.log('詳細情報の取得に失敗しました');
            }
        }

        fetchInfo();
    }, [id]);

    if (!info) {
        return <div>Loading...</div>;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', options);
    }

    // 改行文字をHTMLの改行要素に変換する関数
    function renderBodyWithLineBreaks(text) {
        const lines = text.split('\n');
        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return (
        <div className="new_info_check">
            <form>
                <dl>
                    <dd>
                        <input type="hidden" name="title" value=""/>
                        <span>{info.title}</span>
                    </dd>
                    <dd className="infoCreated_at">
                        {formatDate(info.created_at)}
                    </dd>
                    <dd>
                        <input type="hidden" name="body" value=""/>
                        <p>{renderBodyWithLineBreaks(info.body)}</p>
                    </dd>
                    <div className="info_check_button">
                        <button>
                            <Link to={`/info/${id}/edit`}>編集</Link>
                        </button>
                    </div>
                    <div className="check_back">
                        <a href="/home">一覧に戻る</a>
                    </div>
                </dl>
            </form>
        </div>
    );
};

export default InfoDetail;
