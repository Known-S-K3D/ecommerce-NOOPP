<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable; // Import the trait
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable; // Ensure HasApiTokens is included

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password'];
}
