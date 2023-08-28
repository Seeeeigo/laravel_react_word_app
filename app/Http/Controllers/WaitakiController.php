<?php

namespace App\Http\Controllers;

// バリデーションクラス
use Illuminate\Http\Request;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\CreateInfoRequest;

// データベース関連
use App\Models\User;
use App\Models\Information;
use App\Models\WordList;
use App\Models\Mylists;
use App\Models\MylistWords;
use App\Models\UserTestProgress;

// 認証関連
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller as BaseController;

class WaitakiController extends Controller
{
    // 新規アカウント登録用のバリデーション
    public function validateUser(CreateUserRequest $request) 
    {
        // バリデーション済みデータを取得
        $validatedData = $request->validated();

        // エラーがなければ /confirm ページに遷移
        return redirect('/confirm')->with('formData', $validatedData);
    }
    // 新規アカウント登録
    public function createUser(Request $request) 
    {
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'status' => $request['status'],
            'active_flag' => $request['active_flag']
        ]);

        // 登録完了ページにリダイレクト
        return redirect('/completion')->with('message', 'ユーザーが登録されました。');
    }
    // ログイン処理
    public function Login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            Auth::login($user);
             // アクセストークン生成
            $accessToken = $user->createToken('authToken')->plainTextToken;
            if (Auth::check()) {
                // ユーザーはログイン済み
                return response()->json(['message' => 'ログインに成功しました。', 'redirect' => '/home', 'access_token' => $accessToken]);
            }
        } else {
            return response()->json(['errors' => ['メールアドレスまたはパスワードが正しくありません。']], 422);
        }
    }
    // ユーザー情報を取得する
    public function getUserInfo(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['user' => $request->user()]);
        } else {
            return response()->json('ログインされていません');
        }
    }
    // ユーザーのログイン状態を確認/保持する
    public function checkLogin(Request $request)
    {
        if ($request->user()) {
            return response()->json(['loggedIn' => true]);
        } else {
            return response()->json(['loggedIn' => false]);
        }
    }

    /**
     * ログアウト処理
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout(); // ログアウト処理
        $request->session()->invalidate();
        return response()->json(['message' => 'ログアウトしました。']);
    }

    // お知らせ一覧をMAX3件ホーム画面に表示する
    public function showInfos() 
    {
        $infos = Information::all();
        return response()->json($infos, 200);
    }
    // お知らせ新規投稿/バリデーション機能
    public function validateInfo(CreateInfoRequest $request)
    {
        // バリデーション済みデータを取得
        $validatedData = $request->validated();

        // バリデーションが成功したらレスポンスを返す
        return response()->json(['message' => 'バリデーション成功', 'data' => $validatedData]);
    }
    // 新規お知らせを登録する
    public function completeInfo(Request $request)
    {
        $user = Auth::user();
        $info = Information::create([
            'user_id' => $user->id,
            'title' => $request['title'],
            'body' => $request['body']
        ]);
        return response()->json(['message' => 'Information created successfully']);
    }
    // お知らせの詳細を表示する
    public function showDetailInfo($id)
    {
        $info = Information::findOrFail($id);
        return response()->json($info);
    }
    // お知らせを編集する
    public function editInfo($id)
    {
        $info = Information::findOrFail($id);
        return view('info.edit', ['info' => $info]);
    }
    // お知らせを更新する
    public function updateInfo(Request $request, $id) 
    {
        $info = Information::findOrFail($id);
        $info->update($request->all());
        // return redirect("/info/{$id}"); // 更新後に詳細ページにリダイレクト
    }
    public function createWord(Request $request)
    {
        try {
            $word = WordList::create([
                'num' => $request['num'],
                'ja' => $request['ja'],
                'en' => $request['en'],
                'ex' => $request['ex'],
                'ja_ex' => $request['ja_ex'],
                'fortest' => $request['fortest'],
            ]);
            // 成功レスポンスなどをここに返します
        } catch (\Exception $e) {
            // デバッグ用にエラーをログに記録
            \Log::error('単語の作成中にエラーが発生しました: ' . $e->getMessage());
            // エラーレスポンスを返します
            return response()->json(['message' => 'エラーが発生しました'], 500);
        }
    }
    // 単語リストを全部表示する
    public function showWords()
    {
        $words = WordList::all();
        return response()->json($words, 200);
    }
    // 単語詳細を表示する
    public function showDetailWord($id)
    {
        $word = WordList::findOrFail($id);
        return response()->json($word);
    }
    // 単語情報を更新する
    public function updatelWord(Request $request, $id)
    {
        $word = WordList::findOrFail($id);
        $word->update($request->all());
    }
    // ユーザー編集ページに詳細データを表示する
    public function showUser($id)
    {
        $user = User::findOrFail($id);
        return response()->json(['user' => $user]);
    }
    // ユーザー情報を更新する
    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json(['message' => 'User data updated']);
    }
    // ユーザー一覧を取得する
    public function getAllUser()
    {
        $users = User::all();
        return response()->json($users, 200);
    }
    // ユーザー情報を取得して編集ページへ
    public function editUser($id)
    {
        $user = User::findOrFail($id);
        return reponse()->json($user);
    }
    public function showResetForm($token, $email)
    {
        // SPAのビューを返す
        return view ('app');
    }
};
