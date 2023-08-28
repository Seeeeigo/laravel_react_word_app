import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const WordDetail = ({selectedWord, onClose}) => {
    const {id} = useParams();
    const [word, setWord] = useState({
        num: '',
        ja: '',
        en: '',
        ex: '',
        ja_ex: '',
        fortest:'',
    });

    const history = useHistory();
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {

        let isMounted = true; // フラグを設定
        async function fetchWord() {
            try {
                const response = await axios.get(`/api/words/${id}`);
                if (isMounted) {
                    setWord(response.data); // コンポーネントがアンマウントされていない場合にのみ状態を更新
                }
            } catch {
                console.log('失敗です');
            }
        }
        fetchWord();
        return () => {
            isMounted = false;
        };
    }, []);

    if (!word) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setWord((prevWord) => ({ ...prevWord, [name]: value }));
      };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post(`/api/words/${id}`, word);
        history.push('/words'); // 編集後に一覧ページに戻る
    } catch (error) {
        console.log('編集に失敗しました');
    }
    };

    // 戻るボタン
    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <div className="main">
            <div className="container">
                <div className="word_info">
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dd><input type="text" name="num" placeholder="No." value={word.num} onChange={handleInputChange}/></dd>
                            <dd><input type="text" name="ja" placeholder="日本語訳" value={word.ja} onChange={handleInputChange}/></dd>
                            <dd><input type="text" name="en" placeholder="英単語/フレーズ" value={word.en} onChange={handleInputChange}/></dd>
                            <dd><textarea type="text" name="ex" placeholder="例文" value={word.ex} onChange={handleInputChange} className="ex"></textarea></dd>
                            <dd><textarea type="text" name="ja_ex" placeholder="例文和訳" value={word.ja_ex} onChange={handleInputChange} className="ja_ex"></textarea></dd>
                            <dd><textarea type="text" name="fortest" placeholder="テスト用の例文" value={word.fortest} onChange={handleInputChange} className="ex"></textarea></dd>
                            <div className="word_btn">
                                <button type="submit">変更する</button>
                            </div>
                            <div className="back">
                                <a onClick={handleBack}>↩︎戻る</a>
                            </div>
                        </dl>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default WordDetail;