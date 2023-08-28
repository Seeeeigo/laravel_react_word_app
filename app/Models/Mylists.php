<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mylists extends Model
{
    use HasFactory;
    
    public function words()
    {
        return $this->belongsToMany(WordList::class, 'mylist_words', 'mylist_id', 'word_id');
    }
    // テーブル名
    protected $table = 'mylists';

    // 可変項目
    protected $fillable = [
        'user_id',
    ];
}
