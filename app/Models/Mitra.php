<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mitra extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'province',
        'kabupaten',
        'zipcode',
        'email',
        'phone',
        'fax',
        'logo',
    ];
}
