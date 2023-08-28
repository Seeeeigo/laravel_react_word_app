<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //ここにバリデーションルールを記載する
            'name' => 'required | string | max:64',
            'email' => 'required | email | max:126',
            'password' => [
                'required', 
                'regex:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\-]{8,24}$/'
            ]
        ];
    }
    public function messages() {
        return [
            // バリデーションエラーメッセージ
            'name.required' => 'ニックネームを記入してください',
            'name.string' => 'ニックネームを正しくご記入ください',
            'name.max' => '名前は64文字未満でご記入ください',
            'email.required' => 'メールアドレスを記入してください',
            'email.email' => 'メールアドレスを正しくご記入ください',
            'email.max' => 'メールアドレスは126文字以下でご記入ください',
            'password.required' => 'パスワードを記入してください',
            'password.regex' => 'パスワードは英数字8文字以上24文字以内(大文字を1つ以上含む)でご記入ください'
        ];
    }
}
