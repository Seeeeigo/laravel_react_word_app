import React from 'react';

function CompletionPage() {

    const handleGoLogin = () => {
        window.location.href = '/login';
    };

    return (
        <>
            <div className="comp_ttl">
                <span>
                    アカウントの登録が<br/>
                    完了しました。<br/>
                    以下のボタンから<br/>
                    ログインしてください。
                </span>
            </div>
            <div className="comp_btn">
                <button type="button" onClick={handleGoLogin}>ログインページへ</button>
            </div>
        </>
    );
}

export default CompletionPage;