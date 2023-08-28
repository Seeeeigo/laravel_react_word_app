<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// 認証関連
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

// データベース関連
use App\Models\User;
use App\Models\Mylists;
use App\Models\MylistWords;
use App\Models\WordList;
use App\Models\UserTestProgress;

class WordTestController extends Controller
{
    // ユーザーテスト進捗情報の取得（初めは作成する）
    public function getUserTestProgress(Request $request)
    {
        $user = $request->user();
        $progress = UserTestProgress::where('user_id', $user->id)->first();

        if (!$progress) {
            $progress = new UserTestProgress();
            $progress->user_id = $user->id;
            $progress->current_word_index = 0;
            $progress->save();
        }
        
        return response()->json(['currentWordIndex' => $progress->current_word_index]);
    }
    // 単語テストを取得する(ユーザーが中断した位置から始められる)
    public function getWordForTest(Request $request)
    {
        $user = $request->user();
        $progress = UserTestProgress::where('user_id', $user->id)->first();

        // 中断位置から次の問題を取得する
        if (!$progress === 0) {
            $offset = $progress->current_word_index + 1;
            $limit = WordList::count() - $offset; // 中断位置からの残りの単語数
            $words = WordList::offset($offset)->limit($limit)->get();
        } else {
            // 単語テストが初めての場合の処理
            $limit = WordList::count();
            $words = WordList::offset(1)->limit($limit)->get();
        }

        return response()->json(['words' => $words, 'currentWordIndex' => $progress->current_word_index]);
    }
    // 中断位置を保存する
    public function saveUserTestProgress(Request $request)
    {
        $user = $request->user();
        $progress = UserTestProgress::where('user_id', $user->id)->first();

        if ($progress) {
            $progress->current_word_index = $request->input('currentWordIndex');
            $progress->save();
        }

        return response()->json(['message' => '中断位置が保存されました']);
    }
    // マイリストに単語を登録する
    public function addWordToMylist(Request $request)
    {
        $user = Auth::user(); // ログイン中のユーザー情報を取得
        $word_id = $request->input('word_id');
    
        if ($user) {
            // ユーザーごとのマイリストを取得または作成
            $mylist = Mylists::firstOrCreate(['user_id' => $user->id]);
    
            // マイリストに単語を追加
            $mylistWord = MylistWords::create([
                'mylist_id' => $mylist->id,
                'word_id' => $word_id
            ]);
    
            return response()->json(['message' => '単語がマイリストに追加されました']);
        } else {
            return response()->json(['message' => 'ユーザーがログインしていません'], 401);
        }
    }
    // マイリスト一覧を取得する
    public function getMylistWords(Request $request)
    {
        $user = Auth::user();

        if($user) {
            $mylist = Mylists::where('user_id', $user->id)->firstOrFail();
            $wordIds = $mylist->words()->pluck('word_id')->toArray();
            $words = WordList::whereIn('id', $wordIds)->get();

            return response()->json($words);
        } else {
            return response()->json(['message' => 'ユーザーがログインしていません', 401]);
        }
    }
    // マイリストでYESが押されたらマイリストから削除する
    public function removeWordFromMylist(Request $request, $wordId)
    {
        $user = Auth::user();

        if ($user) {
            $mylist = Mylists::where('user_id', $user->id)->firstOrFail();
            $mylist->words()->detach($wordId);

            return response()->json(['message' => '単語をマイリストから削除しました']);
        } else {
            return response()->json(['message' => 'ユーザーがログインしていません'], 401);
        }
    }
}
