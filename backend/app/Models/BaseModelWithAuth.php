<?php

namespace App\Models;

use App\Trait\HasUUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class BaseModelWithAuth extends Authenticatable
{
    use HasFactory, HasUUID;
}
