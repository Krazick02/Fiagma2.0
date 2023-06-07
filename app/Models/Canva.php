<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canva extends Model
{
    use HasFactory;

    protected $fillable=[
        // 'name',
        'figures',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
