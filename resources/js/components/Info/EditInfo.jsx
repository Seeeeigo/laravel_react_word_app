import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditInfo = () => {
  const { id } = useParams();
  const history = useHistory();
  const [info, setInfo] = useState({ title: '', body: '' });
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/infos/${id}`, info);
      history.push(`/info/${id}`); // 編集後に詳細ページに戻る
    } catch (error) {
      console.log('編集に失敗しました');
    }
  };

  return (
    <div className="new_info">
        <form onSubmit={handleSubmit}>
            <dl>
                <dd>
                    <input type="text" name="title" value={info.title} placeholder="ここにタイトルを入力" onChange={handleInputChange}/>
                </dd>
                    <div className="error_msg">

                    </div>
                <dd>
                    <textarea name="body" id="body" cols="30" rows="22" placeholder="ここに内容を入力" onChange={handleInputChange} value={info.body}></textarea>
                </dd>
                    <div className="error_msg">

                    </div>
                <div className="back">
                    <a href="/home">一覧に戻る</a>
                </div>
                <div className="info_save_button">
                    <button type="submit">保存</button>
                </div>
            </dl>
        </form>
    </div>
  )
};

export default EditInfo;
