<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTestProgress extends Model
{
    use HasFactory;
    // テーブル名
    protected $table = 'user_test_progress';

    // 可変項目
    protected $fillable = [
        'user_id',
        'current_word_index',
    ];
}
