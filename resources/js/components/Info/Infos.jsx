import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'
import InfoDetail from './InfoDetail';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Infos = () => {

    const [infos, setInfos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // 1ページあたりの情報数

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', options);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleInfos = infos.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        getInfosData();
    }, []);

    //一覧情報を取得しステートpostsにセットする
    const getInfosData = async () => {
        axios
        .get('/api/infos')
        .then(response => {
            setInfos(response.data);     //バックエンドから返ってきたデータでpostsを更新する
            // console.log(response.data);//取得データ確認用のconsole.log()
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    };
    // 詳細情報を表示するためのステート
    const [selectedInfo, setSelectedInfo] = useState(null);

    const handleInfoClick = async (infoId) => {
        try {
            const response = await axios.get(`/api/infos/${infoId}`); // バックエンドから詳細データを取得
            setSelectedInfo(response.data);
        } catch (error) {
            console.log('詳細情報の取得に失敗しました');
        }
    };
    const handleCloseInfoDetail = (pageNumber) => {
        setSelectedInfo(null); // 詳細情報をクリア
        setCurrentPage(pageNumber);
    };

    return(
        <div className="information">
            <h1>お知らせ</h1>
            <table>
                <thead>
                    <tr>
                        <th>日時</th>
                        <th className="info_title">件名</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {visibleInfos.map(info => (
                        <tr key={info.id}>
                            <td>{formatDate(info.created_at)}</td>
                            <td className="info_title">{info.title}</td>
                            <td className="detail">
                            <Link to={`/info/${info.id}`} onClick={() => handleInfoClick(info.id)}>
                                <img src="/img/right.png" alt="詳細を表示" />
                            </Link>
                            <Link to="/create-info">
                                <img src="/img/info.png" className="newinfo"/>
                            </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {/* ページネーションコンポーネントに渡す */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={infos.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
            {/* @if (Auth::user()->status == 2)
                <a href="{{ route('newInfo') }}"><img src="/img/info.png" class="newinfo"></a>
            @endif */}
        </div>
    );
};

export default Infos;