import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
    useParams,
} from 'react-router-dom';
import Login from './pages/Login';
import CreateUser from './pages/create-user';
import ConfirmPage from './pages/confirm-user';
import CompletionPage from './pages/completion-user';
import Home from './pages/Home';
import axios from 'axios';
import InfoDetail from './components/Info/InfoDetail';
import EditInfo from './components/Info/EditInfo';
import CreateInfo from './components/Info/CreateInfo';
import ConfirmInfo from './components/Info/ConfirmInfo';
import CreateWord from './components/NewWord/CreateWord';
import Words from './components/NewWord/ViewWords';
import WordDetail from './components/NewWord/WordDetail';
import MyPage from './components/MyPage/MyPage';
import EditUser from './components/MyPage/EditUser';
import TestWords from './components/WordTest/TestWords';
import viewUsers from './components/UserList/ViewUsers';
import editUserList from './components/UserList/editUserList';
import CreateManagerForm from './components/AddManager/CreateManagerForm';
import ConfirmManager from './components/AddManager/ConfirmManager';
import AllMyList from './components/Mylist/MyLists';
import MylistTest from './components/Mylist/Mylist-Test';
import PasswordResetRequest from './components/ResetPassword/PasswordResetRequest';
import PasswordReset from './components/ResetPassword/PasswordReset';

axios.interceptors.request.use(function(config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {

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
    }, []);

    return (
        <div>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/createUserForm" exact component={CreateUser} />
                <Route path="/confirm" exact component={ConfirmPage} />
                <Route path="/completion" exact component={CompletionPage} />
                <Route path="/password/reset" exact component={PasswordResetRequest} />
                <Route path="/password/reset/:token/:email" exact component={PasswordReset} />
            </Switch>
                {userLoggedIn ? (
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/info/:id" exact component={InfoDetail} />
                        <Route path="/info/:id/edit" exact component={EditInfo} />
                        <Route path="/create-info" exact component={CreateInfo} />
                        <Route path="/confirmInfo" exact component={ConfirmInfo} />
                        <Route path="/create-new-word" exact component={CreateWord} />
                        <Route path="/words" exact component={Words} />
                        <Route path="/word/:id" exact component={WordDetail} />
                        <Route path="/mypage" exact component={MyPage} />
                        <Route path="/mylist-page" exact component={AllMyList} />
                        <Route path="/test_mylist-words" exact component={MylistTest} />
                        <Route path="/edit-user/:id" exact component={EditUser} />
                        <Route path="/test_words" exact component={TestWords}/>
                        <Route path="/users" exact component={viewUsers}/>        
                        <Route path="/edit-user-list/:id" exact component={editUserList} />
                        <Route path="/create-manager-form" exact component={CreateManagerForm} />
                        <Route path="/confirm-manager" exact component={ConfirmManager} />
                    </Switch>
                ) : (
                    <Switch>
                    </Switch>
                )}
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);