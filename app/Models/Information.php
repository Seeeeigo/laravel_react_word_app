<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;
    // テーブル名
    protected $table = 'informations';

    // 可変項目
    protected $fillable = [
        'user_id',
        'title',
        'body',
    ];
}
