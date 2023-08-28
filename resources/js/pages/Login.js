import React from 'react';
import BigLogo from '../components/Common/BigLogo';
import LoginForm from '../components/Login/LoginForm';

function Login() {
 
    return (
        <div className="Login-Form">
            <div className="content">
                {/* ロゴ部分 */}
                <BigLogo />
            {/* ログインフォーム部分 */}
                <div className="login_info">
                    <LoginForm />
                </div>
                {/* API連携ログインボタン
                <div className="api">
                    <dd><input type="text"/></dd>
                    <dd><input type="text"/></dd>
                </div> */}
                {/* <!-- パスワード忘れ --> */}
                <div className="forget_pass">
                    <a href="/password/reset">パスワードをお忘れの方はこちら</a>
                </div>
                {/* <!-- アカウント作成 --> */}
                <div className="new_account">
                    <p>アカウントをお持ちではありませんか？</p>
                    <a href="/createUserForm">新規アカウント作成はこちら</a>
                </div>
                {/* <!-- 規約とプライバシーポリシー --> */}
                {/* <div className="login_footer">
                    <a href="">利用規約</a>
                    <a href="">プライバシーポリシー</a>
                </div> */}
            </div>
        </div>
    );
}

export default Login;
