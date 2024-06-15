<?php

namespace App\Models;

use App\Trait\HasUser;
use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory, HasUUID, HasUser;

    protected $fillable = [
        'text',
        'model_id',
        'model_type',
        'user_id',
    ];

    public function model()
    {
        return $this->morphTo();
    }
}
