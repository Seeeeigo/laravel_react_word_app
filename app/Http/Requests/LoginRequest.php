<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email' => 'required | email | max:126',
            'password' => 'required'
        ];
    }
    public function messages() {
        return [
            // バリデーションエラーメッセージ
            'email.required' => 'メールアドレスを記入してください',
            'email.email' => 'メールアドレスを正しくご記入ください',
            'email.max' => 'メールアドレスは126文字以下でご記入ください',
            'password.required' => 'パスワードを記入してください'
        ];
    }
}
