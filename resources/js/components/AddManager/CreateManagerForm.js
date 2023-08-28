import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CreateManagerForm() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password:'',
        status:'2',
        active_flag:'1'
    });

    const history = useHistory();
    const [errors, setErrors] = useState({}); // エラーメッセージを保持するステート

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ 
            ...prevData, 
            [name]: value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/validate-user', formData);
            setErrors({}); // 成功した場合はエラーをクリア
            history.push('/confirm-manager', { formData });
        } catch (error) {
            console.log(formData);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // エラーメッセージをステートにセット
            } else {
                console.error('エラー:', error);
            }
        }
    };



    const handleBack = () => {
        history.goBack(); // 前のページに戻る
    };

    return (
        <div className="add-manager">
            <div className="add-manager-form">
                <div className="add_ttl">
                    <span>管理者アカウント新規登録</span>
                </div>
                <div className="add_info">
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dt><label htmlFor="name">ニックネーム</label></dt>
                            <dd>
                                <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                                {errors.name && <div className="err_msg">{errors.name[0]}</div>}
                            </dd>
                            <dt><label htmlFor="email">メールアドレス</label></dt>
                            <dd>
                                <input type="text" name="email" value={formData.email} onChange={handleChange}/>
                                {errors.email && <div className="err_msg">{errors.email[0]}</div>}
                            </dd>
                            <dt><label htmlFor="password">パスワード</label></dt>
                            <dd>
                                <input type="text" name="password" value={formData.password} onChange={handleChange}/>
                                {errors.password && <div className="err_msg">{errors.password[0]}</div>}
                            </dd>
                            <input name="status" type="hidden" value="2"/>
                            <input name="active_flag" type="hidden" value="1"/>
                            <dd>
                                <div className="add_btn">
                                    <img src="../../img/11t.png"/>
                                    <button type="submit">新規登録</button>
                                </div>
                            </dd>
                        </dl>
                    </form>
                    <div className="back">
                        <a onClick={handleBack}>↩︎戻る</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateManagerForm;