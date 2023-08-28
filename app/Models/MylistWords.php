<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MylistWords extends Model
{
    use HasFactory;
    // タイムスタンプを無効にする
    public $timestamps = false;
    
    // テーブル名
    protected $table = 'mylist_words';

    // 可変項目
    protected $fillable = [
        'mylist_id',
        'word_id',
    ];
}
