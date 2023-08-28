<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateInfoRequest extends FormRequest
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
            'title' => 'required | max:512',
            'body' => 'required'
        ];
    }
    public function messages() {
        return [
            // バリデーションエラーメッセージ
            'title.required' => 'タイトルは必須です。',
            'title.max' => 'タイトルは260文字以内で入力してください。',
            'body.required' => '内容は必須です。'
        ];
    }
}
