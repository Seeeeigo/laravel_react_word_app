<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordList extends Model
{
    use HasFactory;
    // テーブル名
    protected $table = 'word_lists';

    // 可変項目
    protected $fillable = [
        'num',
        'ja',
        'en',
        'ex',
        'ja_ex',
        'update_user',
        'fortest',
    ];
}
